import { useMutation } from '@tanstack/react-query';
import { login } from '../apis/auth';
import { setAccessToken, setRefreshToken } from '../utils/tokenStorage';
import type { PostAuthTokenResponseType } from '../responses/PostAuthTokenResponseType';
import { ApiUrl } from '../endpoints';

interface LoginCredentials {
  username: string;
  password: string;
}

export default function useLogin() {
  return useMutation<PostAuthTokenResponseType, unknown, LoginCredentials>({
    mutationFn: ({ username, password }) => {
      console.log('Login API Request URL:', ApiUrl.auth.login);
      return login(username, password);
    },
    onSuccess: (data) => {
      // store tokens (backend returns { access, refresh })
      if (data.access) setAccessToken(data.access);
      if (data.refresh) setRefreshToken(data.refresh);
    },
  });
}
