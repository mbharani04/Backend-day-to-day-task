import { useState } from "react"


const ThemeProvider = ({children}) => {

    

const [theme, setTheme] = useState(false)


  return(
    <>
    <div className="flex text-white">
        <p>Theme changing </p>
 <ThemeProvider.Provider value ={{theme, setTheme}}>{children}</ThemeProvider.Provider>




    </div>
   
    
    
    
    </>
  )
}

export default ThemeProvider