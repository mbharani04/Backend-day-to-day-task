// In-app & Browser Notification Manager

export function createNotification(title, message, type = 'info') {
  return {
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    title,
    message,
    type, // 'info' | 'success' | 'warning' | 'error'
    timestamp: Date.now(),
    read: false,
  };
}

export function requestBrowserNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission().catch(() => {});
  }
}

export function showBrowserNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, { body, icon: '/favicon.ico' });
    } catch (e) {
      console.warn('Browser notification failed:', e);
    }
  }
}
