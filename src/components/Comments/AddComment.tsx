import Button from '../Button/Button';
import Profile from '../Profile/Profile';

export default function AddComment() {
  return (
    <form className='comments_form'>
      <Profile />
      <div className='write'>
        <input
          type='text'
          placeholder='발견하신 버그 또는 서로 훈훈해지는 댓글 달아주세요☺️'
        />
        <Button filled>등록</Button>
      </div>
    </form>
  );
}
