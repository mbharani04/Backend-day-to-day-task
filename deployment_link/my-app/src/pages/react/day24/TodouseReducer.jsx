import { useReducer, useState } from "react"




const addskill =[]
 

const reducerfunction=(state,action)=>{

switch (action.type){
    case "add":
        return [...state, action.payload]
}
     

}



const TodouseReducer = () => {

 const [username, setUserName] = useState("")
const [state, dispatch] = useReducer(reducerfunction, addskill)



const handleChange =(e)=>{

    setUserName(e.target.value)
}

const handleAdd =()=>{

    const datas ={
        name : username
    }

    dispatch ({
        type: "add",
        payload : datas
    })
    
    
}

const handleEdit =()=>{
    
     
    
}

const handleDelete =()=>{

    dispatch({
        type: "delete"
    })
}


  return (
<>
<div className="flex justify-center gap-4">



<div>
    <input type="text"
    className="border"
    placeholder="Enter your data"
    value={state.username} 
    onChange={handleChange}/>
</div>

<div>
    {state.map((e,i)=>{
        <p key ={ i}>
{e.username}
        </p>
    })}
</div>
<div className="flex gap-3">
    <button className="border w-20"
    onClick={handleAdd}>
        ADD
    </button>

    <button className="border w-20"
    onClick={handleEdit}>
        EDIT
    </button>

  <button className="border w-20"
    onClick={handleDelete}>
        DELETE
    </button>
   
</div>


</div>
</>
  )
}

export default TodouseReducer