import Profile from '../Profile/Profile';
import AddComment from './AddComment';

export default function Comment({ comment }) {
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
        <li>
          <Profile />
          <p className='text'>감사합니다!ㅎ</p>
          <p className='date'>{comment.createAt}</p>
          <button>답글</button>
          <div className='buttons'>
            <button>수정</button>
            <button>삭제</button>
          </div>
          {/* <AddComment /> */}
        </li>
        <li>
          <Profile />
          <p className='text'>감사합니다!ㅎ</p>
          <p className='date'>{comment.createAt}</p>
          <button>답글</button>
          <div className='buttons'>
            <button>수정</button>
            <button>삭제</button>
          </div>
        </li>
      </ul>
    </li>
  );
}
