import axios from 'axios';
import { useState } from 'react';
import { useHistoryState } from '../../lib/Router/hooks';

function SignUp() {
  const [region, setRegion] = useState('');
  const user = useHistoryState();
  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInfo = { ...user, regionId: region };

    const res = await axios.post('http://localhost:4000/auth/signup', {
      user: userInfo,
    });
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="지역을 입력하세요."
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      />
      <button type="submit">회원가입</button>
    </form>
  );
}

export default SignUp;
