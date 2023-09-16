import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: {},
    loggedInUserId: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            console.log("login called")
            state.loggedInUserId = action.payload.userId;
            if (!state.users[action.payload.userId]) {
                state.users[action.payload.userId] = { likedSongs: [] };
            }
        },
        logoutUser: (state) => {
            console.log("logout called")
            state.loggedInUserId = null;
        },
        likeSong: (state, action) => {
            console.log("likedsong called")
            const { song } = action.payload;
            const user = state.users[state.loggedInUserId];
            if (user) {
                user.likedSongs.push(song);
            }
        },
        unlikeSong: (state, action) => {
            console.log("unlikesong called")
            const { songId } = action.payload;
            const user = state.users[state.loggedInUserId];
            if (user) {
                user.likedSongs = user.likedSongs.filter((song) => song._id !== songId);
            }
        },
    }
});

export const { loginUser, logoutUser, likeSong, unlikeSong } = userSlice.actions;

export default userSlice.reducer;