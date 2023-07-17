import { useForm } from 'react-hook-form';
import { useUserContext } from '../../context/UserContext';
import Button from '../Button/Button';
import Profile from '../Profile/Profile';
import useComment from '../../hooks/useComment';
import useReply from '../../hooks/useReply';
import { useNavigate } from 'react-router-dom';

interface IFormData {
  comment: string;
}
interface IAddCommentProps {
  pageId?: string;
  commentId?: string;
  onReplyMode?: () => void;
}
export default function AddComment({
  pageId,
  commentId,
  onReplyMode,
}: IAddCommentProps) {
  const { user } = useUserContext() || {};
  const { uid, displayName, photoURL, email } = user || {};
  const { addCommentMutation } = useComment();
  const { addReplyMutation } = useReply();
  const { register, handleSubmit, reset } = useForm<IFormData>();
  const navigate = useNavigate();

  const onAddComment = ({ comment }: IFormData) => {
    //댓글
    if (pageId) {
      const commentData = {
        pageId,
        comment,
        createdAt: Date.now(),
        writer: {
          uid: uid || '',
          displayName: displayName || '',
          photoURL: photoURL || '',
          email: email || '',
        },
      };
      addCommentMutation.mutate(commentData, {
        onSuccess: () => reset({ comment: '' }),
      });
    }

    //대댓글
    if (commentId) {
      const replyData = {
        commentId,
        reply: comment,
        createdAt: Date.now(),
        writer: {
          uid: uid ?? '',
          displayName: displayName ?? '',
          photoURL: photoURL ?? '',
          email: email ?? '',
        },
      };
      addReplyMutation.mutate(replyData, { onSuccess: onReplyMode });
    }
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
        {user ? (
          <>
            <input
              type='text'
              placeholder={
                commentId
                  ? '댓글을 달아주세요☺️'
                  : '발견하신 버그 또는 서로 훈훈해지는 댓글 달아주세요☺️'
              }
              {...register('comment', { required: true })}
            />
            <Button filled type='submit'>
              등록
            </Button>
          </>
        ) : (
          <>
            <input
              type='text'
              placeholder='댓글을 작성하려면 로그인 해주세요'
              readOnly
            />
            <Button
              filled
              type='button'
              onClick={() => navigate('/auth/login')}
            >
              로그인
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
