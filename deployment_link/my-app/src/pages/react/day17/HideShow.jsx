import { useRef } from "react";


const HideShow = () => {

    const textRef = useRef(null)

    const handleClickon=()=>{


 textRef.current.style.display = "block";


    }
const handleClickoff = ()=>{

    textRef.current.style.display = "none";
}
  return (
   <>

<h2>task -2 </h2>

   <h1>toggle ON and OFF </h1>
<p ref={textRef}> use Ref concept </p>
<div className=" text-white flex gap-4 flex-col justify-center items-center">

<button   className="bg-green-500 text-white px-4 py-2 rounded mr-2 w-25"
onClick={handleClickon}>ON </button>

<button   className="bg-green-500 text-white px-4 py-2 rounded mr-2 w-25"
onClick={handleClickoff}>OFF </button>
</div>




   
   </>
  )
}

export default HideShow