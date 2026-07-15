import { useState } from "react"


const StudentSearch = () => {

const studentData =  [  
  { id: 1, name: "Sudhan" },
  { id: 2, name: "Sudhakar" },]

 
  
const [search, setSearch] = useState("")

return (
  <>
  <h1>task-1 StudentSearch</h1>
  <br />
  <div>
<input 
type="text"
placeholder="search here" 
value ={search}
onChange={(e)=> setSearch(e.target.value)}
className="rounded-xs bg-white text-black"
 />    
  </div>

<p>{search}</p>

{studentData.map((e)=>(
   
    <p  key ={e.id}>{e.name}</p>
))}

  
  
  </>
  )
}

export default StudentSearch