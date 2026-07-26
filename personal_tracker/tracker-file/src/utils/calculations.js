// Productivity, Improvement, Study Hours, and Streak calculations

export function calculateProductivityPercentage(tasks = [], targetDate = null) {
  const dateStr = targetDate || new Date().toISOString().split('T')[0];
  const dayTasks = tasks.filter((t) => t.dueDate === dateStr);
  if (dayTasks.length === 0) return 0;

  const completed = dayTasks.filter((t) => t.status === 'Completed').length;
  return Math.round((completed / dayTasks.length) * 100);
}

export function calculateImprovementPercentage(currentVal = 0, previousVal = 0) {
  if (previousVal === 0) {
    return currentVal > 0 ? 100 : 0;
  }
  const diff = currentVal - previousVal;
  return Math.round((diff / previousVal) * 100);
}

export function calculateStudyTimeStats(studySessions = []) {
  const todayStr = new Date().toISOString().split('T')[0];
  
  // Get 7 days ago timestamp
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 86400000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 86400000);

  let todayMinutes = 0;
  let weeklyMinutes = 0;
  let monthlyMinutes = 0;

  studySessions.forEach((session) => {
    const sessionDate = new Date(session.date);
    const duration = Number(session.actualDuration || session.durationMinutes) || 0;

    if (session.date === todayStr) {
      todayMinutes += duration;
    }
    if (sessionDate >= sevenDaysAgo) {
      weeklyMinutes += duration;
    }
    if (sessionDate >= thirtyDaysAgo) {
      monthlyMinutes += duration;
    }
  });

  return {
    todayHours: (todayMinutes / 60).toFixed(1),
    weeklyHours: (weeklyMinutes / 60).toFixed(1),
    monthlyHours: (monthlyMinutes / 60).toFixed(1),
    totalSessions: studySessions.length,
  };
}

export function calculateStreak(activityLogs = [], tasks = [], studySessions = []) {
  // Extract all distinct dates with at least 1 completed task, target, or study session
  const activeDates = new Set();

  activityLogs.forEach((log) => {
    if (log.date) activeDates.add(log.date);
  });

  tasks.forEach((t) => {
    if (t.status === 'Completed' && t.completedAt) {
      activeDates.add(t.completedAt);
    }
  });

  studySessions.forEach((s) => {
    if (s.date) activeDates.add(s.date);
  });

  if (activeDates.size === 0) {
    return { currentStreak: 0, longestStreak: 0, totalProductiveDays: 0 };
  }

  const today = new Date();
  let currentStreak = 0;
  let checkDate = new Date(today);

  // Check today or yesterday as start of active streak
  let checkStr = checkDate.toISOString().split('T')[0];
  if (!activeDates.has(checkStr)) {
    // try yesterday
    checkDate.setDate(checkDate.getDate() - 1);
    checkStr = checkDate.toISOString().split('T')[0];
  }

  while (activeDates.has(checkStr)) {
    currentStreak++;
    checkDate.setDate(checkDate.getDate() - 1);
    checkStr = checkDate.toISOString().split('T')[0];
  }

  // Calculate longest streak
  const sortedDates = Array.from(activeDates).sort();
  let longestStreak = 0;
  let tempStreak = 0;
  let prevDate = null;

  sortedDates.forEach((dStr) => {
    const d = new Date(dStr);
    if (!prevDate) {
      tempStreak = 1;
    } else {
      const diffDays = Math.round((d.getTime() - prevDate.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        tempStreak++;
      } else if (diffDays > 1) {
        tempStreak = 1;
      }
    }
    prevDate = d;
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }
  });

  return {
    currentStreak,
    longestStreak: Math.max(currentStreak, longestStreak),
    totalProductiveDays: activeDates.size,
  };
}

export function calculateAttendancePercentage(present, total) {
  if (!total || total === 0) return 0;
  return Math.round((present / total) * 100);
}
