import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginWithEmail } from '../../api/firebase/auth';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import Button from '../../components/Button/Button';
import InputLayout from '../../components/UI/InputLayout';

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<ILoginForm>();
  const [error, setError] = useState('');
  const onLogin = ({ email, password }: ILoginForm) => {
    loginWithEmail(email, password, setError);
  };
  const user = useUserContext()?.user;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/auth/mypage', { replace: true });
    }
  }, [user, navigate]);

  return (
    <>
      <h3 className='common_h3'>
        로그인
        <span>가입한 이메일로 로그인하세요!</span>
      </h3>
      <div className='login_form'>
        <form onSubmit={handleSubmit(onLogin)}>
          {error && <p className='error_message'>{error}</p>}
          <InputLayout title='이메일' required>
            <input type='email' {...register('email', { required: true })} />
          </InputLayout>
          <InputLayout title='패스워드' required>
            <input
              type='password'
              {...register('password', { required: true })}
            />
          </InputLayout>
          <div className='btn_login'>
            <Button filled large type='submit'>
              로그인
            </Button>
          </div>
        </form>
      </div>
      <SocialLogin />
    </>
  );
}
