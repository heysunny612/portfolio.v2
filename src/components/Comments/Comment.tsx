import { useState } from 'react';
import Profile from '../Profile/Profile';
import { IComment } from '../../interfaces/Comments';
import { formatDate } from '../../utils/formatDate';
import useComment from '../../hooks/useComment';
import { useUserContext } from '../../context/UserContext';
import Button from '../Button/Button';

interface ICommentProps {
  comment: IComment;
}

export default function Comment({
  comment: { id, comment: initialComment, createdAt, writer },
}: ICommentProps) {
  const { user } = useUserContext() || {};
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(initialComment);
  const { deleteCommentMutation, updateCommentMutation } = useComment();

  //코멘트삭제
  const handleDelete = () => {
    const isDelete = window.confirm('댓글을 삭제하시겠습니까?');
    if (id && isDelete) {
      deleteCommentMutation.mutate(id);
    }
  };
  //코멘트수정
  const handleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      setEditText(initialComment);
    }
  };
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      updateCommentMutation.mutate(
        { id, comment: editText },
        { onSuccess: () => setEditMode(!editMode) }
      );
    }
  };
  return (
    <li>
      <Profile
        displayName={writer.displayName}
        photoURL={writer.photoURL}
        email={writer.email}
      />
      <div className='text'>
        {!editMode ? (
          <p>{initialComment}</p>
        ) : (
          <form onSubmit={handleEditSubmit} className='comment_edit_form'>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <Button filled type='submit'>
              수정
            </Button>
          </form>
        )}
      </div>
      <p className='date'>{formatDate(createdAt)}</p>
      <button className='comment_btn'>답글</button>
      {user && (user.uid === writer.uid || user.isAdmin) && (
        <div className='buttons'>
          <button className='comment_btn' onClick={handleEditMode}>
            {editMode ? '취소' : '수정'}
          </button>
          <button className='comment_btn' onClick={handleDelete}>
            삭제
          </button>
        </div>
      )}
      {/* <AddComment /> */}
      <ul className='reply_list'>
        {/* <Reply comment={comment} />
        <Reply comment={comment} /> */}
      </ul>
    </li>
  );
}

// function Reply({ comment }: ICommentProps) {
//   return (
//     <li>
//       <Profile />
//       <p className='text'>{comment.reply}</p>
//       <p className='date'>{comment.createAt}</p>
//       <button>답글</button>
//       <div className='buttons'>
//         <button>수정</button>
//         <button>삭제</button>
//       </div>
//     </li>
//   );
// }
