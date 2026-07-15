import { useState } from "react"


const DayTenclass = () => {
const [count, setCount] = useState(0)

const handleclick = ()=>{
 setCount(count + 1);


};




  return (
    <>
    
    <h1>usestate topic</h1>


    <p>count: {count}</p>
<div className="bg-blue-600 w-20 p-1 m-3">
<button onClick ={handleclick}>click me</button>

</div>
    
    
    
    
    </>
  )
}

export default DayTenclass
