import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export default function Login() {
  const { action } = useParams();
  const login = action === 'login';

  return (
    <>
      <h3 className='common_h3'>
        {login ? '로그인' : '계정만들기'}
        <span>
          {login
            ? '가입한 이메일로 로그인하세요!'
            : '간편하게 이메일로 계정을 만들어보세요!'}
        </span>
      </h3>
      <div className='login_form'>
        <form>
          <label className='common_label'>
            <span className='label_text'>
              이메일주소 <b>*</b>
            </span>
            <div className='input'>
              <input type='text' />
              <span className='line1'></span>
              <span className='line2'></span>
              <span className='line3'></span>
              <span className='line4'></span>
            </div>
          </label>
          <label className='common_label'>
            <span className='label_text'>
              패스워드 <b>*</b>
            </span>
            <div className='input'>
              <input type='password' />
              <span className='line1'></span>
              <span className='line2'></span>
              <span className='line3'></span>
              <span className='line4'></span>
            </div>
          </label>
          <div className='btn_login'>
            <Button filled large type='submit'>
              {login ? '로그인' : '계정만들기'}
            </Button>
          </div>
        </form>
      </div>
      <h3 className='common_h3'>
        OR <span>간편하게 구글&깃허브로 로그인하세요!</span>
      </h3>
      <div className='login_social'>
        <button>
          <FcGoogle />
        </button>
        <button>
          <FaGithub />
        </button>
      </div>
    </>
  );
}
