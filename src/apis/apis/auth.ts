/**
 * Auth API
 * JWT 토큰 기반 인증 및 인가 처리
 */

import { ApiUrl } from '../endpoints';
import type { PostAuthSignupRequestType } from '../requests/PostAuthSignupRequestType';
import type { PostAuthSignupResponseType } from '../responses/PostAuthSignupResponseType';
import type { PostAuthTokenRequestType } from '../requests/PostAuthTokenRequestType';
import type { PostAuthTokenResponseType } from '../responses/PostAuthTokenResponseType';
import type { PostAuthLogoutResponseType } from '../responses/PostAuthLogoutResponseType';
import type { PostAuthRefreshRequestType } from '../requests/PostAuthRefreshRequestType';
import { request } from '../primitives';
import { PostAuthLogoutRequestType } from '../requests/PostAuthLogoutRequestType';

// Types
// Signup request/response types are defined under requests/ and responses/
export type LoginRequest = PostAuthTokenRequestType;
export type AuthResponse = PostAuthTokenResponseType;
export type TokenRefreshResponse = PostAuthTokenResponseType;

/**
 * 회원가입
 * @param username - 사용자명
 * @param password - 비밀번호
 */
export async function signup(
  username: string,
  password: string,
): Promise<PostAuthSignupResponseType> {
  const requestUrl: string = ApiUrl.auth.signup;
  const requestBody: PostAuthSignupRequestType = {
    username,
    password,
  };
  const response = await request<PostAuthSignupResponseType>(
    'POST',
    requestUrl,
    requestBody,
    null,
  );
  return response.data;
}

/**
 * 로그인 (accessToken, refreshToken 발급)
 * @param username - 사용자명
 * @param password - 비밀번호
 */
export async function login(
  username: string,
  password: string,
): Promise<PostAuthTokenResponseType> {
  const requestUrl: string = ApiUrl.auth.login;
  const requestBody: PostAuthTokenRequestType = {
    username,
    password,
  };
  const response = await request<PostAuthTokenResponseType>(
    'POST',
    requestUrl,
    requestBody,
    null,
  );

  return response.data;
}

/**
 * 로그아웃
 * @param refreshToken - 리프레시 토큰
 */
export async function logout(
  refreshToken: string,
): Promise<PostAuthLogoutResponseType> {
  const requestUrl: string = ApiUrl.auth.logout;
  const requestBody: PostAuthLogoutRequestType = {
    refresh: refreshToken,
  };
  const response = await request<PostAuthLogoutResponseType>(
    'POST',
    requestUrl,
    requestBody,
    null,
  );
  return response.data;
}

/**
 * Access Token 갱신
 * @param refreshToken - 리프레시 토큰
 */
export async function refreshToken(
  refreshToken: string,
): Promise<TokenRefreshResponse> {
  const requestUrl: string = ApiUrl.auth.tokenRefresh;
  const requestBody: PostAuthRefreshRequestType = {
    refresh: refreshToken,
  };
  const response = await request<PostAuthTokenResponseType>(
    'POST',
    requestUrl,
    requestBody,
    null,
  );
  return response.data;
}
// Note: profile/verify endpoints are not included in the minimal API list and
// therefore omitted here. Add them back when the backend exposes those routes.
