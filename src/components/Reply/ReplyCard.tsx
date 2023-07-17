import { useState } from 'react';
import useReply from '../../hooks/useReply';
import { IReply } from '../../interfaces/Reply';
import { formatDate } from '../../utils/formatDate';
import Profile from '../Profile/Profile';
import Button from '../Button/Button';
import AddComment from '../Comments/AddComment';
import { useUserContext } from '../../context/UserContext';

interface IReplyCardProps {
  reply: IReply;
  commentId: string;
}

export default function ReplyCard({
  reply: { id, reply: initialReply, createdAt, writer },
  commentId,
}: IReplyCardProps) {
  const { user } = useUserContext() || {};
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(initialReply);
  const [replyMode, setReplyMode] = useState(false);
  const { deleteReplyMutation, updateReplyMutation } = useReply();

  //대댓글 삭제
  const handleDelete = () => {
    const isDelete = window.confirm('댓글을 삭제하시겠습니까?');
    if (id && isDelete) {
      deleteReplyMutation.mutate(id);
    }
  };

  //코멘트수정
  const handleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      setEditText(initialReply);
    }
  };
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      updateReplyMutation.mutate(
        { id, reply: editText },
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
        email={writer.email}
        photoURL={writer.photoURL}
      />
      <div className='text'>
        {!editMode ? (
          <p>{initialReply}</p>
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
          <AddComment commentId={commentId} onReplyMode={handleReply} />
        </div>
      )}
    </li>
  );
}
