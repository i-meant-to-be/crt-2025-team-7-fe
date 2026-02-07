import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Button from '../../components/Button/Button';
import ClearableInput from '../../components/ClearableInput/ClearableInput';
import useSignup from '../../apis/hooks/useSignup';

const signupQueryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      throwOnError: false,
    },
  },
});

function SignupPageInner() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const navigate = useNavigate();

  const { mutate: signup, isPending } = useSignup(); // Updated to use isPending

  const handleSignup = () => {
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    signup(
      { username: username, password },
      {
        onSuccess: (data) => {
          alert(`어서오세요, ${data.username}님!`);
          // 회원가입 성공 후 로그인 페이지로 이동
          navigate('/');
        },
        onError: (error) => {
          alert('회원가입에 실패했습니다.');
          console.error('Signup error:', error);
        },
      },
    );
  };

  return (
    <div className="bg-primary-container/30 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-8 bg-primary-container/30 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="로고" className="h-16" />
        </div>
        <h2 className="text-lg font-semibold mb-8 text-center text-gray-800">회원가입</h2>
        <div className="mb-6 text-center text-sm text-gray-500">카페인 블루로그 가입하고 나의 성공시대 시작됐다</div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">아이디</label>
          <ClearableInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onClear={() => setUsername('')}
            className="w-full border border-gray-400 rounded-md p-1.5 focus:ring-2 focus:ring-primary focus:outline-none text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">비밀번호</label>
          <ClearableInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClear={() => setPassword('')}
            type={showPassword ? 'text' : 'password'}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((prev) => !prev)}
            className="w-full border border-gray-400 rounded-md p-1.5 focus:ring-2 focus:ring-primary focus:outline-none text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">비밀번호 확인</label>
          <ClearableInput
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            onClear={() => setPasswordConfirm('')}
            type={showPasswordConfirm ? 'text' : 'password'}
            showPassword={showPasswordConfirm}
            onTogglePassword={() => setShowPasswordConfirm((prev) => !prev)}
            className="w-full border border-gray-400 rounded-md p-1.5 focus:ring-2 focus:ring-primary focus:outline-none text-gray-700"
          />
        </div>
        <div className="w-full mb-4 h-5 text-xs text-center">
          {passwordConfirm && password !== passwordConfirm && (
            <span className="text-red-500">비밀번호가 일치하지 않습니다.</span>
          )}
          {passwordConfirm && password === passwordConfirm && (
            <span className="text-green-500">비밀번호가 일치합니다.</span>
          )}
        </div>
        <Button
          label={isPending ? '회원가입 중...' : '회원가입'} // Updated to use isPending
          onClick={handleSignup}
          disabled={isPending} // Updated to use isPending
          className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary-dark transition-colors"
        />
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <QueryClientProvider client={signupQueryClient}>
      <SignupPageInner />
    </QueryClientProvider>
  );
}