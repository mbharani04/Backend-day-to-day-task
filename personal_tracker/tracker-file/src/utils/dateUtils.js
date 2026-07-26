// Date formatting and relative countdown utilities

export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatFullDate(date = new Date()) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getTimeGreeting(date = new Date()) {
  const hours = date.getHours();
  if (hours >= 4 && hours < 12) return 'Good Morning';
  if (hours >= 12 && hours < 17) return 'Good Afternoon';
  if (hours >= 17 && hours < 22) return 'Good Evening';
  return 'Good Night';
}

export function getCountdownDays(targetDateStr) {
  if (!targetDateStr) return '';
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(targetDateStr);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today!';
  if (diffDays === 1) return 'Tomorrow!';
  if (diffDays > 1) return `In ${diffDays} Days`;
  if (diffDays < 0) return `${Math.abs(diffDays)} Days Overdue`;
  return '';
}

export function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const matrix = [];
  let currentWeek = [];

  // Fill padding from previous month
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(year, month - 1, prevMonthLastDay - i);
    currentWeek.push({
      dateStr: prevDate.toISOString().split('T')[0],
      dayNumber: prevDate.getDate(),
      isCurrentMonth: false,
    });
  }

  // Fill current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const curDate = new Date(year, month, day);
    const dateStr = curDate.toISOString().split('T')[0];

    currentWeek.push({
      dateStr,
      dayNumber: day,
      isCurrentMonth: true,
    });

    if (currentWeek.length === 7) {
      matrix.push(currentWeek);
      currentWeek = [];
    }
  }

  // Fill padding for next month
  if (currentWeek.length > 0) {
    let nextMonthDay = 1;
    while (currentWeek.length < 7) {
      const nextDate = new Date(year, month + 1, nextMonthDay);
      currentWeek.push({
        dateStr: nextDate.toISOString().split('T')[0],
        dayNumber: nextMonthDay,
        isCurrentMonth: false,
      });
      nextMonthDay++;
    }
    matrix.push(currentWeek);
  }

  return matrix;
}
