import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "../slice/counterSlice.jsx";

export const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})