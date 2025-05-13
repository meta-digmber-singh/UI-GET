import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './taskSlice';

const store = configureStore({
    reducer: {
        tasks: taskReducer
    }
})

store.subscribe(() => {
    localStorage.setItem('task-data', JSON.stringify(store.getState().tasks));
})

export default store;