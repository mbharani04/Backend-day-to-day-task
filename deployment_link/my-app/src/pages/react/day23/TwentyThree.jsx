import React, { useState, useEffect, useMemo, useCallback, memo, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Fallback Dataset (Used if offline or API request fails)
// ─────────────────────────────────────────────────────────────────────────────
const FALLBACK_USERS = [
  { id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz", city: "Gwenborough", company: "Romaguera-Crona" },
  { id: 2, name: "Ervin Howell", username: "Antonette", email: "Shanna@melissa.tv", city: "Wisokyburgh", company: "Deckow-Crist" },
  { id: 3, name: "Clementine Bauch", username: "Samantha", email: "Nathan@yesenia.net", city: "McKenziehaven", company: "Romaguera-Jacobson border" },
  { id: 4, name: "Patricia Lebsack", username: "Karianne", email: "Julianne.OConner@kory.org", city: "South Elvis", company: "Robel-Corkery" },
  { id: 5, name: "Chelsey Dietrich", username: "Kamren", email: "Lucio_Hettinger@annie.ca", city: "Roscoeview", company: "Keebler LLC" },
  { id: 6, name: "Mrs. Dennis Schulist", username: "Leopoldo_Corkery", email: "Karley_Dach@jasper.info", city: "South Christy", company: "Considine-Lockman" },
  { id: 7, name: "Kurtis Weissnat", username: "Elwyn.Skiles", email: "Telly.Hoeger@billy.biz", city: "Howemouth", company: "Johns Group" },
  { id: 8, name: "Nicholas Runolfsdottir V", username: "Maxime_Nienow", email: "Sherwood@rosamond.me", city: "Aliyaview", company: "Abernathy Group" },
  { id: 9, name: "Glenna Reichert", username: "Delphine", email: "Chaim_McDermott@dana.io", city: "Bartholomebury", company: "Yost and Sons" },
  { id: 10, name: "Clementina DuBuque", username: "Moriah.Stanton", email: "Rey.Padberg@karina.biz", city: "Lebsackbury", company: "Hoeger LLC" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Memoized Child Component 1: Search & Filter Input Bar
// ─────────────────────────────────────────────────────────────────────────────
const MemoizedSearchInput = memo(({ searchQuery, onSearchChange, onClearSearch, placeholder }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <span>🔍</span> Search & Filter Control (Memoized Component)
        </label>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-800/60 shadow-inner">
          Child Renders: {renderCount.current}
        </span>
      </div>
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder={placeholder || "Search by name, email, city, or company..."}
          className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
        />
        {searchQuery && (
          <button
            onClick={onClearSearch}
            className="absolute right-3 px-2 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
});
MemoizedSearchInput.displayName = "MemoizedSearchInput";

// ─────────────────────────────────────────────────────────────────────────────
// Memoized Child Component 2: User Card Item
// ─────────────────────────────────────────────────────────────────────────────
const MemoizedUserCard = memo(({ user, isFavorite, onToggleFavorite, onDeleteUser }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const cityName = user.address?.city || user.city || "N/A";
  const companyName = user.company?.name || user.company || "N/A";

  return (
    <div className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-xl p-5 shadow-lg flex flex-col justify-between transition-all duration-200 group">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-semibold text-slate-100 text-base group-hover:text-cyan-300 transition-colors">
              {user.name}
            </h3>
            <p className="text-xs text-cyan-400 font-mono">@{user.username}</p>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700/60 shrink-0">
            Renders: {renderCount.current}
          </span>
        </div>

        <div className="space-y-1.5 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 w-4 text-center">📧</span>
            <span className="truncate text-slate-300">{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 w-4 text-center">🏢</span>
            <span className="truncate text-slate-400">{companyName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 w-4 text-center">📍</span>
            <span className="truncate text-slate-400">{cityName}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/80 gap-2">
        <button
          onClick={() => onToggleFavorite(user.id)}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-all flex items-center justify-center gap-1.5 ${
            isFavorite
              ? "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30"
              : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750 hover:text-white"
          }`}
        >
          <span>{isFavorite ? "★" : "☆"}</span>
          <span>{isFavorite ? "Favorited" : "Favorite"}</span>
        </button>

        <button
          onClick={() => onDeleteUser(user.id)}
          className="py-1.5 px-3 rounded-lg text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 hover:text-rose-300 transition-colors"
          title="Delete User"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
});
MemoizedUserCard.displayName = "MemoizedUserCard";

// ─────────────────────────────────────────────────────────────────────────────
// Memoized Child Component 3: Stats Header Card
// ─────────────────────────────────────────────────────────────────────────────
const MemoizedStatsDisplay = memo(({ stats }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
          <span>Total Fetched</span>
          <span className="text-[10px] text-slate-500 font-mono">R:{renderCount.current}</span>
        </div>
        <div className="text-2xl font-bold text-slate-100">{stats.total}</div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
          <span>Filtered Matches</span>
          <span className="text-[10px] text-slate-500 font-mono">R:{renderCount.current}</span>
        </div>
        <div className="text-2xl font-bold text-cyan-400">{stats.filtered}</div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
          <span>Favorites</span>
          <span className="text-[10px] text-slate-500 font-mono">R:{renderCount.current}</span>
        </div>
        <div className="text-2xl font-bold text-amber-400">{stats.favoritesCount}</div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
          <span>Unique Cities</span>
          <span className="text-[10px] text-slate-500 font-mono">R:{renderCount.current}</span>
        </div>
        <div className="text-2xl font-bold text-purple-400">{stats.uniqueCitiesCount}</div>
      </div>
    </div>
  );
});
MemoizedStatsDisplay.displayName = "MemoizedStatsDisplay";

// ─────────────────────────────────────────────────────────────────────────────
// Main Component: TwentyThree (Day 23 Task)
// ─────────────────────────────────────────────────────────────────────────────
const TwentyThree = () => {
  // Parent Render Tracker
  const parentRenderCount = useRef(0);
  parentRenderCount.current += 1;

  // 1. Data Fetching State
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Search & Filter State (for useMemo)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("ALL");
  const [sortBy, setSortBy] = useState("name-asc");
  const [favorites, setFavorites] = useState([]);

  // 3. Unrelated state to test parent re-renders & useCallback optimization
  const [unrelatedCount, setUnrelatedCount] = useState(0);
  const [useCallbackEnabled, setUseCallbackEnabled] = useState(true);

  // ───────────────────────────────────────────────────────────────────────────
  // Task 1: Fetching Data using useEffect
  // ───────────────────────────────────────────────────────────────────────────
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) throw new Error("HTTP error status: " + response.status);
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.warn("API fetch failed, utilizing fallback users list:", err);
      setError("Failed to fetch live API data. Loaded fallback dataset.");
      setUsers(FALLBACK_USERS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ───────────────────────────────────────────────────────────────────────────
  // Task 1 (cont): useMemo for heavy/calculated data filtering & searching
  // ───────────────────────────────────────────────────────────────────────────
  const filteredUsers = useMemo(() => {
    console.log("%c⚡ [useMemo] Filtering & Searching Users Dataset...", "color: #38bdf8; font-weight: bold;");
    if (!users || users.length === 0) return [];

    const query = searchQuery.toLowerCase().trim();

    return users
      .filter((user) => {
        const nameMatch = user.name?.toLowerCase().includes(query);
        const emailMatch = user.email?.toLowerCase().includes(query);
        const companyMatch = (user.company?.name || user.company || "").toLowerCase().includes(query);
        const cityMatch = (user.address?.city || user.city || "").toLowerCase().includes(query);

        const matchesSearch = !query || nameMatch || emailMatch || companyMatch || cityMatch;

        const userCity = user.address?.city || user.city || "N/A";
        const matchesCity = selectedCity === "ALL" || userCity === selectedCity;

        return matchesSearch && matchesCity;
      })
      .sort((a, b) => {
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        if (sortBy === "name-desc") return b.name.localeCompare(a.name);
        if (sortBy === "id-asc") return a.id - b.id;
        if (sortBy === "id-desc") return b.id - a.id;
        return 0;
      });
  }, [users, searchQuery, selectedCity, sortBy]);

  // Derived statistics computed with useMemo
  const stats = useMemo(() => {
    console.log("%c📊 [useMemo] Calculating Stats Object...", "color: #a855f7; font-weight: bold;");
    const citiesSet = new Set(users.map((u) => u.address?.city || u.city || "N/A"));
    return {
      total: users.length,
      filtered: filteredUsers.length,
      favoritesCount: favorites.length,
      uniqueCitiesCount: citiesSet.size,
    };
  }, [users, filteredUsers, favorites]);

  // Extract unique city list for dropdown filter
  const cityOptions = useMemo(() => {
    const list = Array.from(new Set(users.map((u) => u.address?.city || u.city || "N/A"))).filter(Boolean);
    return list.sort();
  }, [users]);

  // ───────────────────────────────────────────────────────────────────────────
  // Task 2: useCallback to prevent re-creation of handler functions
  // ───────────────────────────────────────────────────────────────────────────

  // Stable Search Handler with useCallback
  const memoizedHandleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Stable Clear Search Handler
  const memoizedHandleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  // Stable Toggle Favorite Handler
  const memoizedHandleToggleFavorite = useCallback((userId) => {
    setFavorites((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  }, []);

  // Stable Delete User Handler
  const memoizedHandleDeleteUser = useCallback((userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  }, []);

  // Un-memoized handlers for comparative demonstration
  const unmemoizedHandleSearchChange = (e) => setSearchQuery(e.target.value);
  const unmemoizedHandleClearSearch = () => setSearchQuery("");
  const unmemoizedHandleToggleFavorite = (userId) => {
    setFavorites((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };
  const unmemoizedHandleDeleteUser = (userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  // Select active handlers based on toggle
  const activeSearchChange = useCallbackEnabled ? memoizedHandleSearchChange : unmemoizedHandleSearchChange;
  const activeClearSearch = useCallbackEnabled ? memoizedHandleClearSearch : unmemoizedHandleClearSearch;
  const activeToggleFavorite = useCallbackEnabled ? memoizedHandleToggleFavorite : unmemoizedHandleToggleFavorite;
  const activeDeleteUser = useCallbackEnabled ? memoizedHandleDeleteUser : unmemoizedHandleDeleteUser;

  // Reset all filters
  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCity("ALL");
    setSortBy("name-asc");
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ── Header Title Card ────────────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Day 23 React Hooks
                </span>
                <span className="text-xs text-slate-400">useMemo & useCallback Mastery</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Data Fetching, Filtering & Performance Optimization
              </h1>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                Fetch API datasets, process search & filter operations with <code className="text-cyan-300 font-mono">useMemo</code>, and avoid function re-creations with <code className="text-purple-300 font-mono">useCallback</code>.
              </p>
            </div>

            {/* Parent Render Badge & Trigger Button */}
            <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-3 flex flex-col items-center justify-center shrink-0">
              <span className="text-xs text-slate-400 uppercase font-mono tracking-wider">Parent Renders</span>
              <span className="text-2xl font-black text-cyan-400">{parentRenderCount.current}</span>
              <button
                onClick={() => setUnrelatedCount((c) => c + 1)}
                className="mt-2 text-xs font-medium px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-md"
              >
                Re-render Parent ({unrelatedCount})
              </button>
            </div>
          </div>
        </div>

        {/* ── Concept Explanation Cards ────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* useMemo Info */}
          <div className="bg-slate-900/70 border border-cyan-500/30 rounded-xl p-4 shadow-md">
            <h2 className="text-sm font-bold text-cyan-400 flex items-center gap-2 mb-2">
              <span>⚡</span> 1. useMemo (Data Fetch & Search Optimization)
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Caches the computed result of searching, filtering, and sorting the fetched data. The filter operation only runs when <code className="text-cyan-300">users</code>, <code className="text-cyan-300">searchQuery</code>, <code className="text-cyan-300">selectedCity</code>, or <code className="text-cyan-300">sortBy</code> state change.
            </p>
          </div>

          {/* useCallback Info */}
          <div className="bg-slate-900/70 border border-purple-500/30 rounded-xl p-4 shadow-md">
            <h2 className="text-sm font-bold text-purple-400 flex items-center gap-2 mb-2">
              <span>🔁</span> 2. useCallback (Prevent Function Re-creation)
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Returns a memoized version of callback functions (<code className="text-purple-300">onSearchChange</code>, <code className="text-purple-300">onToggleFavorite</code>, <code className="text-purple-300">onDeleteUser</code>). When passed to <code className="text-purple-300">React.memo</code> child components, it prevents unnecessary re-renders.
            </p>
          </div>
        </div>

        {/* ── useCallback Toggle & Performance Control Bar ────────────────── */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-300">useCallback Optimization Status:</span>
            <button
              onClick={() => setUseCallbackEnabled((prev) => !prev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-2 ${
                useCallbackEnabled
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-rose-500/20 text-rose-300 border-rose-500/40"
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${useCallbackEnabled ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`} />
              {useCallbackEnabled ? "useCallback ENABLED (Stable References)" : "useCallback DISABLED (Recreated Every Render)"}
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Tip: Click "Re-render Parent" above and watch child render counts!</span>
          </div>
        </div>

        {/* ── Stats Display Bar ────────────────────────────────────────────── */}
        <MemoizedStatsDisplay stats={stats} />

        {/* ── Search Input (Memoized Child) ────────────────────────────────── */}
        <MemoizedSearchInput
          searchQuery={searchQuery}
          onSearchChange={activeSearchChange}
          onClearSearch={activeClearSearch}
          placeholder="Search by name, email, city, or company..."
        />

        {/* ── Filter Controls & Sort Options ───────────────────────────────── */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-2">
              <label className="text-slate-400 font-medium">Filter by City:</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">All Cities ({users.length})</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-slate-400 font-medium">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="name-asc">Name (A ➔ Z)</option>
                <option value="name-desc">Name (Z ➔ A)</option>
                <option value="id-asc">ID (Ascending)</option>
                <option value="id-desc">ID (Descending)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetFilters}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Reset Filters
            </button>
            <button
              onClick={fetchUsers}
              className="text-xs px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors flex items-center gap-1.5"
            >
              <span>🔄</span> Refetch API Data
            </button>
          </div>
        </div>

        {/* ── Status Banner (Loading / Error) ──────────────────────────────── */}
        {loading && (
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-8 text-center space-y-3">
            <div className="inline-block w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-cyan-300">Fetching users data from API...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-4 text-xs text-rose-300 flex items-center justify-between">
            <span>⚠️ {error}</span>
            <button
              onClick={fetchUsers}
              className="px-2.5 py-1 bg-rose-800 hover:bg-rose-700 text-white rounded text-[11px]"
            >
              Retry
            </button>
          </div>
        )}

        {/* ── User Cards Grid (Memoized Children) ─────────────────────────── */}
        {!loading && (
          <div>
            <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
              <span>Showing {filteredUsers.length} of {users.length} users</span>
              {searchQuery && <span>Search filter active for "{searchQuery}"</span>}
            </div>

            {filteredUsers.length === 0 ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-12 text-center text-slate-400">
                <p className="text-lg font-medium text-slate-300 mb-1">No matching users found</p>
                <p className="text-xs text-slate-500 mb-4">Try adjusting your search criteria or resetting filters.</p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
                >
                  Reset Search & Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map((user) => (
                  <MemoizedUserCard
                    key={user.id}
                    user={user}
                    isFavorite={favorites.includes(user.id)}
                    onToggleFavorite={activeToggleFavorite}
                    onDeleteUser={activeDeleteUser}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default TwentyThree;
