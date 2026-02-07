/**
 * Auth API
 * JWT 토큰 기반 인증 및 인가 처리
 */

import { ApiUrl } from '../endpoints';
import { post } from '../primitives';
import type { PostAuthSignupRequestType } from '../requests/PostAuthSignupRequestType';
import type { PostAuthSignupResponseType } from '../responses/PostAuthSignupResponseType';
import type { PostAuthTokenRequestType } from '../requests/PostAuthTokenRequestType';
import type { PostAuthTokenResponseType } from '../responses/PostAuthTokenResponseType';
import type { PostAuthLogoutResponseType } from '../responses/PostAuthLogoutResponseType';
import type { PostAuthRefreshRequestType } from '../requests/PostAuthRefreshRequestType';

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
  const response = await post<PostAuthSignupResponseType>(ApiUrl.auth.signup, {
    username,
    password,
  });
  return response;
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
  const response = await post<PostAuthTokenResponseType>(ApiUrl.auth.token, {
    username,
    password,
  });
  return response;
}

/**
 * 로그아웃
 * @param refreshToken - 리프레시 토큰
 */
export async function logout(
  refreshToken: string,
): Promise<PostAuthLogoutResponseType> {
  const response = await post<PostAuthLogoutResponseType>(ApiUrl.auth.logout, {
    refresh: refreshToken,
  });
  return response;
}

/**
 * Access Token 갱신
 * @param refreshToken - 리프레시 토큰
 */
export async function refreshToken(
  refreshToken: string,
): Promise<TokenRefreshResponse> {
  const response = await post<PostAuthTokenResponseType>(
    ApiUrl.auth.tokenRefresh,
    {
      refresh: refreshToken,
    },
  );
  return response;
}
// Note: profile/verify endpoints are not included in the minimal API list and
// therefore omitted here. Add them back when the backend exposes those routes.
