import React, { lazy, Suspense, useState } from "react";
import FallbackLoader from "./components/FallbackLoader";

// Lazy loading the 3 pages on demand using React.lazy()
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const UsersPage = lazy(() => import("./pages/UsersPage"));
const PostsPage = lazy(() => import("./pages/PostsPage"));

const DayTwentysix = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [keyTrigger, setKeyTrigger] = useState(0); // Force re-render/re-suspense demo

  // Accessing Vite Environment Variables
  const envVars = {
    baseUrl: import.meta.env.VITE_API_BASE_URL || "https://dummyjson.com",
    productsApi: import.meta.env.VITE_PRODUCTS_API || "https://dummyjson.com/products",
    usersApi: import.meta.env.VITE_USERS_API || "https://dummyjson.com/users",
    postsApi: import.meta.env.VITE_POSTS_API || "https://dummyjson.com/posts",
    appTitle: import.meta.env.VITE_APP_TITLE || "Day 26: Lazy Loading & ENV",
    mode: import.meta.env.MODE || "development",
    isDev: import.meta.env.DEV ? "true" : "false",
  };

  // Force re-trigger of suspense for testing
  const handleReloadCurrentTab = () => {
    setKeyTrigger((prev) => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 rounded-full bg-gradient-to-tr from-cyan-500/20 to-teal-500/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
              Day 26 Task
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-emerald-400 border border-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Environment Variables Active
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-indigo-300 border border-slate-700">
              React.lazy() & Suspense
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200">
            Environment Variables & Lazy Loaded Pages
          </h1>
          <p className="text-slate-300 max-w-3xl text-sm sm:text-base leading-relaxed">
            This module configures the app's <code className="bg-slate-800 px-2 py-0.5 rounded text-amber-300 font-mono text-xs">.env</code> file to define API endpoints via <code className="bg-slate-800 px-2 py-0.5 rounded text-indigo-300 font-mono text-xs">import.meta.env</code>, and dynamically loads 3 distinct page bundles on demand using <code className="bg-slate-800 px-2 py-0.5 rounded text-emerald-300 font-mono text-xs">React.lazy()</code> and <code className="bg-slate-800 px-2 py-0.5 rounded text-purple-300 font-mono text-xs">Suspense</code> with fallback UI loaders.
          </p>
        </div>
      </div>

      {/* ENV Variable Dashboard Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Environment Variables Inspection (.env)</h2>
              <p className="text-xs text-slate-500">Live values injected into React bundle via <code className="font-mono text-indigo-600">import.meta.env</code></p>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold border border-slate-200">
            Mode: {envVars.mode} (Dev: {envVars.isDev})
          </span>
        </div>

        {/* ENV Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">VITE_API_BASE_URL</span>
            <p className="text-xs font-mono font-bold text-slate-800 truncate">{envVars.baseUrl}</p>
          </div>
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1">
            <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">VITE_PRODUCTS_API</span>
            <p className="text-xs font-mono font-bold text-indigo-900 truncate">{envVars.productsApi}</p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1">
            <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">VITE_USERS_API</span>
            <p className="text-xs font-mono font-bold text-emerald-900 truncate">{envVars.usersApi}</p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1">
            <span className="text-[10px] font-black uppercase text-purple-600 tracking-wider">VITE_POSTS_API</span>
            <p className="text-xs font-mono font-bold text-purple-900 truncate">{envVars.postsApi}</p>
          </div>
        </div>
      </div>

      {/* Lazy Loading Interactive Tabs Navigation */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-100/80 p-2 rounded-2xl border border-slate-200/80">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === "products"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <span>🛍️</span> Page 1: Products Catalog
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === "users"
                  ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                  : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <span>👥</span> Page 2: Users Directory
            </button>

            <button
              onClick={() => setActiveTab("posts")}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === "posts"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                  : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <span>📝</span> Page 3: Posts & Articles
            </button>
          </div>

          {/* Test Suspense Button */}
          <button
            onClick={handleReloadCurrentTab}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all hover:bg-slate-50 cursor-pointer"
            title="Simulate re-suspending current tab to verify loader"
          >
            <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Re-trigger Suspense Loader
          </button>
        </div>

        {/* Suspense Container wrapping Lazy Components */}
        <div className="min-h-[450px]">
          <Suspense
            fallback={
              <FallbackLoader
                title={`Lazy Loading Page: ${activeTab.toUpperCase()}...`}
                subtitle={`Fetching code chunk for ${activeTab} page module via React.lazy()`}
              />
            }
          >
            <div key={`${activeTab}-${keyTrigger}`}>
              {activeTab === "products" && <ProductsPage />}
              {activeTab === "users" && <UsersPage />}
              {activeTab === "posts" && <PostsPage />}
            </div>
          </Suspense>
        </div>
      </div>

      {/* Concept Architecture & Explanation Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
            1
          </div>
          <h3 className="font-bold text-slate-900 text-base">Vite Environment Variables</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            API keys and URLs defined in <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-indigo-600">.env</code> starting with <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-indigo-600">VITE_</code> are exposed via <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-indigo-600">import.meta.env</code>.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
            2
          </div>
          <h3 className="font-bold text-slate-900 text-base">React.lazy() Code Splitting</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Components are imported dynamically <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-teal-600">lazy(() =&gt; import(...))</code>, creating separate smaller JS bundles loaded only when requested.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
            3
          </div>
          <h3 className="font-bold text-slate-900 text-base">React.Suspense & Fallback UI</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-purple-600">&lt;Suspense fallback=&#123;&lt;FallbackLoader /&gt;&#125;&gt;</code> renders skeleton loaders while the JavaScript chunk streams asynchronously.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DayTwentysix;