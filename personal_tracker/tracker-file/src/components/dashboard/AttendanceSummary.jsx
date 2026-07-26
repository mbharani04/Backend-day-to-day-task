import React from 'react';
import { ClipboardCheck, AlertTriangle } from 'lucide-react';
import { useProductivity } from '../../context/ProductivityContext';
import { calculateAttendancePercentage } from '../../utils/calculations';

export const AttendanceSummary = () => {
  const { attendance } = useProductivity();

  const warnings = attendance.filter((item) => {
    const pct = calculateAttendancePercentage(item.present, item.totalClasses);
    return pct < item.requiredPercentage;
  });

  return (
    <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Attendance Summary
          </h3>
          <p className="text-xs text-slate-400">Class & internship attendance ratios</p>
        </div>
        <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
          <ClipboardCheck className="w-4 h-4" />
        </div>
      </div>

      {/* Warning Alert Banner */}
      {warnings.length > 0 && (
        <div className="mt-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2 animate-pulse-subtle">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            ⚠️ Warning: {warnings.length} category attendance is below your required target!
          </span>
        </div>
      )}

      <div className="flex-1 mt-3 space-y-3 max-h-72 overflow-y-auto pr-1">
        {attendance.length === 0 ? (
          <div className="py-10 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2.5">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 animate-float">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-slate-200 text-sm">No attendance data yet 📋</p>
              <p className="text-slate-400 text-xs mt-0.5">Add an attendance category to start tracking.</p>
            </div>
          </div>
        ) : (
          attendance.map((item) => {
            const pct = calculateAttendancePercentage(item.present, item.totalClasses);
            const isLow = pct < item.requiredPercentage;

            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl glass-card border transition-all ${
                  isLow ? 'border-amber-500/40 bg-amber-500/5' : 'border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-100 truncate max-w-[200px]">
                    {item.category}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      isLow ? 'text-amber-400' : 'text-cyan-400'
                    }`}
                  >
                    {pct}% (Target: {item.requiredPercentage}%)
                  </span>
                </div>

                <div className="mt-2 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isLow
                        ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                        : 'bg-gradient-to-r from-cyan-500 to-indigo-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Present: {item.present}</span>
                  <span>Absent: {item.absent}</span>
                  <span>Total: {item.totalClasses}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AttendanceSummary;
