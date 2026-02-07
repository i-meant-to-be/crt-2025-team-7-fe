import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';
import * as tokenStorage from './utils/tokenStorage';
import { ApiUrl } from './endpoints';

const isMockingEnabled = import.meta.env.VITE_MOCK;
const baseUrl = isMockingEnabled
  ? undefined
  : import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  timeoutErrorMessage:
    '시간 초과로 인해 요청을 처리하지 못했어요... 잠시 후 다시 시도해 주세요.',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Use endpoints definition for refresh path
function refreshUrl(): string {
  return ApiUrl.auth.tokenRefresh;
}

// Request interceptor (JWT 토큰 자동 추가)
axiosInstance.interceptors.request.use(
  (config) => {
    // JWT 토큰을 Authorization 헤더에 추가 via tokenStorage
    const token = tokenStorage.getAccessToken();
    if (token) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (config.headers as any).Authorization = `Bearer ${token}`;
    }

    // Development logging
    if (import.meta.env.DEV) {
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
      );
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  },
);

// Refresh flow state
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

// Response interceptor with 401 -> try refresh token and retry
axiosInstance.interceptors.response.use(
  (response) => {
    // Development logging
    if (import.meta.env.DEV) {
      console.log(
        `[API Response] ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`,
      );
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = tokenStorage.getRefreshToken();
      if (!refreshToken) {
        tokenStorage.clearAllTokens();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (originalRequest.headers as any).Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        // Use a plain axios instance to avoid interceptor loop
        const refreshClient = axios.create({ baseURL: baseUrl });
        const resp = await refreshClient.post(refreshUrl(), {
          refresh: refreshToken,
        });
        const newAccessToken = resp.data?.access;
        const newRefreshToken = resp.data?.refresh;

        if (newAccessToken) {
          tokenStorage.setAccessToken(newAccessToken);
        }
        if (newRefreshToken) {
          tokenStorage.setRefreshToken(newRefreshToken);
        }

        onRefreshed(newAccessToken || '');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (originalRequest.headers as any).Authorization =
          `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        tokenStorage.clearAllTokens();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    console.error('[API Response Error]', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
