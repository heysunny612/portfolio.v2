import { useState } from 'react';
import { IComment } from '../../interfaces/Comments';
import { formatDate } from '../../utils/formatDate';
import { useUserContext } from '../../context/UserContext';
import Button from '../Button/Button';
import useComment from '../../hooks/useComment';
import Profile from '../Profile/Profile';
import AddComment from './AddComment';

import Reply from '../Reply/Reply';
interface ICommentProps {
  comment: IComment;
}

export default function Comment({
  comment: { id, comment: initialComment, createdAt, writer },
}: ICommentProps) {
  const { user } = useUserContext() || {};
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(initialComment);
  const [replyMode, setReplyMode] = useState(false);
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

  const handleReply = () => {
    setReplyMode(!replyMode);
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
      <button className='comment_btn' onClick={handleReply}>
        답글
      </button>
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
      {replyMode && (
        <div className='reply_comment'>
          <AddComment commentId={id} onReplyMode={handleReply} />
        </div>
      )}
      {id && <Reply commentId={id} />}
    </li>
  );
}
