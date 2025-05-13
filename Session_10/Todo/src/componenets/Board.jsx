import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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

    console.log(JSON.stringify(data))

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
    return (
        <div className='h-96 bg-gray-100 rounded-md'>
            {/* Header */}
            <div className={`flex justify-center py-2 rounded-t-md ${titleColor}`}>{title}</div>

            {/* Task Data */}
            <div >{
                data.map((task) => {
                    return <div className={`${getTaskColor(task.priority)} border-1 py-2 my-2 rounded`} key={task.id}>
                        <div className='text-black text-center font-bold ps-3'>
                            <span>{task.title}</span>
                        </div>
                        <div className='px-1'>{task.description}</div>
                        </div>
                })
            }</div>
        </div>
    )
}

export default Board
