import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import ClearableInput from '../../components/ClearableInput/ClearableInput';
import useLogin from '../../apis/hooks/useLogin';

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saveId, setSaveId] = useState(false);
  const navigate = useNavigate();

  const { mutate: login, isPending } = useLogin();

  const handleLogin = () => {
    if (!userName || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    login(
      { username: userName, password },
      {
        onSuccess: () => {
          // 토큰 저장은 useLogin 훅에서 처리
          navigate('/recipe');
        },
        onError: (error) => {
          console.error('Login error:', error);
          alert('로그인에 실패했습니다.');
        },
      },
    );
  };

  return (
    <div className="bg-primary-container/30 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-8 bg-primary-container/30 rounded-lg shadow-md"> {/* Updated background color */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="로고" className="h-16" />
        </div>
        <h2 className="text-lg font-semibold mb-8 text-center text-gray-800">로그인</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">아이디</label>
          <ClearableInput
            value={userName}
            onChange={e => setUserName(e.target.value)}
            onClear={() => setUserName('')}
            className="w-full border border-gray-400 rounded-md p-1.5 focus:ring-2 focus:ring-primary focus:outline-none text-gray-700 bg-brown-100" // Added bg-brown-100 for light brown background
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">비밀번호</label>
          <ClearableInput
            value={password}
            onChange={e => setPassword(e.target.value)}
            onClear={() => setPassword('')}
            type={showPassword ? "text" : "password"}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(prev => !prev)}
            className="w-full border border-gray-400 rounded-md p-1.5 focus:ring-2 focus:ring-primary focus:outline-none text-gray-700 bg-brown-100" // Added bg-brown-100 for light brown background
          />
        </div>
        <div className="flex items-center mb-6">
          <input
            id="saveId"
            type="checkbox"
            checked={saveId}
            onChange={() => setSaveId(!saveId)}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="saveId" className="ml-2 text-sm text-gray-600">
            아이디 저장
          </label>
        </div>
        <Button
          label={isPending ? '로그인 중...' : '로그인'}
          onClick={handleLogin} // Updated to use handleLogin function
          disabled={isPending}
          className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary-dark transition-colors"
        />
        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/signup')}
            className="text-sm text-gray-500 hover:underline"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
