import { useMutation } from '@tanstack/react-query';
import { logout } from '../apis/auth';
import { clearAllTokens, getRefreshToken } from '../utils/tokenStorage';
import type { PostAuthLogoutResponseType } from '../responses/PostAuthLogoutResponseType';

export function useLogout() {
  return useMutation<PostAuthLogoutResponseType, unknown, void>({
    mutationFn: async () => {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error('Refresh token not found');
      }
      return logout(refreshToken);
    },
    onSuccess: () => {
      clearAllTokens();
    },
  });
}
