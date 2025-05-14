import React, { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TaskForm from './TaskForm';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTask } from '@/redux/taskSlice';


function Taskmodal() {
  const [open, setOpen] = useState(false);
  
  const selectedTask = useSelector((state) => state.tasks.selectedTask)

  useEffect(() => {
    setOpen(selectedTask !== null);
  }, [selectedTask]);

  const dispatch = useDispatch();
  function handleOpen(isOpen) {
    if (!isOpen) {
      dispatch(setSelectedTask(null));
    }

    setOpen(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button>Add Task</Button>
      </DialogTrigger>
      <DialogContent className='h-11/12 overflow-auto'>
        <DialogHeader>
          <DialogTitle>{(selectedTask === null ? 'Add' :(selectedTask.status !== 'Completed'?'Edit' : 'Completed')) + ' task'}</DialogTitle>
          <DialogDescription asChild>
            <div>
              <TaskForm onDone={() => setOpen(false)}/>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Taskmodal
