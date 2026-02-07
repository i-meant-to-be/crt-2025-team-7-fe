import { useMutation } from '@tanstack/react-query';
import { signup } from '../apis/auth';
import type { PostAuthSignupResponseType } from '../responses/PostAuthSignupResponseType';

interface SignupCredentials {
  username: string;
  password: string;
}

export default function useSignup() {
  const mutation = useMutation<PostAuthSignupResponseType, unknown, SignupCredentials>({
    mutationFn: ({ username, password }) => signup(username, password),
  });

  return {
    ...mutation,
    isPending: mutation.isPending, // Explicitly expose isPending
  };
}
