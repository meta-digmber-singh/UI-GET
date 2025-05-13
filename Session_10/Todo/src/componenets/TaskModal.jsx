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
import { useSelector } from 'react-redux';


function Taskmodal() {
  const [open, setOpen] = useState(false);
  
  const selectedTask = useSelector((state) => state.tasks.selectedTask)

  useEffect(() => {
    setOpen(selectedTask !== null);
  }, [selectedTask]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{(selectedTask === null ? 'Add' : 'Edit') + ' task'}</DialogTitle>
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
