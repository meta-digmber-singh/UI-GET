import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const taskSlice = createSlice({
    name: "tasks",
    initialState: () => {
        const storedTasks = localStorage.getItem('task-data');
        return storedTasks !== null && storedTasks.length > 0
            ? JSON.parse(storedTasks)
            : { tasks: [], selectedTask: null }
    },
    reducers: {
        addTask: (state, action) => {
            const taskData = action.payload.data;
            taskData['id'] = uuidv4();
            taskData['creationDate'] = new Date().toISOString();
            taskData['completionDate'] = null;
            
            state.tasks.push(taskData)
        },
        removeTask: (state, action) => {
            
            state.tasks = state.tasks.filter((t) => t.id !== action.payload)
        },
        editTask: (state, action) => {            
            const task = state.tasks.find((t) => t.id === action.payload.id)
            task['title'] = action.payload.data.title
            task['status'] = action.payload.data.status
            task['priority'] = action.payload.data.priority
            task['description'] = action.payload.data.description

            if (action.payload.data.status === 'Completed') {
                task['completionDate'] = new Date().toISOString();
            }
        },
        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload
        }
    }
})

export const { addTask, removeTask, editTask, setSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;