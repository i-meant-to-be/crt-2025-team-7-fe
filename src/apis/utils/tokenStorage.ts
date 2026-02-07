/**
 * Token storage helpers
 * - stores access/refresh tokens in localStorage
 * - provides helpers to check expiry (JWT 'exp')
 */

export function getAccessToken(): string | null {
  return localStorage.getItem('accessToken');
}

export function setAccessToken(token: string): void {
  localStorage.setItem('accessToken', token);
}

export function removeAccessToken(): void {
  localStorage.removeItem('accessToken');
}

export function getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken');
}

export function setRefreshToken(token: string): void {
  localStorage.setItem('refreshToken', token);
}

export function removeRefreshToken(): void {
  localStorage.removeItem('refreshToken');
}

export function clearAllTokens(): void {
  removeAccessToken();
  removeRefreshToken();
}

export function parseJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1];
    // atob is available in browser environments
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(
      Array.prototype.map
        .call(decoded, (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    ));
  } catch {
    return null;
  }
}

export function isTokenExpired(token?: string | null): boolean {
  const t = token ?? getAccessToken();
  if (!t) return true;
  const payload = parseJwtPayload(t);
  if (!payload) return true;
  const exp = payload.exp;
  if (typeof exp !== 'number') return false; // no exp claim -> treat as not expired
  const now = Math.floor(Date.now() / 1000);
  return now >= exp;
}

export default {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
  clearAllTokens,
  parseJwtPayload,
  isTokenExpired,
};