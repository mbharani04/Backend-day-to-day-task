import React, { useState } from 'react'

const AddSkill = () => {

    const [skill, setSkill] = useState("")
   const [savedata, setSavedata] = useState([])
const handleChange = (e)=>{

setSkill(e.target.value)
       
    } 

const handleClick =(e)=>{

   setSavedata([...savedata, skill])
 setSkill("");
}



  return (

   <>
   
       
 

<div className='flex flex-row gap-2 justify-center m-10'>
    <div>
        <input type="text" 
        placeholder="Enter your skill"
        onChange = {handleChange}
        value ={skill}
        className='border-2'
        />
    </div>

    <button className='flex bg-orange-400 w-15 justify-around rounded-2xl'
     onClick = {handleClick}>ADD</button>


</div>

<div className='flex justify-around'>
            <ol>
{savedata.map((e,i)=>(


    <li key={i}>
       {i+1}.{e}
    </li>

))}
</ol>
</div>
 

   
   </>
  )
}

export default AddSkill
