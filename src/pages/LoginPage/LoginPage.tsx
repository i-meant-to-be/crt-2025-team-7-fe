import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import ClearableInput from '../../components/ClearableInput/ClearableInput';
import Checkbox from '../../components/Checkbox/Checkbox';

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [saveId, setSaveId] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-sm mx-auto mt-20 p-10 bg-white rounded shadow">
      <div className="flex justify-center mb-8">
        <img src="/logo.png" alt="로고" className="h-20" />
      </div>
      <h2 className="text-xl font-bold mb-10 text-center">서비스 이름</h2>
      <div className="flex items-center mb-6">
        <span className="w-12 text-sm text-gray-600">ID</span>
        <ClearableInput
          value={userName}
          onChange={e => setUserName(e.target.value)}
          onClear={() => setUserName('')}
          className="flex-1"
        />
      </div>
      <div className="flex items-center mb-6">
        <span className="w-12 text-sm text-gray-600">PW</span>
        <ClearableInput
          value={password}
          onChange={e => setPassword(e.target.value)}
          onClear={() => setPassword('')}
          type={showPassword ? "text" : "password"}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(prev => !prev)}
          className="flex-1"
        />
      </div>
      <div className="flex items-center mb-14">
        <Checkbox
          checked={saveId}
          onChange={setSaveId}
        />
        <span className="ml-2 text-sm text-gray-600">ID 저장</span>
      </div>
      <Button
        label="로그인"
        onClick={() => {/* 로그인 로직 */}}
        className="w-full rounded-lg bg-orange-600 text-black py-4 font-bold text-lg hover:bg-orange-700 active:bg-orange-800 transition-colors duration-150"
      />
      <button
        type="button"
        className="w-full mt-2 text-sm text-gray-400 underline hover:text-gray-700 transition-colors duration-150 cursor-pointer"
        onClick={() => navigate('/signup')}
      >
        회원가입
      </button>
    </div>
  );
}
