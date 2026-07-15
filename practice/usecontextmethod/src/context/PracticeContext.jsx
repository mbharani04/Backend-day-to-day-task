const { createContext } = require("react");


const PracticeContext = createContext(null)
export default PracticeContext;

const arrayOfObject = [{
    name:"bharani",
    course: "MERN STACK",
    email:"mern@gmail.com"
    
}]
export const ProviderContext = ({children})=>{

return(<>
<PracticeContext.Provider value ={arrayOfObject}>
    {children}
</PracticeContext.Provider>


</>)

}

