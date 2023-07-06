import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import InputLayout from '../../components/UI/InputLayout';

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
          <InputLayout title='이메일' required>
            <input type='email' />
          </InputLayout>
          <InputLayout title='회사명'>
            <input type='text' />
          </InputLayout>
          <p className='join_info'>
            채용담당자님이라면 회사명을 입력해주세요. RESUME를 다운로드 받을 수
            있습니다!
          </p>
          <InputLayout title='패스워드' required>
            <input type='password' />
          </InputLayout>
          {!login && (
            <InputLayout title='패스워드 확인' required>
              <input type='password' />
            </InputLayout>
          )}
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
