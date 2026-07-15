import React from 'react'
import { NavLink } from 'react-router-dom';
const Home = () => {
  return (
  <>
  
  <nav>
  <div className='flex gap-3 flex-wrap'>


<NavLink to="/dayone" className="px-4 py-2  flex justify-around bg-black text-2xl text-white rounded hover:bg-yellow-500 w-26 hover:text-white transition" > day_1 </NavLink>
<NavLink to="/daytwo" className="px-4 py-2  flex justify-around bg-black text-2xl text-white rounded hover:bg-yellow-500 w-26 hover:text-white transition" > day_2 </NavLink>
<NavLink to="/daythree" className="px-4 py-2  flex justify-around bg-black text-2xl text-white rounded hover:bg-yellow-500 w-26 hover:text-white transition" > day_3 </NavLink>




  </div>

  </nav>
  
  
  
  
  
  </>
  )
}

export default Home