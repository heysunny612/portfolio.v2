import Profile from '../Profile/Profile';
import { IComment } from '../../interfaces/Comments';
import { formatDate } from '../../utils/formatDate';
import useComment from '../../hooks/useComment';
import { useUserContext } from '../../context/UserContext';

interface ICommentProps {
  comment: IComment;
}

export default function Comment({
  comment: { id, comment, createdAt, writer },
}: ICommentProps) {
  const { user } = useUserContext() || {};
  const { deleteCommentMutation } = useComment();
  const handleDelete = () => {
    const isDelete = confirm('댓글을 삭제하시겠습니까?');
    if (id && isDelete) {
      deleteCommentMutation.mutate(id);
    }
  };
  return (
    <li>
      <Profile
        displayName={writer.displayName}
        photoURL={writer.photoURL}
        email={writer.email}
      />
      <p className='text'>{comment}</p>
      <p className='date'>{formatDate(createdAt)}</p>
      <button>답글</button>
      {user && (user.uid === writer.uid || user.isAdmin) && (
        <div className='buttons'>
          <button>수정</button>
          <button onClick={handleDelete}>삭제</button>
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
