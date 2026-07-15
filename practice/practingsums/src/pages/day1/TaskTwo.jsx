import { useState } from "react";


const TaskTwo = () => {

const [courses, setCourses] = useState(["HTML", "CSS"]);

const handleClick = ()=>{

setCourses([...courses, "JavaScript" ])

}

const handleReact =()=>{
setCourses([...courses, "react"])

}

const handleRemove = ()=>{

  const remove=  setCourses((courses.filter((e,i)=>e!=="CSS") ))

  


}
  return (
 <>
 <h1 className='flex justify-center bg-green-600'>Task -2 </h1>

 <div className="flex gap-3 flex-col">
    
{courses.map((e,i)=>{
      return <p key = {i}>{e}</p>


})}
<button 
className='bg-blue-500 w-20 rounded-2xl'
onClick = {handleClick}>jsbtn</button>

<button 
className='bg-blue-500 w-20 rounded-2xl'
onClick = {handleReact}>reactbtn</button>

<button 
className='bg-blue-500 w-20 rounded-2xl'
onClick = {handleRemove}>removecss</button>

 </div>
 
 </>
  )
}

export default TaskTwo
