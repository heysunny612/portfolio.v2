import { FaUserCircle } from 'react-icons/fa';
import { useUserContext } from '../../context/UserContext';
import InputLayout from '../../components/UI/InputLayout';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import { authState, editCompany, editProfile } from '../../api/firebase/auth';
import { FirebaseError } from 'firebase/app';

interface IUpdateData {
  nickname: string;
  company: string;
}

export default function Mypage() {
  const { user, setUser } = useUserContext() ?? {};
  const { register, handleSubmit, setValue } = useForm<IUpdateData>();
  const [isNotEdit, setIsNotEdit] = useState('');
  const [isEditName, setIsEditName] = useState('');
  const [isEditCompany, setIsEditCompany] = useState('');
  const onValid = async (data: IUpdateData) => {
    const isNicknameUnchanged =
      user?.displayName === data.nickname ||
      user?.displayName?.trim() === data.nickname.trim();
    const isCompanyUnchanged =
      user?.company?.companyName === data.company ||
      user?.company?.companyName?.trim() === data.company.trim();

    if (
      (!user?.company && isNicknameUnchanged) ||
      (user?.company && isNicknameUnchanged && isCompanyUnchanged)
    ) {
      setIsEditName('수정된 내용이 없습니다.');
      setTimeout(() => setIsEditName(''), 3000);
      return;
    }

    try {
      if (!isNicknameUnchanged) {
        await editProfile(data.nickname);
        setIsEditName(`닉네임이 ${data.nickname}로 정상적으로 변경되었습니다.`);
        // 업데이트된 유저 setUser에 할당
      }

      if (user?.company && !isCompanyUnchanged) {
        await editCompany(user?.company?.id ?? '', data.company);
        setIsEditCompany(
          `회사명이 ${data.company}로 정상적으로 변경되었습니다.`
        );
      }

      authState((updatedUser) => {
        if (setUser) {
          setUser(updatedUser);
        }
      });

      setTimeout(() => {
        setIsEditName('');
        setIsEditCompany('');
      }, 3000);
    } catch (error: any) {
      setIsEditName((error as FirebaseError).message);
    }
  };

  useEffect(() => {
    if (user) {
      setValue('nickname', user.displayName || '');
      setValue('company', user.company?.companyName || '');
    }
  }, [user, setValue]);

  return (
    <section className='mypage_container'>
      <h3 className='common_h3'>프로필 수정</h3>
      <div className='edit_profile'>
        <div className='image'>
          {user?.photoURL ? (
            <img src={user?.photoURL} alt='유저이미지' />
          ) : (
            <FaUserCircle />
          )}
        </div>
        <form className='input' onSubmit={handleSubmit(onValid)}>
          <InputLayout title='이메일'>
            <input type='email' value={user?.email ?? ''} readOnly />
          </InputLayout>
          <div className='nickname_area'>
            <InputLayout title='닉네임'>
              <input type='text' {...register('nickname')} />
            </InputLayout>
            {user?.company && (
              <InputLayout title='회사명'>
                <input type='text' {...register('company')} />
              </InputLayout>
            )}
          </div>
          <div className='btn_save'>
            <Button type='submit'>변경사항 저장</Button>
          </div>
        </form>
      </div>
      {isEditName && <p>{isEditName}</p>}
      {isEditCompany && <p>{isEditCompany}</p>}
    </section>
  );
}
