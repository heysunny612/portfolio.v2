import { FaUserCircle } from 'react-icons/fa';
import { useUserContext } from '../../context/UserContext';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { editProfile } from '../../api/firebase/auth';
import { FirebaseError } from 'firebase/app';
import InputLayout from '../../components/UI/InputLayout';
import Button from '../../components/Button/Button';

const initialEditStatus = {
  isNotEdit: '',
  isEditName: '',
  error: '',
};
interface IUpdateData {
  displayName: string;
}

export default function Mypage() {
  const { user, refreshUser } = useUserContext() ?? {};
  const { register, handleSubmit, setValue } = useForm<IUpdateData>();
  const [editMessages, setEditMessages] = useState(initialEditStatus);

  const clearEditStatus = () => {
    setEditMessages((prevStatus) => ({
      ...prevStatus,
      isNotEdit: '',
      isEditName: '',
    }));
  };
  const showEditStatus = (key: keyof typeof editMessages, message: string) => {
    setEditMessages((prevStatus) => ({
      ...prevStatus,
      [key]: message,
    }));
    setTimeout(clearEditStatus, 3000);
  };

  const onValid = async ({ displayName }: { displayName: string }) => {
    const isNicknameUnchanged =
      user?.displayName === displayName ||
      user?.displayName?.trim() === displayName.trim();

    if (isNicknameUnchanged) {
      showEditStatus('isNotEdit', '수정된 내용이 없습니다.');
      return;
    }
    try {
      if (!isNicknameUnchanged) {
        await editProfile(displayName);
        showEditStatus(
          'isEditName',
          `${
            user?.isBusinessUser ? '회사명' : '닉네임'
          }이 ${displayName}로 정상적으로 변경되었습니다.`
        );
      }
      refreshUser?.();
    } catch (error: unknown) {
      setEditMessages((prevStatus) => ({
        ...prevStatus,
        error: (error as FirebaseError).message,
      }));
    }
  };

  useEffect(() => {
    if (user) {
      setValue('displayName', user.displayName || '');
    }
  }, [user, setValue]);

  return (
    <section className='mypage_container'>
      <h3 className='common_h3'>나의 프로필</h3>
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
            <InputLayout title={user?.isBusinessUser ? '회사명' : '닉네임'}>
              <input type='text' {...register('displayName')} />
            </InputLayout>
          </div>
          <div className='btn_save'>
            <Button type='submit'>변경사항 저장</Button>
          </div>
        </form>
      </div>
      {editMessages.isNotEdit && (
        <p className='error_message'>{editMessages.isNotEdit}</p>
      )}
      {editMessages.isEditName && (
        <p className='error_message'>{editMessages.isEditName}</p>
      )}
    </section>
  );
}
