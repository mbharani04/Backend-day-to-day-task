import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const tasksData = [
  {
    day: "Day 01",
    title: "Intro to React & Basic Structure",
    description: "Getting started with JSX elements, functional components, props passing, and styling conventions.",
    category: "React Core",
    tags: ["JSX", "Components", "Props"],
    difficulty: "Easy",
    routes: [
      { label: "Main View", path: "/dayseven" },
      { label: "Home Page", path: "/daysevenhome" },
      { label: "Day Task", path: "/dayseventask" }
    ]
  },
  {
    day: "Day 02",
    title: "Event Handlers & Navigations",
    description: "Configuring page navigation paths, event bindings, and updating dynamic states on UI clicks.",
    category: "React Core",
    tags: ["Events", "State", "Routing"],
    difficulty: "Easy",
    routes: [
      { label: "Day Eight", path: "/dayeight" },
      { label: "Navigation", path: "/dayeightnav" }
    ]
  },
  {
    day: "Special",
    title: "Special Architectural Class",
    description: "Deep dive into special architectural concepts, modular structure, and design patterns in React.",
    category: "Advanced Patterns",
    tags: ["Architecture", "Design Patterns"],
    difficulty: "Hard",
    routes: [
      { label: "Special Class", path: "/splclass" }
    ]
  },
  {
    day: "Day 03",
    title: "Class Components & Signup Forms",
    description: "Comparing functional components with Class components, state management in classes, and simple validations.",
    category: "React Core",
    tags: ["Class Components", "Forms"],
    difficulty: "Medium",
    routes: [
      { label: "Day Nine", path: "/daynine" },
      { label: "Class View", path: "/daynineclass" },
      { label: "Assignment", path: "/dayninasign" }
    ]
  },
  {
    day: "Day 04",
    title: "Advanced Props & Interactive Layout",
    description: "Interactive data binding, complex parent-child props passing, and card elements mapping.",
    category: "React Core",
    tags: ["Props", "Lists", "Interactivity"],
    difficulty: "Easy",
    routes: [
      { label: "Day Ten", path: "/dayten" }
    ]
  },
  {
    day: "Day 05",
    title: "Tailwind Styling & Custom Panels",
    description: "Implementing fluid and responsive layout panels utilizing custom Tailwind utility grids and colors.",
    category: "React Core",
    tags: ["TailwindCSS", "Responsive"],
    difficulty: "Easy",
    routes: [
      { label: "Day Five", path: "/dayfive" }
    ]
  },
  {
    day: "Day 06",
    title: "Interactive Components & UI States",
    description: "Rendering components dynamically based on state flags and custom layout transitions.",
    category: "React Core",
    tags: ["State", "UI Toggle"],
    difficulty: "Easy",
    routes: [
      { label: "Day Six", path: "/daysix" }
    ]
  },
  {
    day: "Day 07",
    title: "Conditional Rendering & State Hooks",
    description: "Comprehensive exercise on useState triggers, complex conditional panels, and lists.",
    category: "State & Hooks",
    tags: ["useState", "Lists", "Conditions"],
    difficulty: "Medium",
    routes: [
      { label: "Seven Task", path: "/seventask" }
    ]
  },
  {
    day: "Day 08",
    title: "Higher-Order Components (HOC)",
    description: "Creating wrapping utilities (HOCs) to inject common layout logic, styles, or tracking hooks.",
    category: "Advanced Patterns",
    tags: ["HOC", "Patterns", "Wrapper"],
    difficulty: "Hard",
    routes: [
      { label: "HOC Master", path: "/hocshowcasemaster" }
    ]
  },
  {
    day: "Day 09",
    title: "Interactive Form Controller & Validation",
    description: "Advanced forms featuring real-time inline validation, input error messages, and submission handlers.",
    category: "Forms & Validation",
    tags: ["Forms", "Validation", "Inputs"],
    difficulty: "Medium",
    routes: [
      { label: "Form Process", path: "/userprocessform" }
    ]
  },
  {
    day: "Day 10",
    title: "State Lifting & Modular Components",
    description: "Moving state to the parent wrapper, sharing live variables across sibling components efficiently.",
    category: "State & Hooks",
    tags: ["State Lifting", "Data Flow"],
    difficulty: "Medium",
    routes: [
      { label: "Day Ten Task", path: "/daytentask" }
    ]
  },
  {
    day: "Day 11",
    title: "Lifecycle Methods & Hook Triggers",
    description: "Simulating mount, update, and unmount behaviors. Exploring dependencies arrays.",
    category: "State & Hooks",
    tags: ["Lifecycle", "Hooks"],
    difficulty: "Medium",
    routes: [
      { label: "Day Eleven", path: "/dayeleven" }
    ]
  },
  {
    day: "Test",
    title: "Milestone Assessment & Dashboard",
    description: "Consolidating multiple routing paths and interactive components into a unified evaluation grid.",
    category: "Milestone",
    tags: ["Milestone", "Assessment"],
    difficulty: "Milestone",
    routes: [
      { label: "Sat Task Portal", path: "/sattask" }
    ]
  },
  {
    day: "Day 12",
    title: "useEffect Practice & API Fetch",
    description: "Executing fetch calls on mount, rendering loading spinners, and checking side effects.",
    category: "State & Hooks",
    tags: ["useEffect", "Fetch API", "Async"],
    difficulty: "Medium",
    routes: [
      { label: "useEffect View", path: "/useeffectpractice" }
    ]
  },
  {
    day: "Day 13",
    title: "HTTP Requests & Custom Adapters",
    description: "Creating API services to fetch and display tabular data with dynamic styling triggers.",
    category: "State & Hooks",
    tags: ["Axios", "API Request"],
    difficulty: "Medium",
    routes: [
      { label: "Day Thirteen", path: "/thirteen" }
    ]
  },
  {
    day: "Day 14",
    title: "Todo App with LocalStorage Sync",
    description: "Full-featured CRUD Todo application with categories, task count metrics, and storage syncing.",
    category: "State & Hooks",
    tags: ["CRUD", "LocalStorage", "State"],
    difficulty: "Medium",
    routes: [
      { label: "Todo List", path: "/todolist" }
    ]
  },
  {
    day: "Day 17",
    title: "React Router Navigation Hub",
    description: "Routing configurations, active navigation classes, nested routes, and error fallbacks.",
    category: "State & Routing",
    tags: ["React Router", "Navigation"],
    difficulty: "Medium",
    routes: [
      { label: "Day Seventeen", path: "/dayseventeen" }
    ]
  },
  {
    day: "Day 18",
    title: "Global State Sync via useContext",
    description: "Implementing Context Provider to access user login credentials and settings across nested routes.",
    category: "State & Routing",
    tags: ["useContext", "Global State"],
    difficulty: "Hard",
    routes: [
      { label: "useContext View", path: "/dayeightteen" }
    ]
  },
  {
    day: "Day 19",
    title: "Complex Form Schema & UI States",
    description: "Custom hook implementations for handling multi-field dynamic inputs and custom error styling.",
    category: "Forms & Validation",
    tags: ["Custom Hooks", "Form Schema"],
    difficulty: "Hard",
    routes: [
      { label: "Day Nineteen", path: "/dayninteen" }
    ]
  },
  {
    day: "Day 20",
    title: "Custom Hooks — useCounter, useToggle, useFetch, useLocalStorage, useSearch",
    description: "Five production-ready custom hooks: independent counters, password toggle, API product fetch with loading/error states, localStorage persistence, and dynamic student search filtering.",
    category: "State & Hooks",
    tags: ["Custom Hooks", "useFetch", "useLocalStorage", "useSearch"],
    difficulty: "Hard",
    routes: [
      { label: "Day Twenty", path: "/daytwenty" }
    ]
  },
  {
    day: "Day 21",
    title: "useMemo — Product Search, Cart Total, Student & Employee Dashboard",
    description: "Four useMemo-powered dashboards: filtered product search, shopping cart grand total with tax/discount, student placement stats, and employee salary expense — all with Theme Change to prove zero recalculation.",
    category: "State & Hooks",
    tags: ["useMemo", "Performance", "Memoization"],
    difficulty: "Hard",
    routes: [
      { label: "Day Twenty One", path: "/twentyone" }
    ]
  },
  {
    day: "Day 22",
    title: "Advanced React Context & Stores",
    description: "Investigating store patterns and dispatch actions to manipulate state records in real time.",
    category: "Advanced Patterns",
    tags: ["State Store", "Reducers"],
    difficulty: "Hard",
    routes: [
      { label: "Day Twenty Two", path: "/twentytwo" }
    ]
  },
  {
    day: "Day 24",
    title: "Full Stack MERN Connection",
    description: "Integrating backend API requests (Express/Node) with React frontend state, completing MERN loop.",
    category: "Milestone",
    tags: ["MERN Stack", "Full Stack", "MongoDB"],
    difficulty: "Milestone",
    routes: [
      { label: "MERN Day 24", path: "/twentyfour" }
    ]
  }
];

const categories = ["All", "React Core", "State & Hooks", "Forms & Validation", "Advanced Patterns", "Milestone"];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("asc"); // asc or desc
  const [time, setTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter tasks based on Search Term and Category
  const filteredTasks = tasksData
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === "All" || task.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const getNum = (dayStr) => {
        const match = dayStr.match(/\d+/);
        return match ? parseInt(match[0], 10) : 999; // put Special/Test at the end
      };
      const numA = getNum(a.day);
      const numB = getNum(b.day);
      return sortBy === "asc" ? numA - numB : numB - numA;
    });

  // Calculate difficulty colors
  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20";
      case "Medium":
        return "bg-sky-500/10 text-sky-600 ring-sky-500/20";
      case "Hard":
        return "bg-violet-500/10 text-violet-600 ring-violet-500/20";
      case "Milestone":
        return "bg-amber-500/10 text-amber-600 ring-amber-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 ring-slate-500/20";
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Dynamic Background Accents */}
      <div className="absolute top-20 left-1/4 -z-10 h-72 w-72 rounded-full bg-indigo-500/5 blur-3xl" />
      <div className="absolute top-40 right-1/4 -z-10 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />

      {/* Hero Welcome Banner */}
      <section className="mb-10 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50/50 p-8 md:p-10 backdrop-blur-md shadow-xl shadow-slate-100/50 relative">
        <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-bl from-indigo-500/5 to-transparent blur-2xl" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-600 ring-1 ring-indigo-500/20">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" />
              Developer Task Workspace
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700">
              Course Portfolio Portal
            </h1>
            <p className="max-w-2xl text-lg text-slate-600 font-light">
              Explore the comprehensive React and full-stack MERN assignments built by{" "}
              <span className="font-semibold text-slate-900">Bharani M</span>. Filter, search, and run each demo directly.
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-1.5 p-4 rounded-2xl bg-white border border-slate-200 backdrop-blur min-w-[200px] shadow-sm">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Workspace Status</span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-sm font-semibold text-emerald-600">System Live</span>
            </div>
            <span className="mt-2 text-2xl font-mono font-medium text-slate-800 tracking-wider">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
            <span className="text-xs text-slate-500">
              {time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Sidebar Profile & System Stats */}
        <aside className="space-y-6 lg:col-span-4">
          {/* Profile Card */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg">
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white font-bold text-slate-800 text-xl">
                    BM
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white ring-2 ring-white">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Bharani M</h3>
                <p className="text-sm text-indigo-600 font-semibold">MERN Stack Developer</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-650 leading-relaxed">
              Full-stack developer student creating modular, state-driven interfaces using React and the node ecosystem.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-2 font-bold">
                <span>Contact & Links</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Link
                  to="/sidebar"
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-500/50 hover:bg-slate-50/80 transition-colors shadow-sm"
                >
                  <span className="text-[10px] uppercase font-semibold">Profile</span>
                </Link>
                <Link
                  to="/resume"
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-500/50 hover:bg-slate-50/80 transition-colors shadow-sm"
                >
                  <span className="text-[10px] uppercase font-semibold">Resume</span>
                </Link>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-500/50 hover:bg-slate-50/80 transition-colors shadow-sm"
                >
                  <span className="text-[10px] uppercase font-semibold">GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 backdrop-blur-md shadow-sm">
            <h4 className="font-bold text-slate-900 mb-4">Workspace Statistics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
                <span className="block text-2xl font-extrabold text-indigo-600 font-mono">{tasksData.length}</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Modules</span>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
                <span className="block text-2xl font-extrabold text-cyan-600 font-mono">
                  {tasksData.reduce((acc, curr) => acc + curr.routes.length, 0)}
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Sub-Demos</span>
              </div>
            </div>

            {/* Stack Status */}
            <div className="mt-6 space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block font-bold">Technology Stack Status</span>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>React Core & Hooks</span>
                    <span className="font-mono">100%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Routing & Context</span>
                    <span className="font-mono">85%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>State Stores (Redux)</span>
                    <span className="font-mono">60%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: "60%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column: Search, Filters & Task Grid */}
        <section className="space-y-6 lg:col-span-8">
          {/* Controls Bar */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-4 md:p-6 backdrop-blur-md space-y-4 shadow-sm">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <svg
                  className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search tasks, days, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl bg-white border border-slate-200 px-10 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none transition-colors shadow-sm"
                />
              </div>

              {/* Sort Toggle */}
              <button
                onClick={() => setSortBy((prev) => (prev === "asc" ? "desc" : "asc"))}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors cursor-pointer shadow-sm"
              >
                <span>Sort:</span>
                <span className="font-semibold text-indigo-600">
                  {sortBy === "asc" ? "Chronological" : "Latest First"}
                </span>
                <svg
                  className={`h-4 w-4 text-indigo-600 transition-transform ${sortBy === "desc" ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </button>
            </div>

            {/* Categories scrollable list */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mr-2 shrink-0">Filter:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition shrink-0 ring-1 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white ring-indigo-600"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 ring-transparent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <article
                  key={task.day + task.title}
                  className="glow-card group rounded-3xl border border-slate-200 bg-white hover:bg-slate-50/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-100"
                >
                  <div>
                    {/* Card Header: Day and Difficulty */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded">
                        {task.day}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${getDifficultyBadge(
                          task.difficulty
                        )}`}
                      >
                        {task.difficulty}
                      </span>
                    </div>

                    {/* Card Body: Title, Description, and Tags */}
                    <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {task.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {task.description}
                    </p>

                    {/* Technology tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {task.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] text-slate-650 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions: Routes */}
                  <div className="mt-6 border-t border-slate-200 pt-4">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">Available Demos:</p>
                    <div className="flex flex-wrap gap-2">
                      {task.routes.map((route) => (
                        <Link
                          key={route.path}
                          to={route.path}
                          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-200 cursor-pointer shadow-md shadow-indigo-900/10"
                        >
                          {route.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-center rounded-3xl border border-dashed border-slate-300 bg-slate-50/50">
                <svg
                  className="h-10 w-10 text-slate-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-slate-650 text-sm font-semibold">No matches found for your search.</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="mt-3 text-xs text-indigo-600 font-bold hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;