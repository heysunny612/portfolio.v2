import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import InputLayout from '../../components/UI/InputLayout';
import { set, useForm } from 'react-hook-form';
import { joinWithEmail } from '../../api/firebase';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

interface IUserData {
  email: string;
  password: string;
  passwordCheck: string;
  company?: string;
}

export default function Join() {
  const { register, handleSubmit, setFocus } = useForm<IUserData>();
  const [error, setError] = useState('');

  const onVaild = ({ email, password, passwordCheck, company }: IUserData) => {
    if (password === passwordCheck) {
      joinWithEmail({ email, password, company, setError });
    } else {
      setError('입력하신 두개의 비밀번호가 일치하지 않습니다.');
      setFocus('password');
    }
  };
  const user = useUserContext()?.user;
  const navigate = useNavigate();

  //로그인시 페이지 전환
  useEffect(() => {
    if (user) {
      navigate('/auth/mypage', { replace: true });
    }
  }, [user, history]);
  return (
    <>
      <h3 className='common_h3'>
        계정만들기
        <span>간편하게 이메일로 계정을 만들어보세요</span>
      </h3>
      <div className='login_form'>
        <form onSubmit={handleSubmit(onVaild)}>
          {error && <p className='error_message'>{error}</p>}
          <InputLayout title='이메일' required>
            <input type='email' {...register('email', { required: true })} />
          </InputLayout>
          <InputLayout title='회사명'>
            <input type='text' {...register('company')} />
          </InputLayout>
          <p className='join_info'>
            채용담당자님이라면 회사명을 입력해주세요. RESUME를 다운로드 받을 수
            있습니다!
          </p>
          <InputLayout title='패스워드' required>
            <input
              type='password'
              {...register('password', { required: true })}
            />
          </InputLayout>
          <InputLayout title='패스워드 확인' required>
            <input
              type='password'
              {...register('passwordCheck', { required: true })}
            />
          </InputLayout>
          <div className='btn_login'>
            <Button filled large type='submit'>
              계정만들기
            </Button>
          </div>
        </form>
      </div>
      <SocialLogin />
    </>
  );
}
