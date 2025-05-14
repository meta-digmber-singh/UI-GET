import { removeTask, setSelectedTask } from '@/redux/taskSlice';
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CiEdit } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaEye } from "react-icons/fa";

function Board() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.tasks.tasks)

    const groupedTask = useMemo(() => {
        return [
            data.filter((task) => task.status === 'New'),
            data.filter((task) => task.status === 'In Progress'),
            data.filter((task) => task.status === 'Completed')
        ]
    })

    const columns = ['New', 'In Progress', 'Completed']
    const colors = ['bg-blue-100', 'bg-orange-100', 'bg-green-100']
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 m-8'>
            {columns.map((name, index) => {
                return <TaskColumn key={name} title={name} titleColor={colors[index]} data={groupedTask[index]}/>
            })}
        </div>
    )
}

function getTaskColor(priority){
    switch (priority) {
        case 'High':
            return 'bg-red-300';
        case 'Medium':
            return 'bg-orange-300';
        case 'Low':
            return 'bg-blue-300';    
        default:
            return 'bg-white';
    }
}

function TaskColumn({ title, titleColor, data, index }) {
    const dispatch = useDispatch();
    return (
        <div className='h-96 bg-gray-100 rounded-md'>
            {/* Header */}
            <div className={`flex justify-center py-2 rounded-t-md ${titleColor}`}>{title}</div>

            {/* Task Data */}
            <div >{
                data.map((task) => {
                    return <div className={`${getTaskColor(task.priority)} border-1 py-2 my-2 rounded`} key={task.id}>
                        <div className='text-black font-bold justify-between flex'>
                            <span className='px-2 text-center'>{task.title}</span>
                            <div>
                                {title === 'Completed' ? 
                                <button className='cursor-pointer p-2 rounded-full hover:bg-black/10' onClick={() => dispatch(setSelectedTask(task))}>
                                <FaEye />
                                </button> :
                                <button className='cursor-pointer p-2 rounded-full hover:bg-black/10' onClick={() => dispatch(setSelectedTask(task))}>
                                    <CiEdit />
                                </button>}
                                <button className='cursor-pointer p-2 rounded-full hover:bg-black/10' onClick={() => dispatch(removeTask(task.id))}>
                                    <RxCross2 />
                                </button>
                            </div>
                        </div>
                        <div className='px-2 '>{task.description}</div>
                        </div>
                })
            }</div>
        </div>
    )
}

export default Board
