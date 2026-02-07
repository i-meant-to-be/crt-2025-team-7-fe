import { useState } from 'react';
import Button from '../../components/Button/Button';
import ClearableInput from '../../components/ClearableInput/ClearableInput';

export default function SignupPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto mt-20 p-10 bg-white rounded shadow">
      <div className="flex justify-center mb-8">
        <img src="/logo.png" alt="로고" className="h-20" />
      </div>
      <h2 className="text-xl font-bold mb-10 text-center">서비스 이름</h2>
      <div className="mb-6 text-center text-sm text-gray-500">아직 계정이 없으신가요? 지금 회원가입하세요!</div>
      <div className="flex items-center mb-6">
        <span className="w-12 text-sm text-gray-600 flex items-center  h-[36px]">ID</span>
        <ClearableInput
          value={userName}
          onChange={e => setUserName(e.target.value)}
          onClear={() => setUserName('')}
          className="flex-1"
        />
      </div>
      <div className="flex items-center mb-6">
        <span className="w-12 text-sm text-gray-600 flex items-center h-[36px]">PW</span>
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
      <div className="flex items-center mb-2">
        <span className="w-12 text-sm text-gray-600 flex items-center h-[36px]">확인</span>
        <ClearableInput
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
          onClear={() => setPasswordConfirm('')}
          type={showPasswordConfirm ? "text" : "password"}
          showPassword={showPasswordConfirm}
          onTogglePassword={() => setShowPasswordConfirm(prev => !prev)}
          className="flex-1"
        />
      </div>
      <div className="w-full mb-4 h-5 text-xs text-center flex items-center justify-center">
        {passwordConfirm && password !== passwordConfirm && (
          <span className="text-red-500">비밀번호가 일치하지 않습니다.</span>
        )}
        {passwordConfirm && password === passwordConfirm && (
          <span className="text-green-500">비밀번호가 일치합니다.</span>
        )}
      </div>

      <Button
        label="회원가입"
        onClick={() => {/* 회원가입 로직 */}}
        className="w-full rounded-lg bg-orange-600 text-black py-4 font-bold text-lg hover:bg-orange-700 active:bg-orange-800 transition-colors duration-150 mt-6 mb-8"
      />
    </div>
  );
}
