import axios, { type AxiosResponse, type ResponseType } from 'axios';
import type { HttpMethod } from 'src/types/types';
import axiosInstance from './instance';

// Define APIError; It only represents error that is returned from API response.
export class APIError extends Error {
  public readonly status: number;
  public readonly data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'APIError';
  }
}

// Low-level http request function
export async function request<T>(
  method: HttpMethod,
  endpoint: string,
  data: object | null,
  params: object | null,
  responseType?: ResponseType,
): Promise<T> {
  const instance = axiosInstance;

  try {
    // Get response
    const response: AxiosResponse<T> = await instance({
      method,
      url: endpoint,
      data,
      params,
      responseType,
    });

    // If successful, return the response data
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      let errorMessage = '알 수 없는 오류가 발생했습니다.'; // 기본 메시지
      const responseData = error.response?.data;

      // 1. responseData가 존재하고,
      // 2. 타입이 'object'이며 null이 아니고,
      // 3. 'message'라는 키를 가지고 있는지 확인
      if (
        responseData &&
        typeof responseData === 'object' &&
        responseData !== null &&
        'message' in responseData &&
        typeof responseData.message === 'string' // message가 문자열인지도 확인
      ) {
        errorMessage = responseData.message;
      }

      const apiError = new APIError(
        errorMessage,
        error.response?.status || 500,
        responseData,
      );
      throw apiError;
    }

    // Axios 오류가 아닌 경우
    throw error;
  }
}

// HTTP Method helper functions
export async function get<T>(
  endpoint: string,
  params?: object,
): Promise<T> {
  return request<T>('GET', endpoint, null, params || null);
}

export async function post<T>(
  endpoint: string,
  data?: object,
  params?: object,
): Promise<T> {
  return request<T>('POST', endpoint, data || null, params || null);
}

export async function patch<T>(
  endpoint: string,
  data?: object,
  params?: object,
): Promise<T> {
  return request<T>('PATCH', endpoint, data || null, params || null);
}

export async function put<T>(
  endpoint: string,
  data?: object,
  params?: object,
): Promise<T> {
  return request<T>('PUT', endpoint, data || null, params || null);
}

export async function del<T>(
  endpoint: string,
  params?: object,
): Promise<T> {
  return request<T>('DELETE', endpoint, null, params || null);
}
