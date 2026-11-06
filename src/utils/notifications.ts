/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Web Notifications API utility for Motivation Timer Droit.
 * Alerts law students upon cycle completion (even when browser tab is minimized or in background).
 */

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getNotificationPermission(): NotificationPermission {
  if (!isNotificationSupported()) return 'denied';
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) return 'denied';
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.warn('Failed to request Web Notification permission:', error);
    return 'denied';
  }
}

export function sendSessionNotification(
  mode: 'revision' | 'pause',
  quoteText?: string
): void {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return;
  }

  const isRevision = mode === 'revision';
  const title = isRevision
    ? '⚖️ Audience levée ! Session validée (25 min)'
    : '☕ Suspension levée ! Fin de la pause (5 min)';

  const body = isRevision
    ? (quoteText
        ? `${quoteText}\nPrenez 5 minutes de pause bien méritée !`
        : 'Plaidoirie achevée avec succès. Vos 25 minutes de révision sont validées au plumitif !')
    : 'La pause café du greffier est terminée. Prêt à reprendre les fiches d\'arrêt ?';

  try {
    const notification = new Notification(title, {
      body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'motivation-timer-law-cycle',
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  } catch (error) {
    console.warn('Notification delivery suppressed by browser or OS:', error);
  }
}
