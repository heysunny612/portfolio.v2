import { AiOutlineGoogle, AiOutlineGithub } from 'react-icons/ai';
import { socialLogin } from '../../api/firebase/auth';
import { useState } from 'react';

export default function SocialLogin() {
  const [socialError, setSocialError] = useState('');
  return (
    <>
      <h3 className='common_h3'>
        OR <span>간편하게 구글&깃허브로 로그인하세요!</span>
      </h3>
      <div className='login_social'>
        {socialError && <p className='error_message'>{socialError}</p>}
        <div>
          <button
            onClick={() => socialLogin({ type: 'google' }, setSocialError)}
          >
            <AiOutlineGoogle />
          </button>
          <button
            onClick={() => socialLogin({ type: 'github' }, setSocialError)}
          >
            <AiOutlineGithub />
          </button>
        </div>
      </div>
    </>
  );
}
