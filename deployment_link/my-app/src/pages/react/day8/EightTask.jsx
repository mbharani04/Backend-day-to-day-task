import  { useState, useEffect } from 'react';

// ==========================================
// TASK 1: withBackgroundColor HOC
// ==========================================
const UserCard = ({ name, role }) => (
  <div className="p-4 text-slate-800">
    <h3 className="text-lg font-bold">{name}</h3>
    <p className="text-xs opacity-80">{role}</p>
  </div>
);

const withBackgroundColor = (WrappedComponent) => {
  return ({ bgColor, ...props }) => (
    <div className={`${bgColor || 'bg-white'} rounded-xl shadow-sm border transition-all duration-300`}>
      <WrappedComponent {...props} />
    </div>
  );
};
const EnhancedUserCard = withBackgroundColor(UserCard);


// ==========================================
// TASK 2: withUpperCase HOC
// ==========================================
const MessageComponent = ({ text }) => (
  <p className="text-md font-mono font-semibold text-indigo-600">{text}</p>
);

const withUpperCase = (WrappedComponent) => {
  return ({ text, ...props }) => {
    const upperCaseText = text ? text.toUpperCase() : '';
    return <WrappedComponent {...props} text={upperCaseText} />;
  };
};
const EnhancedMessage = withUpperCase(MessageComponent);


// ==========================================
// TASK 3: withCounter HOC
// ==========================================
const CounterDisplay = ({ count, increment, decrement }) => (
  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
    <span className="text-xl font-bold text-gray-800">Count : {count}</span>
    <div className="flex space-x-2">
      <button onClick={decrement} className="px-4 py-1.5 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg font-bold shadow-sm transition-all">[ - ]</button>
      <button onClick={increment} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm transition-all">[ + ]</button>
    </div>
  </div>
);

const withCounter = (WrappedComponent) => {
  return (props) => {
    const [count, setCount] = useState(5);
    return (
      <WrappedComponent 
        {...props} 
        count={count} 
        increment={() => setCount(prev => prev + 1)} 
        decrement={() => setCount(prev => prev - 1)} 
      />
    );
  };
};
const EnhancedCounter = withCounter(CounterDisplay);


// ==========================================
// TASK 4: withAuthentication HOC
// ==========================================
const Dashboard = () => (
  <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl">
    <h4 className="font-bold">Dashboard Accessible</h4>
    <p className="text-xs mt-0.5">Sensitive system modules loaded successfully.</p>
  </div>
);

const withAuth = (WrappedComponent) => {
  return ({ isLogin, ...props }) => {
    if (!isLogin) {
      return (
        <div className="p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl font-medium text-center text-sm">
          🔒 Please Login First
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };
};
const AuthGatekeeper = withAuth(Dashboard);


// ==========================================
// TASK 5: withIteration HOC
// ==========================================
const DisplayComponent = ({ iterations }) => (
  <div className="flex flex-col items-center justify-center space-y-1 font-bold text-lg">
    {iterations.map((item, idx) => (
      <div key={idx} className={item.colorClass}>{item.value}</div>
    ))}
  </div>
);

const withIteration = (WrappedComponent) => {
  return ({ number, color, ...props }) => {
    const colorMap = { green: 'text-emerald-600', blue: 'text-blue-600', red: 'text-rose-600' };
    const targetColor = colorMap[color.toLowerCase()] || 'text-gray-900';
    
    const iterationsArray = Array.from({ length: number }, (_, i) => ({
      value: i + 1,
      colorClass: targetColor
    }));

    return <WrappedComponent {...props} iterations={iterationsArray} />;
  };
};
const IteratedOutput = withIteration(DisplayComponent);


// ==========================================
// BONUS TASK 6: withLoading HOC
// ==========================================
const StudentList = () => {
  const students = ['Alex Smith', 'Emma Watson', 'Liam Neeson', 'Olivia Rodrigo'];
  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      <div className="bg-slate-50 px-4 py-2 border-b text-sm font-bold text-gray-700">Student List</div>
      <ul className="p-3 space-y-1.5 text-xs text-gray-600">
        {students.map((student, i) => <li key={i} className="bg-slate-100 p-2 rounded">{student}</li>)}
      </ul>
    </div>
  );
};

const withLoading = (WrappedComponent) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 3000);
      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8 space-x-2 bg-gray-50 rounded-xl border border-dashed">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs text-gray-500 font-medium">Loading...</span>
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };
};
const LazyStudentList = withLoading(StudentList);


// ==========================================
// UNIFIED MASTER CONTAINER COMPONENT
// ==========================================
export default function HocShowcaseMaster() {
  const [task1Color, setTask1Color] = useState('bg-blue-100 border-blue-200');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 p-8 text-gray-800 font-sans">
      <header className="max-w-6xl mx-auto mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">HOC </h1>
       
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <span className="text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-2.5 py-1 rounded-md">Task 1: Background Color</span>
          <select 
            onChange={(e) => setTask1Color(e.target.value)} 
            className="w-full text-sm p-2 border border-gray-200 rounded-lg bg-white"
          >
            <option value="bg-blue-100 border-blue-200">Blue Background</option>
            <option value="bg-emerald-100 border-emerald-200">Green Background</option>
            <option value="bg-amber-100 border-amber-200">Yellow Background</option>
          </select>
          <EnhancedUserCard bgColor={task1Color} name="Jane Doe" role="Solutions Architect" />
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase bg-indigo-50 px-2.5 py-1 rounded-md">Task 2: UpperCase Text</span>
            <div className="bg-slate-50 p-4 rounded-xl border text-center">
              <EnhancedMessage text="hello react" />
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <span className="text-xs font-bold tracking-wider text-purple-600 uppercase bg-purple-50 px-2.5 py-1 rounded-md">Task 3: State Counter Injector</span>
          <EnhancedCounter />
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase bg-emerald-50 px-2.5 py-1 rounded-md">Task 4: Auth Gatekeeper</span>
            <button 
              onClick={() => setIsLoggedIn(!isLoggedIn)} 
              className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${isLoggedIn ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-700'}`}
            >
              {isLoggedIn ? 'Mock Logout' : 'Mock Login'}
            </button>
          </div>
          <AuthGatekeeper isLogin={isLoggedIn} />
        </div>

        {/* Card 5 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <span className="text-xs font-bold tracking-wider text-amber-600 uppercase bg-amber-50 px-2.5 py-1 rounded-md">Task 5: Iteration Logic</span>
          <div className="border border-gray-100 p-3 rounded-xl bg-gray-50">
            <IteratedOutput number={5} color="Green" />
          </div>
        </div>

        {/* Card 6 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <span className="text-xs font-bold tracking-wider text-rose-600 uppercase bg-rose-50 px-2.5 py-1 rounded-md">Task 6: Async Loading Delay</span>
          <LazyStudentList />
        </div>

      </div>
    </div>
  );
}