import { useState } from 'react';
import Button from '../../components/Button/Button';
import ClearableInput from '../../components/ClearableInput/ClearableInput';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="w-full max-w-sm mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-6">회원가입</h2>
      <ClearableInput
        value={email}
        onChange={e => setEmail(e.target.value)}
        onClear={() => setEmail('')}
        placeholder="이메일"
        className="mb-4"
      />
      <ClearableInput
        value={password}
        onChange={e => setPassword(e.target.value)}
        onClear={() => setPassword('')}
        placeholder="비밀번호"
        type="password"
        className="mb-6"
      />
      <Button label="회원가입" onClick={() => {/* 회원가입 로직 */}} />
    </div>
  );
}
