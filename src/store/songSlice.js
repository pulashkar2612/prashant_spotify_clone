
import {createSlice} from '@reduxjs/toolkit'
const initialState = []

const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        add(state, action){
            //console.log("addsong called")
           return action.payload
        }
    }
});

export const {add} = songSlice.actions;
export default songSlice.reducer;