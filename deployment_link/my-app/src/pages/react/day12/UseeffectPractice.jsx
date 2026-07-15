import { useEffect, useState } from "react"
import Automatic from "./Automatic";


const UseeffectPractice = () => {

    const [count, setcount] = useState(0);

    useEffect(()=>{

       console.log("count updated");

       return ()=>{

       }
    },[count])





  return (
    <>
  
    <div className="flex flex-col bg-blue-800 gap-5 p-3 w-70 ">
<p className="text-white">learning the useeffect concept!!!</p>
    <h1>{count}</h1>
    <button className="w-40 p-3 bg-fuchsia-600" onClick ={()=> setcount(count+1)}> increment </button>
  
   </div>
   <div className="flex flex-col w-70 gap-5 pt-5 mt-5 bg-amber-400 text-black">

    <p>useeffect automatic counting</p>

    <Automatic/>
    
   </div>
    

    </>
  )
}

export default UseeffectPractice
