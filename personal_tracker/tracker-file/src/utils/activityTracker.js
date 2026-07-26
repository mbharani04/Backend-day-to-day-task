// Log activity generator helper

export function createActivityLog(type, title, category = 'General') {
  const todayStr = new Date().toISOString().split('T')[0];
  return {
    id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type, // 'task_completed' | 'target_completed' | 'study_session' | 'skill_updated' | 'attendance_updated' | 'event_created'
    title,
    category,
    date: todayStr,
    timestamp: Date.now(),
  };
}
