import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiPlus, FiCheckCircle, FiTrash2, FiDollarSign, FiSearch } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';

const ThingsToBuy = () => {
  const { shopping, addShoppingItem, toggleShoppingPurchased, deleteShoppingItem } = useApp();

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [priority, setPriority] = useState('High');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !price) return;
    addShoppingItem({
      id: uuidv4(),
      productName,
      price: Number(price),
      priority,
      purchased: false
    });
    setProductName('');
    setPrice('');
  };

  const filteredShopping = shopping.filter(item =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingItems = shopping.filter(i => !i.purchased);
  const totalPendingCost = pendingItems.reduce((sum, i) => sum + (Number(i.price) || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FiShoppingBag className="w-7 h-7 text-amber-500" /> Things To Buy (Wishlist)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Curate tech gear, books, and essential items with cost planning
          </p>
        </div>

        <div className="glass-panel px-5 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-amber-500/10">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Wishlist Budget Estimate</p>
          <p className="text-2xl font-extrabold text-amber-500 mt-0.5">{formatCurrency(totalPendingCost)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4 h-fit">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FiPlus className="w-4 h-4 text-amber-500" /> Add Wishlist Item
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Product Name</label>
              <input
                type="text"
                placeholder="e.g. 4K UltraWide Monitor 34''"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Price ($)</label>
              <input
                type="number"
                placeholder="699"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-600 text-white font-semibold text-xs shadow-md shadow-amber-500/20 hover:scale-[1.02] transition-all"
            >
              Add To Wishlist
            </button>
          </form>
        </div>

        {/* Right Wishlist Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 relative">
            <FiSearch className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search wishlist items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 text-xs text-slate-900 dark:text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredShopping.map(item => (
              <motion.div
                key={item.id}
                layout
                className={`glass-panel p-5 rounded-2xl border transition-all space-y-3 ${
                  item.purchased
                    ? 'bg-emerald-500/5 border-emerald-500/30 opacity-75'
                    : 'border-slate-200 dark:border-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.purchased}
                      onChange={() => toggleShoppingPurchased(item.id)}
                      className="w-5 h-5 rounded-lg accent-amber-600 cursor-pointer"
                    />
                    <div>
                      <h4 className={`font-bold text-sm text-slate-900 dark:text-white ${item.purchased ? 'line-through text-slate-400' : ''}`}>
                        {item.productName}
                      </h4>
                      <p className="text-xs font-bold text-amber-500 mt-0.5">{formatCurrency(item.price)}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteShoppingItem(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/50 dark:border-white/5">
                  <span className={`px-2.5 py-0.5 rounded-full font-semibold text-[10px] ${
                    item.priority === 'High' ? 'bg-rose-500/20 text-rose-400' :
                    item.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {item.priority} Priority
                  </span>
                  <span className={`font-bold ${item.purchased ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {item.purchased ? '✓ Purchased' : 'Pending Wishlist'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThingsToBuy;
