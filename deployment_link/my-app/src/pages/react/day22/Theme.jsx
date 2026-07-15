import { useState } from "react"


const Theme = () => {

const [theme, setTheme] = useState(false)
const handleClick =()=>{

 setTheme(!theme)

}


  return (
    <>
    <div className="text-white flex items-center flex-col gap-4 h-screen">
        
    

       
        
        <div className={`${
          theme ? "bg-yellow-400 text-white" : "bg-orange-400 text-black"
        } `}>
<h1 className="flex justify-center items-center">THEME </h1>
        </div>
   

        <button className="bg-green-500 w-30 rounded-2xl h-8 flex justify-center items-center"
        onClick={handleClick}>
            click here
        </button>
      
    </div>
    </>
  )
}

export default Theme
