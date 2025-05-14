"use client"
import { useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useDispatch, useSelector } from "react-redux"
import { addTask, editTask, setSelectedTask } from "@/redux/taskSlice"

const formSchema = z.object({
  title: z.string().min(1).min(1),
  priority: z.string(),
  status: z.string(),
  description: z.string().max(200).optional()
});

export default function TaskForm({ onDone }) {

  const selectedTask = useSelector((state) => state.tasks.selectedTask);
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: selectedTask?.title ?? '',
        description: selectedTask?.description ?? '',
        priority: selectedTask?.priority ?? 'Low',
        status: selectedTask?.status ?? 'New'
    }
  })  

  function onSubmit(values) {
    try {
      onDone();
      if(selectedTask === null) {
        dispatch(addTask({data: values}))
      } else{
        dispatch(editTask({id: selectedTask.id, data: values}))
        dispatch(setSelectedTask(null))
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  function formatDate(isoString) {
    if (!isoString) {
      throw new Error("Invalid date string");
    }

    const format = "YYYY-MM-DD HH:mm:ss";
    const date = new Date(isoString);

    const options = {
      YYYY: date.getFullYear(),
      MM: String(date.getMonth() + 1).padStart(2, "0"),
      DD: String(date.getDate()).padStart(2, "0"),
      HH: String(date.getHours()).padStart(2, "0"),
      mm: String(date.getMinutes()).padStart(2, "0"),
      ss: String(date.getSeconds()).padStart(2, "0"),
    };

    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => options[match]);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                placeholder="Enter title"
                type="text"
                disabled= {selectedTask?.status === 'Completed'}
                value = {field?.value ?? ""}
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-12 gap-4">
          
          <div className="col-span-6">
            
        <FormField
          className='w-full'
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select disabled= {selectedTask?.status === 'Completed'} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Status</FormLabel>
              <Select disabled= {selectedTask?.status === 'Completed'} className='' onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="New">New Task</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
                
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea disabled= {selectedTask?.status === 'Completed'}
                  placeholder="Enter a task description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="creation"
          className={cn(selectedTask === null && 'hidden')}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creation Date</FormLabel>
              <FormControl>  
                <span>{formatDate(selectedTask?.creationDate)}</span>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="completion"
          className={cn(selectedTask?.status !== 'Completed' && 'hidden')}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Completion Date</FormLabel>
              <FormControl>  
                <span>{formatDate(selectedTask?.completionDate)}</span>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className = {cn(selectedTask?.status === 'Completed' && 'hidden')} type="submit">Submit</Button>
      </form>
    </Form>
  )
}