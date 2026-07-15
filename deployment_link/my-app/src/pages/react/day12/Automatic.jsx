import { useEffect, useState } from "react"


const Automatic = () => {

  const [count, setCount] = useState(0)
 
 // useEffect(()=> {
 // const timer = setInterval(() => {
  //  setCount((prevCount)=> prevCount +1 );
 // }, 1000);


return ()=> clearInterval(timer)


 // },[])

  return (
<>
<div>
<p>{count}</p>
</div>

<div> 
<button className="bg-red-500 text-white p-4 rounded-lg border-2 w-20 border-black"
 onClick={()=>{setCount(count+1)}}> click </button>
</div>

</>
  )
}

export default Automatic