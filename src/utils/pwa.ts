
/**
 * PWA utility functions
 */

/**
 * Check if the app is running in standalone mode (installed as PWA)
 */
export const isRunningAsPWA = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         (window.navigator as any).standalone === true;
};

/**
 * Check if the device is capable of installing PWAs
 */
export const isPWAInstallable = (): boolean => {
  return 'serviceWorker' in navigator && 
         window.matchMedia('(display-mode: browser)').matches;
};

/**
 * Request notification permission
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }
  
  if (Notification.permission === 'granted') {
    return true;
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  
  return false;
};

/**
 * Send a test notification if permission is granted
 */
export const sendTestNotification = (title = 'PiEat-Me', message = 'Notification system is working!') => {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(title, {
        body: message,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
      });
    });
    return true;
  }
  return false;
};
