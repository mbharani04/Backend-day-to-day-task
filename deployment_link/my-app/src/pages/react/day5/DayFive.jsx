import { useState } from "react";

const DayFive = () => {
  // Task 1
  const [count, setCount] = useState(0);

  // Task 2
  const [studentName, setStudentName] = useState("Sudhan");

  // Task 3
  const [age, setAge] = useState(18);

  // Task 4
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Task 5
  const [darkTheme, setDarkTheme] = useState(false);

  // Task 6
  const [showContent, setShowContent] = useState(true);

  // Task 7
  const [user, setUser] = useState(null);

  // Task 8
  const [product, setProduct] = useState(undefined);

  // Task 9
  const [mobile, setMobile] = useState(null);

  // Task 10
  const [salary, setSalary] = useState(25000);

  // Task 11
  const [course, setCourse] = useState("MERN");

  // Task 12
  const [employeeStatus, setEmployeeStatus] = useState(false);

  // Task 13
  const [attendance, setAttendance] = useState(0);

  // Task 14
  const [showProfile, setShowProfile] = useState(false);

  // Task 15
  const [balance, setBalance] = useState(10000);

  return (
    <>
      <div className={`min-h-screen p-6 md:p-12 transition-colors duration-500 ${darkTheme ? 'bg-zinc-950 text-white' : ' from-slate-50 to-zinc-100 text-zinc-800'}`}>
        
        {/* Header Section */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3  from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-amber-400 ">
            useState Dashboard
          </h1>
        
        </header>

        {/* Grid Layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Task 1 - Counter */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${darkTheme ? 'bg-zinc-900/50 border-zinc-800 shadow-black/40' : 'bg-white/80 border-slate-200 shadow-slate-200/50'}`}>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Task 01</span>
            <h2 className="font-bold text-xl mb-4">Counter Engine</h2>
            <div className={`text-3xl font-extrabold mb-6 tracking-tight ${darkTheme ? 'text-zinc-100' : 'text-zinc-900'}`}>{count}</div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setCount(count + 1)} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2 px-3 rounded-xl shadow-md shadow-emerald-600/10 transition-all hover:scale-[1.02] active:scale-95">Increment</button>
              <button onClick={() => setCount(count - 1)} className="flex-1 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold py-2 px-3 rounded-xl shadow-md shadow-rose-600/10 transition-all hover:scale-[1.02] active:scale-95">Decrement</button>
              <button onClick={() => setCount(0)} className={`flex-1 text-sm font-semibold py-2 px-3 rounded-xl transition-all border hover:scale-[1.02] active:scale-95 ${darkTheme ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'}`}>Reset</button>
            </div>
          </div>

          {/* Task 2 - Student Name */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${darkTheme ? 'bg-zinc-900/50 border-zinc-800 shadow-black/40' : 'bg-white/80 border-slate-200 shadow-slate-200/50'}`}>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Task 02</span>
            <h2 className="font-bold text-xl mb-4">Identity Desk</h2>
            <div className="mb-6 h-9 flex items-center">
              <p className="text-lg font-medium italic">"{studentName}"</p>
            </div>
            <button onClick={() => setStudentName("Ravi")} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-indigo-600/10 transition-all hover:scale-[1.01] active:scale-95">Change Name</button>
          </div>

          {/* Task 3 - Age */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${darkTheme ? 'bg-zinc-900/50 border-zinc-800 shadow-black/40' : 'bg-white/80 border-slate-200 shadow-slate-200/50'}`}>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Task 03</span>
            <h2 className="font-bold text-xl mb-4">Age Matrix</h2>
            <div className="mb-6 h-9 flex items-center gap-2">
              <span className="text-sm font-medium opacity-75">Current Age:</span>
              <span className="text-xl font-bold">{age}</span>
            </div>
            <button onClick={() => setAge(age + 1)} className="w-full bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-teal-600/10 transition-all hover:scale-[1.01] active:scale-95">Increase Age</button>
          </div>

          {/* Task 4 - Login Status */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${darkTheme ? 'bg-zinc-900/50 border-zinc-800 shadow-black/40' : 'bg-white/80 border-slate-200 shadow-slate-200/50'}`}>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Task 04</span>
            <h2 className="font-bold text-xl mb-4">Gatekeeper Status</h2>
            <div className="mb-6 h-9 flex items-center">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${isLoggedIn ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isLoggedIn ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                {isLoggedIn ? "Logged In" : "Logged Out"}
              </span>
            </div>
            <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="w-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-violet-600/10 transition-all hover:scale-[1.01] active:scale-95">Toggle Login</button>
          </div>

          {/* Task 5 - Theme */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${darkTheme ? 'bg-zinc-900/50 border-zinc-800 shadow-black/40' : 'bg-white/80 border-slate-200 shadow-slate-200/50'}`}>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Task 05</span>
            <h2 className="font-bold text-xl mb-4">Environment Core</h2>
            <div className="mb-6 h-9 flex items-center">
              <span className={`text-sm font-semibold px-3 py-1 rounded-lg ${darkTheme ? 'bg-zinc-800 text-amber-400' : 'bg-slate-100 text-slate-700'}`}>
                {darkTheme ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </span>
            </div>
            <button onClick={() => setDarkTheme(!darkTheme)} className={`w-full text-sm font-semibold py-2.5 px-4 rounded-xl transition-all hover:scale-[1.01] active:scale-95 border ${darkTheme ? 'bg-zinc-100 text-zinc-950 border-zinc-200 hover:bg-zinc-200' : 'bg-zinc-900 text-white border-zinc-800 hover:bg-zinc-800'}`}>Switch Reality</button>
          </div>

          {/* Task 6 - Show / Hide */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${darkTheme ? 'bg-zinc-900/50 border-zinc-800 shadow-black/40' : 'bg-white/80 border-slate-200 shadow-slate-200/50'}`}>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Task 06</span>
            <h2 className="font-bold text-xl mb-4">Visibility Engine</h2>
            <div className="mb-6 h-9 flex items-center">
              {showContent ? (
                <p className="text-sm font-medium text-emerald-500">✔ React is easy to learn.</p>
              ) : (
                <p className="text-sm font-medium opacity-40 italic">Content hidden</p>
              )}
            </div>
            <button onClick={() => setShowContent(!showContent)} className="w-full bg-pink-600 hover:bg-pink-500 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-pink-600/10 transition-all hover:scale-[1.01] active:scale-95">Toggle Visibility</button>
          </div>

          {/* Task 7 - User Data */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${darkTheme ? 'bg-zinc-900/50 border-zinc-800 shadow-black/40' : 'bg-white/80 border-slate-200 shadow-slate-200/50'}`}>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Task 07</span>
            <h2 className="font-bold text-xl mb-4">User Sync</h2>
            <div className="mb-6 h-12 flex flex-col justify-center">
              {user ? (
                <div className="text-sm space-y-0.5">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs opacity-60">{user.city}</p>
                </div>
              ) : (
                <p className="text-sm opacity-40 italic">No user records fetched.</p>
              )}
            </div>
            <button onClick={() => setUser({ name: "Sudhan", city: "Chennai" })} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-cyan-600/10 transition-all hover:scale-[1.01] active:scale-95">Fetch User</button>
          </div>

          {/* Task 8 - Product */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${darkTheme ? 'bg-zinc-900/50 border-zinc-800 shadow-black/40' : 'bg-white/80 border-slate-200 shadow-slate-200/50'}`}>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Task 08</span>
            <h2 className="font-bold text-xl mb-4">Product Catalog</h2>
            <div className="mb-6 h-12 flex flex-col justify-center">
              {product ? (
                <div className="text-sm space-y-0.5">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-xs font-bold text-emerald-500">₹{product.price}</p>
                </div>
              ) : (
                <p className="text-sm opacity-40 italic">State is undefined.</p>
              )}
            </div>
            <button onClick={() => setProduct({ name: "Laptop", price: 55000 })} className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-blue-600/10 transition-all hover:scale-[1.01] active:scale-95">Load Product</button>
          </div>

          {/* Task 9 - Mobile */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${darkTheme ? 'bg-zinc-900/50 border-zinc-800 shadow-black/40' : 'bg-white/80 border-slate-200 shadow-slate-200/50'}`}>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Task 09</span>
            <h2 className="font-bold text-xl mb-4">Secure Comms</h2>
            <div className="mb-6 h-9 flex items-center">
              <p className="text-sm font-mono font-bold tracking-wider">{mobile ? mobile : " [MASKED CONTENT] "}</p>
            </div>
            <button onClick={() => setMobile(9876543210)} className="w-full bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all hover:scale-[1.01] active:scale-95">Reveal Mobile</button>
          </div>

          {/* Task 10 - Salary */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${darkTheme ? 'bg-zinc-900/50 border-zinc-800 shadow-black/40' : 'bg-white/80 border-slate-200 shadow-slate-200/50'}`}>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Task 10</span>
            <h2 className="font-bold text-xl mb-4">Compensation Vault</h2>
            <div className="mb-6 h-9 flex items-center gap-1">
              <span className="text-2xl font-black text-emerald-500">₹{salary.toLocaleString('en-IN')}</span>
              <span className="text-xs opacity-50">/ annum</span>
            </div>
            <button onClick={() => setSalary(salary + 5000)} className="w-full bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-orange-600/10 transition-all hover:scale-[1.01] active:scale-95">Appraise Salary</button>
          </div>

          {/* Task 11 - Course */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${darkTheme ? 'bg-zinc-900/50 border-zinc-800 shadow-black/40' : 'bg-white/80 border-slate-200 shadow-slate-200/50'}`}>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Task 11</span>
            <h2 className="font-bold text-xl mb-4">Syllabus Grid</h2>
            <div className="mb-6 h-9 flex items-center">
              <span className="bg-sky-500/10 text-sky-500 text-sm font-bold px-3 py-1 rounded-md">{course} Stack</span>
            </div>
            <button onClick={() => setCourse("React Native")} className="w-full bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-sky-600/10 transition-all hover:scale-[1.01] active:scale-95">Upgrade Track</button>
          </div>

          {/* Task 12 - Employee */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${darkTheme ? 'bg-zinc-900/50 border-zinc-800 shadow-black/40' : 'bg-white/80 border-slate-200 shadow-slate-200/50'}`}>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Task 12</span>
            <h2 className="font-bold text-xl mb-4">HREngine Status</h2>
            <div className="mb-6 h-9 flex items-center">
              <span className={`text-xs font-bold px-2.5 py-1 rounded ${employeeStatus ? 'bg-emerald-500 text-white' : 'bg-amber-500/10 text-amber-500'}`}>
                {employeeStatus ? "Active Contractor" : "Onboarding Pending"}
              </span>
            </div>
            <button onClick={() => setEmployeeStatus(true)} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-emerald-600/10 transition-all hover:scale-[1.01] active:scale-95">Activate Profile</button>
          </div>

          {/* Task 13 - Attendance */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${darkTheme ? 'bg-zinc-900/50 border-zinc-800 shadow-black/40' : 'bg-white/80 border-slate-200 shadow-slate-200/50'}`}>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Task 13</span>
            <h2 className="font-bold text-xl mb-4">Roll Call Metric</h2>
            <div className="mb-6 h-9 flex items-center gap-2">
              <span className="text-sm opacity-75">Days Present:</span>
              <span className="text-xl font-bold tracking-tight">{attendance}</span>
            </div>
            <button onClick={() => setAttendance(attendance + 1)} className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 text-sm font-bold py-2.5 px-4 rounded-xl shadow-md shadow-amber-500/10 transition-all hover:scale-[1.01] active:scale-95">Mark Attendance</button>
          </div>

          {/* Task 14 - Profile */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${darkTheme ? 'bg-zinc-900/50 border-zinc-800 shadow-black/40' : 'bg-white/80 border-slate-200 shadow-slate-200/50'}`}>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Task 14</span>
            <h2 className="font-bold text-xl mb-4">Dossier Access</h2>
            <div className="mb-6 h-12 flex flex-col justify-center">
              {showProfile ? (
                <div className="text-sm space-y-0.5">
                  <p className="font-semibold">Sudhan</p>
                  <p className="text-xs opacity-60">Chennai, India</p>
                </div>
              ) : (
                <p className="text-sm opacity-40 italic">Profile compiled, waiting access.</p>
              )}
            </div>
            <button onClick={() => setShowProfile(true)} className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-fuchsia-600/10 transition-all hover:scale-[1.01] active:scale-95">Initialize Profile</button>
          </div>

          {/* Task 15 - Bank Balance */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${darkTheme ? 'bg-zinc-900/50 border-zinc-800 shadow-black/40' : 'bg-white/80 border-slate-200 shadow-slate-200/50'}`}>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block mb-1">Task 15</span>
            <h2 className="font-bold text-xl mb-4">Ledger Statement</h2>
            <div className={`text-2xl font-black mb-6 tracking-tight ${balance < 10000 ? 'text-rose-500' : 'text-emerald-500'}`}>
              ₹{balance.toLocaleString('en-IN')}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setBalance(balance + 1000)} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2.5 px-3 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-95">Deposit</button>
              <button onClick={() => setBalance(balance - 1000)} className="flex-1 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold py-2.5 px-3 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-95">Withdraw</button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default DayFive;