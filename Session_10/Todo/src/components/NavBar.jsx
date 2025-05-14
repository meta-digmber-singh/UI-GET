import React, {useState} from 'react';
import Taskmodal from './TaskModal';

function NavBar() {
  const [open, setOpen] = useState(false)
  
  const openModal = () =>{
    setOpen(true);
  }

  const closeModal = () =>{
    setOpen(false);
  }
  return (
    <div className='py-4 bg-blue-100 flex justify-between items-center px-8'>
        <h1 className='text-lg md:text-xl lg:text-2xl'>Task Management</h1>
        <Taskmodal />
    </div>
  )
}

export default NavBar;
