import {Route, Routes} from 'react-router-dom'
import DayoneTask from '../../pages/day1/DayoneTask'
import Home from '../../pages/Home'
import DayTwo from '../../pages/day2/DayTwo'
import Daythree from '../../pages/day3/Daythree'

const AppRouter = () => {
  return (
    <>
    
      <Routes>
    <Route path="/" element={<Home/>} />
  <Route path="/dayone" element={<DayoneTask/>} />
   <Route path="/daytwo" element={<DayTwo/>} />
<Route path="/daythree" element={<Daythree/>} />



    </Routes>
    
    
    
    
    </>
  )
}

export default AppRouter
