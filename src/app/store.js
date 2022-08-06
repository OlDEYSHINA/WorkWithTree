import {configureStore} from '@reduxjs/toolkit';
import treeReducer from "../features/tree/redux/treeReducer";

export const store = configureStore({
    reducer: {
        tree: treeReducer
    }
})

