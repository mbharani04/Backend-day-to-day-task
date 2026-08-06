import React, { useState, useEffect } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Retrieve API URL from Vite environment variable
  const apiUrl = import.meta.env.VITE_PRODUCTS_API || "https://dummyjson.com/products";
  const apiBase = import.meta.env.VITE_API_BASE_URL || "https://dummyjson.com";

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
          setProducts(data.products || data || []);
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

  const categories = ["all", ...new Set(products.map((p) => p.category).filter(Boolean))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header & ENV Badge */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Lazy Page 1 Loaded
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                Vite ENV Enabled
              </span>
            </div>
            <h2 className="text-2xl font-black mt-2 tracking-tight">🛍️ E-Commerce Products Catalog</h2>
            <p className="text-sm text-indigo-200 mt-1 max-w-2xl">
              Dynamically loaded chunk displaying product data retrieved via environment variable endpoints.
            </p>
          </div>

          {/* ENV Information Box */}
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-xs font-mono max-w-xs space-y-1">
            <div className="text-indigo-300 font-bold">ENV VARIABLE BINDING:</div>
            <div className="truncate text-emerald-400">
              <span className="text-slate-300">VITE_PRODUCTS_API:</span> {apiUrl}
            </div>
            <div className="truncate text-slate-300">
              <span>VITE_API_BASE_URL:</span> {apiBase}
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-4 border-t border-indigo-700/50">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search products by title, brand, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-3 text-indigo-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-indigo-950/80 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 capitalize"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-900 text-white capitalize">
                Category: {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Rendering */}
      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center text-slate-500">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-sm font-semibold text-slate-600">Fetching live products API data...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800">
          <h3 className="font-bold text-lg">Failed to fetch products</h3>
          <p className="text-sm mt-1">{error}</p>
          <p className="text-xs text-rose-600 mt-2 font-mono">Attempted URL: {apiUrl}</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-bold text-slate-700">
              Showing {filteredProducts.length} of {products.length} Products
            </span>
            <span className="text-xs text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full font-bold border border-indigo-100">
              Fetched from import.meta.env
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200">
              <p className="text-slate-600 font-medium">No products match your search criteria.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                }}
                className="mt-3 text-xs font-bold text-indigo-600 hover:underline"
              >
                Clear search filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.slice(0, 12).map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={product.thumbnail || product.images?.[0]}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900/80 text-white backdrop-blur-md">
                      ${product.price}
                    </span>
                    {product.rating && (
                      <span className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold bg-amber-400 text-slate-900 flex items-center gap-1 shadow">
                        ★ {product.rating}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {product.category || "General"}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">Brand: {product.brand || "Generic"}</span>
                      <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        In Stock ({product.stock || 10})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;
