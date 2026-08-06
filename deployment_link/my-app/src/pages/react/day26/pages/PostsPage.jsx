import React, { useState, useEffect } from "react";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const apiUrl = import.meta.env.VITE_POSTS_API || "https://dummyjson.com/posts";

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
          setPosts(data.posts || data || []);
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

  const filteredPosts = posts.filter((post) => {
    const title = (post.title || "").toLowerCase();
    const body = (post.body || "").toLowerCase();
    const query = search.toLowerCase();
    return title.includes(query) || body.includes(query);
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-violet-900 via-purple-900 to-pink-900 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-pink-400/20 text-pink-200 border border-pink-400/30">
                Lazy Page 3 Loaded
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-violet-400/20 text-violet-200 border border-violet-400/30">
                Vite ENV Configured
              </span>
            </div>
            <h2 className="text-2xl font-black mt-2 tracking-tight">📝 Articles & Developer Posts Feed</h2>
            <p className="text-sm text-purple-200 mt-1 max-w-2xl">
              Dynamically loaded chunk presenting news & article posts from environment variable API endpoints.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-xs font-mono max-w-xs space-y-1">
            <div className="text-pink-200 font-bold">ENV VARIABLE BINDING:</div>
            <div className="truncate text-purple-300">
              <span className="text-slate-300">VITE_POSTS_API:</span> {apiUrl}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mt-6 pt-4 border-t border-purple-700/50">
          <input
            type="text"
            placeholder="Search articles by title or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center text-slate-500">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-sm font-semibold text-slate-600">Fetching live posts feed...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800">
          <h3 className="font-bold text-lg">Failed to fetch articles</h3>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-bold text-slate-700">
              Showing {filteredPosts.length} of {posts.length} Publications
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.slice(0, 8).map((post) => (
              <article
                key={post.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-100"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 hover:text-purple-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-4">
                    {post.body}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 font-semibold text-rose-600">
                      ❤️ {post.reactions?.likes ?? post.reactions ?? 14} Likes
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-indigo-600">
                      👁️ {post.views ?? 320} Views
                    </span>
                  </div>
                  <span className="text-slate-400 font-mono">Article #{post.id}</span>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostsPage;
