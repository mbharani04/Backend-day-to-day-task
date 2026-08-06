import React, { useState, useEffect } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const apiUrl = import.meta.env.VITE_USERS_API || "https://dummyjson.com/users";

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setUsers(data.users || data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  const filteredUsers = users.filter((u) => {
    const fullName = `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();
    const email = (u.email || "").toLowerCase();
    const role = (u.role || u.company?.title || "").toLowerCase();
    const query = search.toLowerCase();
    return fullName.includes(query) || email.includes(query) || role.includes(query);
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-800 via-emerald-800 to-cyan-900 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-teal-400/20 text-teal-200 border border-teal-400/30">
                Lazy Page 2 Loaded
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                Vite ENV Configured
              </span>
            </div>
            <h2 className="text-2xl font-black mt-2 tracking-tight">👥 User Profiles & Team Directory</h2>
            <p className="text-sm text-teal-100 mt-1 max-w-2xl">
              Dynamically loaded chunk displaying user roster loaded from environment variable API source.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-xs font-mono max-w-xs space-y-1">
            <div className="text-teal-200 font-bold">ENV VARIABLE BINDING:</div>
            <div className="truncate text-emerald-300">
              <span className="text-slate-300">VITE_USERS_API:</span> {apiUrl}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mt-6 pt-4 border-t border-teal-700/50">
          <input
            type="text"
            placeholder="Search users by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-teal-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center text-slate-500">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-sm font-semibold text-slate-600">Fetching live user profiles API...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800">
          <h3 className="font-bold text-lg">Failed to fetch user directory</h3>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-bold text-slate-700">
              Showing {filteredUsers.length} of {users.length} Team Members
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.slice(0, 12).map((user) => (
              <div
                key={user.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstName}`}
                    alt={user.firstName}
                    className="w-14 h-14 rounded-full bg-slate-100 border-2 border-teal-500 object-cover shadow"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-900 text-base truncate">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-xs text-teal-600 font-semibold truncate">
                      {user.company?.title || user.role || "Software Engineer"}
                    </p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {user.company?.name || "Tech Solutions Ltd."}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="font-medium text-slate-800 truncate max-w-[180px]">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Phone:</span>
                    <span className="font-mono text-slate-700">{user.phone || "+1 (555) 019-283"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">City:</span>
                    <span className="font-semibold text-teal-700">{user.address?.city || "New York"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UsersPage;
