import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {

const [formdata, setFormData] = useState({username:"", useremail:"", userage:""})
const [getdata, setGetData] = useState([])
const handleChange =(e)=>{
  setFormData({...formdata,[e.target.name]:e.target.value})
}

const gettingData = async ()=>{
  try {

    const gettin = await axios.get("http://localhost:5000/api/users/gettingdata")
    console.log(gettin);
    setGetData(gettin.data.mydata)
    
  } catch (error) {
    alert(error.response.data.backend)
  }
}
useEffect (()=>{
  gettingData()
},[formdata])

const editData = (users)=>{
  setFormData({username:users.username,useremail:users.useremail,userage:users.userage})
}

const handleClick = async(e)=>{
e.preventDefault()
try {
  
  const res = await axios.post("http://localhost:5000/api/users/todoadd", formdata)
  console.log(res.data.msg);
  alert(res.data.msg)
  setFormData({username:"", useremail:"", userage:""})

} catch (error) {
  console.log("error",error);
  console.log(error.response.data.msg); 
}

const editData = (users)=>{
  setFormData({username:users.username,useremail:users.useremail,userage:users.userage})
}
 


}
  return (
   <>

   <div>
    <form>
       <input type="text"  name="username" placeholder="enter your name" value={formdata.username} onChange={handleChange} />
       <input type="email"  name="useremail" placeholder="enter your email" value={formdata.useremail} onChange={handleChange} />
       <input type="number" name="userage" placeholder="enter your number" value={formdata.userage} onChange={handleChange} />
       <button onClick={handleClick}>submit</button>
    
    </form>



    <div>
      {getdata.map((e)=>(
         <div key={e._id}>
          <h1>{e.username}</h1>
          <p>{e.useremail}</p>
          <p>{e.userage}</p>
          <button onClick={() => editData(e)}>Edit</button>
         </div>
      ))}

    </div>
   </div>
   
   
   </>
  )
}

export default App