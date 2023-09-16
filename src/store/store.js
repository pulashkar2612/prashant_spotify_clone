import {configureStore} from '@reduxjs/toolkit'
import songSlice from "./songSlice";
import userSlice from "./userSlice"
import searchSlice from './searchSlice';

const savedState = localStorage.getItem('reduxState');
const initialState = savedState ? JSON.parse(savedState) : undefined;

const store = configureStore({
    reducer:{
        song: songSlice,
        user: userSlice,
        search: searchSlice,
    },
    preloadedState: initialState
});

export default store;