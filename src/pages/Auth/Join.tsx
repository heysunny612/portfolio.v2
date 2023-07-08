import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import InputLayout from '../../components/UI/InputLayout';
import { useForm } from 'react-hook-form';
import { authState, joinWithEmail } from '../../api/firebase/auth';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { GoCodeReview } from 'react-icons/go';
import { MdBusiness } from 'react-icons/md';

interface IJoinForm {
  email: string;
  password: string;
  passwordCheck: string;
  displayName?: string;
  userType: 'Business' | 'Individual';
}

export default function Join() {
  const { register, handleSubmit, setFocus, watch } = useForm<IJoinForm>({
    defaultValues: {
      userType: 'Individual',
    },
  });
  const [error, setError] = useState('');
  const userType = watch('userType');
  const { user, setUser } = useUserContext() ?? {};
  const navigate = useNavigate();

  const onVaild = async ({
    email,
    password,
    passwordCheck,
    displayName,
    userType,
  }: IJoinForm) => {
    if (password !== passwordCheck) {
      setError('입력하신 두 개의 비밀번호가 일치하지 않습니다.');
      setFocus('password');
      return;
    }
    const isBusinessUser = userType === 'Business';
    await joinWithEmail(
      email,
      password,
      displayName,
      isBusinessUser,
      setError
    ).then(() => {
      authState((updatedUser) => {
        if (setUser) {
          setUser(updatedUser);
        }
      });
    });
  };

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
          <div className='login_radio'>
            <label>
              <input
                type='radio'
                {...register('userType')}
                value='Individual'
              />
              동료 회원 <GoCodeReview />
            </label>
            <label>
              <input type='radio' {...register('userType')} value='Business' />
              기업 회원 <MdBusiness />
            </label>
          </div>
          <InputLayout title='이메일' required>
            <input type='email' {...register('email', { required: true })} />
          </InputLayout>
          <InputLayout title={userType === 'Individual' ? '닉네임' : '회사명'}>
            <input type='text' {...register('displayName')} />
          </InputLayout>
          <p className='join_info'>
            {userType === 'Individual'
              ? '닉네임을 입력하지 않으시면, 이메일로 설정됩니다.'
              : '채용담당자님이라면 회사명을 입력해주세요. RESUME를 다운로드 받을 수 있습니다!'}
          </p>
          <p className='join_info'></p>
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
