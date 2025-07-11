// Utilitas untuk generate dan mengambil deviceId unik per browser
import { cookies } from 'next/headers';

const DEVICE_ID_COOKIE = 'device_id';

function generateDeviceId() {
  // Kombinasi userAgent, platform, dan waktu random
  const raw = [
    navigator.userAgent,
    navigator.platform,
    new Date().getTime(),
    Math.random()
  ].join('-');
  // Hash sederhana (bisa diganti dengan hash lebih kuat jika perlu)
  return btoa(unescape(encodeURIComponent(raw)));
}

export function getDeviceId() {
  if (typeof window === 'undefined') return '';

  // Cek cookie dulu
  const cookieStore = document.cookie;
  const deviceIdFromCookie = cookieStore
    .split('; ')
    .find((row) => row.startsWith(DEVICE_ID_COOKIE))
    ?.split('=')[1];

  if (deviceIdFromCookie) {
    return deviceIdFromCookie;
  }

  // Jika tidak ada di cookie, cek localStorage
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = generateDeviceId();
  }

  // Set ke cookie dan localStorage
  document.cookie = `${DEVICE_ID_COOKIE}=${deviceId}; path=/; max-age=31536000; SameSite=Strict`;
  localStorage.setItem('deviceId', deviceId);

  return deviceId;
}

// Fungsi untuk menghapus deviceId (untuk logout)
export function clearDeviceId() {
  if (typeof window === 'undefined') return;

  document.cookie = `${DEVICE_ID_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  localStorage.removeItem('deviceId');
}
