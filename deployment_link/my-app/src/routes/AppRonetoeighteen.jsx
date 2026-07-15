import { Route, Routes } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"
import Home from "../pages/Home"
import DaysevenHome from "../pages/react/day1/DaysevenHome"
import DayOne from "../pages/react/day1/DaySeven"
import DaysevenTask from "../pages/react/day1/DaysevenTask"
import DayEight from "../pages/react/day2/DayEight"
import Sidebar from "../pages/Sidebar"
import Resume from "../components/bio/Resume"
import Github from "../components/bio/Github"
import LinkedIn from "../components/bio/Linkedin"
import DayEightNav from "../pages/react/day2/DayEightNav"
import DayNine from "../pages/react/day3/DayNine"
import DaynineClass from "../pages/react/day3/Daynineclass"
import SplClass from "../pages/react/splclass/SplClass"
import Dayninasign from "../pages/react/day3/Dayninasign"
import DayTen from "../pages/react/day4/DayTen"
import DayFive from "../pages/react/day5/DayFive"
import DaySix from "../pages/react/day6/DaySix"
import SevenTask from "../pages/react/day7/SevenTask"
import HocShowcaseMaster from "../pages/react/day8/EightTask"
import UserProcessForm from "../pages/react/day9/ninthTask"
import Daytentask from "../pages/react/day10/DaytenTask"
import DayEleven from "../pages/react/day11/DayEleven"
import SatTask from "../pages/react/sattask/SatTask"
import UseeffectPractice from "../pages/react/day12/UseeffectPractice"
import Thirteen from "../pages/react/day13/Thirteen"
import TodoList from "../pages/react/day14/TodoList"
import DaysevenTeen from "../pages/react/day17/DaysevenTeen"
import UseContextprocess from "../pages/react/day18/UseContextprocess"
import Ninteen from "../pages/react/day19/Ninteen"
import TwentyTwo from "../pages/react/day22/TwentyTwo"
import DayTwentyFour from "../pages/react/day24/DayTwentyFour"





const AppRonetoeighteen = () => {


  return (
<>


  <div className="min-h-screen bg-white text-slate-900">
      <Navbar/>
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dayseven" element={<DayOne/>} />
          <Route path ="/daysevenhome" element = {<DaysevenHome/>}/>
          <Route path ="/dayseventask" element = {<DaysevenTask/>}/>
          <Route path="/dayeight" element={<DayEight/>} />
          <Route path="/sidebar" element={<Sidebar/>} />
          <Route path="/resume" element={<Resume/>} />
          <Route path="/github" element={<Github/>} />
          <Route path="/linkedin" element={<LinkedIn/>} />
          <Route path = "/dayeightnav" element = {<DayEightNav/>}/>
          <Route path = "/daynine" element = {<DayNine/>}/>
          <Route path = "/daynineclass" element = {<DaynineClass/>}/>
          <Route path = "/splclass" element = {<SplClass/>}/>
          <Route path = "/dayninasign" element = {<Dayninasign/>}/>
          <Route path = "/dayten" element = {<DayTen/>}/>
          <Route path = "/dayfive" element = {<DayFive/>}/>
          <Route path = "/daysix" element = {<DaySix/>}/>
          <Route path = "/seventask" element = {<SevenTask/>}/>
          <Route path = "/hocshowcasemaster" element = {<HocShowcaseMaster/>}/>
          <Route path = "/userprocessform" element = {<UserProcessForm/>}/>
          <Route path = "/daytentask" element = {<Daytentask/>}/>
          <Route path = "/dayeleven" element = {<DayEleven/>}/>
          <Route path = "/sattask" element = {<SatTask/>}/>
          <Route path = "/useeffectpractice" element = {<UseeffectPractice/>}/>
          <Route path = "/thirteen" element = {<Thirteen/>}/>
       
          <Route path = "/todolist" element = {<TodoList/>}/>
          <Route path = "/dayseventeen" element = {<DaysevenTeen/>}/>
          <Route path = "/dayeightteen" element = {<UseContextprocess/>}/>
           <Route path = "/dayninteen" element = {<Ninteen/>}/>      
           <Route path = "/twentytwo" element = {<TwentyTwo/>}/>
            <Route path = "/twentyfour" element = {<DayTwentyFour/>}/>
        </Routes>
      </main>
    </div>

</>
  )
}

export default AppRonetoeighteen