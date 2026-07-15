import { useReducer } from "react"
import TodouseReducer from "./TodouseReducer";

const ininitalState = 0;

const reducer = (state,action)=>{

  switch(action.type){

  case "INC":
  return state + 1

  case "DEC":
  return state - 1

  case "RESET":
  return ininitalState

  default :
    return state;

}

}

const DayTwentyFour = () => {


const [state, dispatch] = useReducer(reducer, ininitalState)




  return (
   <>
   
   <h1>{state}</h1>
   <div className="flex gap-4 ">

   <br />
   <br />

   <button className="border w-30"
   onClick={()=>dispatch({type: "INC"})}>INCREMNENT</button>
   <button  className="border w-30"
   onClick={()=>dispatch({type: "DEC"})}>DECREMNENT</button>
   <button  className="border w-20"
   onClick={()=>dispatch({type: "RESET"})}>RESET</button>
   </div>
<br />
<br />
<br />

   <TodouseReducer/>
   </>
  )
}

export default DayTwentyFour
