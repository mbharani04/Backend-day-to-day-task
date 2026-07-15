import { useRef } from "react"


const UseRefprocess = () => {

const nameref = useRef ("")
const emailref = useRef ("")
const phonref = useRef ("")
const eduref = useRef ("")

const displayname = useRef ("")
const displayemail = useRef ("")
const displayphone = useRef ("")
const displayedu = useRef ("")

const handleChange =()=>{

const datas = {
  name: nameref.current.value,
  email: emailref.current.value,
  phone: phonref.current.value,
  edu : eduref.current.value

}

displayname.current.innerHTML = datas.name
displayemail.current.innerHTML = datas.email
displayphone.current.innerHTML = datas.phone
displayedu.current.innerHTML = datas.edu
}

  return (
<>

<h1>useRef concept - RESUME </h1>
<h2>task -1 </h2>

<div className = "flex">
  <div className=" flex flex-col gap-5 p-2 bg-blue-100">
<input className="text-black border-2 border-solid rounded-sm "
  type="text" 
  placeholder = "enter your name" 
  ref ={nameref} 
  onChange={handleChange} />

    <input className="text-black border-2 border-solid rounded-sm "
    type="email" 
    placeholder = "enter your email"       
    ref ={emailref} onChange={handleChange}  />

      <input className="text-black border-2 border-solid rounded-sm "
      type="tel" 
      placeholder = "phone number" 
      ref ={phonref}  
      onChange={handleChange}  />

        <input className="text-black border-2 border-solid rounded-sm "
         type="text" 
         placeholder = "enter your education"
          ref ={eduref}  
          onChange={handleChange}  />

  </div>
  

<div className="bg-blue-400 text-white p-5 h-screen w-300">
  <p ref = {displayname}></p>
  <p ref = {displayemail}></p>
  <p ref = {displayphone}></p>
  <p ref = {displayedu}></p>



</div>







</div>






</>
  )
}

export default UseRefprocess