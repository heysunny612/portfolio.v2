import Profile from '../Profile/Profile';
import { IComment } from '../../interfaces/Comments';

interface ICommentProps {
  comment: IComment;
}

export default function Comment({ comment }: ICommentProps) {
  return (
    <li>
      <Profile />
      <p className='text'>{comment.comment}</p>
      <p className='date'>{comment.createAt}</p>
      <button>답글</button>
      <div className='buttons'>
        <button>수정</button>
        <button>삭제</button>
      </div>
      {/* <AddComment /> */}
      <ul className='reply_list'>
        <Reply comment={comment} />
        <Reply comment={comment} />
      </ul>
    </li>
  );
}

function Reply({ comment }: ICommentProps) {
  return (
    <li>
      <Profile />
      <p className='text'>{comment.reply}</p>
      <p className='date'>{comment.createAt}</p>
      <button>답글</button>
      <div className='buttons'>
        <button>수정</button>
        <button>삭제</button>
      </div>
    </li>
  );
}
