import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
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
            <FcGoogle />
          </button>
          <button
            onClick={() => socialLogin({ type: 'github' }, setSocialError)}
          >
            <FaGithub />
          </button>
        </div>
      </div>
    </>
  );
}
