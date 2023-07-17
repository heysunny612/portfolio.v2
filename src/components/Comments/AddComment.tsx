import { useForm } from 'react-hook-form';
import { useUserContext } from '../../context/UserContext';
import Button from '../Button/Button';
import Profile from '../Profile/Profile';
import useComment from '../../hooks/useComment';
interface IFormData {
  comment: string;
}
interface IAddCommentPros {
  pageId: string;
}
export default function AddComment({ pageId }: IAddCommentPros) {
  const { user } = useUserContext() || {};
  const { uid, displayName, photoURL, email } = user ?? {};
  const { addCommentMutation } = useComment();
  const { register, handleSubmit, reset } = useForm<IFormData>();
  const onAddComment = async ({ comment }: IFormData) => {
    const commentData = {
      pageId,
      comment,
      createdAt: Date.now(),
      writer: {
        uid: uid ?? '',
        displayName: displayName ?? '',
        photoURL: photoURL ?? '',
        email: email ?? '',
      },
    };
    addCommentMutation.mutate(commentData, {
      onSuccess: () => reset({ comment: '' }),
    });
  };

  return (
    <form className='comments_form' onSubmit={handleSubmit(onAddComment)}>
      {user && (
        <Profile
          displayName={displayName || ''}
          photoURL={photoURL || ''}
          email={email || ''}
        />
      )}
      <div className='write'>
        <input
          type='text'
          placeholder='발견하신 버그 또는 서로 훈훈해지는 댓글 달아주세요☺️'
          {...register('comment', { required: true })}
        />
        <Button filled type='submit'>
          등록
        </Button>
      </div>
    </form>
  );
}
