// ─── Profile Page ─────────────────────────────────────────────────────────────
// Displays user profile info, preferences, saved news, and liked news.

import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiBookmark,
  FiHeart,
  FiSun,
  FiMoon,
  FiLogOut,
  FiEdit2,
  FiCheck,
  FiX,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useBookmarks } from "../context/BookmarkContext";
import { formatDate, getInitials } from "../utils/helpers";

// Tab definitions — array of objects, rendered with map()
const TABS = [
  { id: "overview",  label: "Overview",       icon: FiUser },
  { id: "saved",     label: "Saved News",      icon: FiBookmark },
  { id: "liked",     label: "Liked News",      icon: FiHeart },
];

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { bookmarks, likes, bookmarkCount, likeCount } = useBookmarks();
  const navigate = useNavigate();

  // ── State ─────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("overview");
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(user?.fullName || "");
  const [editError, setEditError] = useState("");

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const handleSaveName = useCallback(() => {
    if (!editName.trim() || editName.trim().length < 2) {
      setEditError("Name must be at least 2 characters.");
      return;
    }
    updateUser({ fullName: editName.trim() });
    setEditing(false);
    setEditError("");
  }, [editName, updateUser]);

  const handleCancelEdit = () => {
    setEditName(user?.fullName || "");
    setEditing(false);
    setEditError("");
  };

  // useMemo: compute avatar gradient color (stable per user)
  const avatarGradient = useMemo(
    () => "from-violet-600 to-cyan-500",
    []
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Profile Hero ── */}
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/40 rounded-2xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className={`w-24 h-24 bg-gradient-to-br ${avatarGradient} rounded-2xl flex items-center justify-center text-white text-3xl font-extrabold shadow-2xl shadow-violet-500/30 flex-shrink-0`}>
              {getInitials(user.fullName)}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              {/* Editable Name */}
              {editing ? (
                <div className="mb-3">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <input
                      id="edit-name-input"
                      value={editName}
                      onChange={(e) => { setEditName(e.target.value); setEditError(""); }}
                      className="bg-slate-700 text-white rounded-xl px-3 py-2 text-xl font-bold outline-none border border-slate-600 focus:border-violet-500 transition-all"
                      autoFocus
                    />
                    <button onClick={handleSaveName} className="p-2 bg-green-600 text-white rounded-xl hover:bg-green-500 transition-all">
                      <FiCheck />
                    </button>
                    <button onClick={handleCancelEdit} className="p-2 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-all">
                      <FiX />
                    </button>
                  </div>
                  {editError && <p className="text-rose-400 text-xs mt-1">{editError}</p>}
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                  <h1 className="text-2xl font-extrabold text-white">{user.fullName}</h1>
                  <button
                    id="edit-profile-btn"
                    onClick={() => setEditing(true)}
                    className="p-1.5 text-slate-500 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-all"
                    title="Edit name"
                  >
                    <FiEdit2 className="text-sm" />
                  </button>
                </div>
              )}

              {/* Meta info */}
              <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-start text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <FiMail className="text-violet-400" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiCalendar className="text-cyan-400" />
                  Joined {formatDate(user.joinedAt)}
                </span>
              </div>

              {/* Stats row */}
              <div className="flex gap-6 mt-4 justify-center sm:justify-start">
                <div className="text-center sm:text-left">
                  <p className="text-white font-extrabold text-xl">{bookmarkCount}</p>
                  <p className="text-slate-500 text-xs">Saved</p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-white font-extrabold text-xl">{likeCount}</p>
                  <p className="text-slate-500 text-xs">Liked</p>
                </div>
              </div>
            </div>

            {/* Logout */}
            <button
              id="profile-logout"
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 rounded-xl text-sm font-medium transition-all self-start"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>

        {/* ── Theme Preference ── */}
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5 mb-6 flex items-center justify-between">
          <div>
            <p className="text-white font-semibold">Theme Preference</p>
            <p className="text-slate-400 text-sm">
              Currently using <span className="text-violet-300">{isDark ? "Dark" : "Light"}</span> mode
            </p>
          </div>
          <button
            id="profile-theme-toggle"
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isDark
                ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            {isDark ? <FiSun /> : <FiMoon />}
            Switch to {isDark ? "Light" : "Dark"}
          </button>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 mb-6 bg-slate-800/40 p-1 rounded-xl border border-slate-700/40">
          {/* map() — render tabs from array of objects */}
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              id={`tab-${id}`}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? "bg-violet-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon className="text-base" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6">
              <h2 className="text-white font-bold mb-4">Account Details</h2>
              <div className="space-y-3">
                {[
                  { icon: FiUser, label: "Full Name", value: user.fullName },
                  { icon: FiMail, label: "Email", value: user.email },
                  { icon: FiCalendar, label: "Member Since", value: formatDate(user.joinedAt) },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4 p-3 bg-slate-900/50 rounded-xl">
                    <Icon className="text-violet-400 flex-shrink-0" />
                    <div>
                      <p className="text-slate-500 text-xs">{label}</p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "saved" && (
          <div>
            {bookmarks.length === 0 ? (
              <div className="text-center py-16">
                <FiBookmark className="text-slate-600 text-4xl mx-auto mb-3" />
                <p className="text-slate-400">No saved articles yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* map() — render all bookmarks */}
                {bookmarks.map((article, idx) => (
                  <a
                    key={article.url || idx}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 p-4 bg-slate-800/40 border border-slate-700/40 rounded-2xl hover:border-violet-500/30 transition-all group"
                  >
                    <img
                      src={article.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=100"}
                      alt=""
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=100"; }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold line-clamp-2 group-hover:text-violet-300 transition-colors">
                        {article.title}
                      </p>
                      <p className="text-slate-500 text-xs mt-1">
                        {article.source?.name} · {formatDate(article.publishedAt)}
                      </p>
                    </div>
                    <FiBookmark className="text-amber-400 flex-shrink-0 fill-amber-400" />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "liked" && (
          <div>
            {likes.length === 0 ? (
              <div className="text-center py-16">
                <FiHeart className="text-slate-600 text-4xl mx-auto mb-3" />
                <p className="text-slate-400">No liked articles yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* map() — render all liked articles */}
                {likes.map((article, idx) => (
                  <a
                    key={article.url || idx}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 p-4 bg-slate-800/40 border border-slate-700/40 rounded-2xl hover:border-rose-500/30 transition-all group"
                  >
                    <img
                      src={article.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=100"}
                      alt=""
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=100"; }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold line-clamp-2 group-hover:text-rose-300 transition-colors">
                        {article.title}
                      </p>
                      <p className="text-slate-500 text-xs mt-1">
                        {article.source?.name} · {formatDate(article.publishedAt)}
                      </p>
                    </div>
                    <FiHeart className="text-rose-400 flex-shrink-0 fill-rose-400" />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
