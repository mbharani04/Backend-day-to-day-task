import React, { useRef, useState } from 'react'

const EmployeeRegister = () => {
//why we choosing useref instead of usestate for form
//usestate everytime its re-render so that page loads more time
//useref is the best choice because in the form we no need to re-render the process
//useref runs once and no render updates immediately  
const nameRef = useRef("")
const nameRef = useRef("")
const nameRef = useRef("")
}


const [data, setData] = useState([])


const handleSubmit= (e)=>{
//re-rendering stop so that we always using this preventdefault while clicking
e.preventDefault() 

//getting the value from useref inside of clicking word: current.value
//id name ena kudukramo andha name inga key vachikanum

const details = {
    //id:ref inside value.current.value

employeename:nameRef.current.value,
employeename:emailRef.current.value,
employeename:deptRef.current.value
}

setData()
  return (
   <>
<h1>EMPLOYEE REGISTERATION FORM</h1>


<div>
<form>
<div className='flex flex-col gap-3 mt-5' >

<div className='flex items-center gap-12'>
<label htmlFor="employeename">Enter your Name:</label>
<input type="text"
className='border-2 w-55'
id='employeename'
ref={nameRef}
placeholder='' />
</div>

<div className='flex items-center gap-13'>
<label htmlFor="emplyeemail">Enter your email:</label>
<input type="email"
id='emplyeemail'
className='border-2 w-55'
ref={emailRef}
placeholder=''/>
</div>

<div className='flex items-center gap-2'>
<label htmlFor="dept">Enter your department:</label>
<input type="text"
className='border-2 w-55'
id='dept'
ref={deptRef}
placeholder='' />


<button onClick={handleSubmit}>Submit</button>

</div>
 </div>
 </form>





<table>
<thead>
    <tr>
    <th>Employee Name</th>
    <th>Employee Email</th>
    <th>Employee department</th>
    </tr>
 

</thead>
<tbody>
<tr>
    <td></td>
</tr>

    

</tbody>




</table>
</div>


</>
  )
}

export default EmployeeRegister
