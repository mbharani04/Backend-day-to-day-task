import { useState } from "react"


const TodoList = () => {



const [data, setData] = useState({
    userName:"", userMobile:"", userEmail:""
})

const [saveddata, setSaveddata] = useState([])


const handleAdd = (e)=>{

setData({...data, [e.target.name]:e.target.value})

}


const datasaving = {...setData}


const handleClick =(e)=>{

    e.preventDefault()
setSaveddata((prev)=>[...prev , datasaving])


}




  return (
    <>
    
    <div className= "bg-amber-300 flex justify-center items-center w-50 rounded-full border-b-emerald-500">
    <h2 >creating to do app</h2>
     </div>

     <form>
<input className=""   type="text" name = "userName" placeholder="enter your name" onChange={handleAdd} />
<input type="tel" name = "userMobile" placeholder="enter your Mobile" onChange={handleAdd} />
<input type="email" name = "userEmail" placeholder="enter your Email" onChange={handleAdd}/>
<div className="bg-blue-600 rounded-full w-15 flex justify-self-center items-center">
<button onclick={handleClick}>ADD</button>
</div>


     </form>
    
    
    
    </>
  )
}

export default TodoList