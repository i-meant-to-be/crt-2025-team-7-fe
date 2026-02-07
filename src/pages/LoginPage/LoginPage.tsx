import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import ClearableInput from '../../components/ClearableInput/ClearableInput';

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saveId, setSaveId] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userName, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Assuming the token is in the response

        if (token) {
          localStorage.setItem('jwtToken', token); // Save token to localStorage
          navigate('/recipe'); // Navigate to /recipe page
        } else {
          alert('로그인에 실패했습니다.');
        }
      } else {
        alert('로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
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
          label="로그인"
          onClick={handleLogin} // Updated to use handleLogin function
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
