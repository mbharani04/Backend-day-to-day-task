import { useState } from 'react'


const TaskOne = () => {
const [name, setName] = useState("React")

const handleChange =()=>{
    setName("Angular")
}

const handleUpdate =()=>{
setName("vue")


}
  return (

    <>
      <h1 className='flex justify-center bg-green-600' >Task -1 </h1>
    <p className='flex justify-center'>{name}</p>


    <div className='flex gap-3 m-4 p-3'>
   <button 
    className='bg-blue-500 w-20 rounded-2xl'
    onClick={handleChange}>Add</button>

    <button className='bg-blue-500 w-30 rounded-2xl'
     onClick={handleUpdate} >click to update</button>
    </div>
 
    
    </>
  )
}

export default TaskOne
