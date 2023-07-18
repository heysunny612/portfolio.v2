import Comments from './Comments';
import { Link } from 'react-router-dom';
import { IMyComment } from '../../interfaces/Comments';

interface IMyCommentProps {
  myComment: IMyComment;
}

export default function MyComment({ myComment }: IMyCommentProps) {
  return (
    <div className='myComment_container'>
      <h4>
        <Link to={`/portfolio/${myComment.id}`}>[{myComment.title}]</Link>{' '}
        프로젝트에 남긴 댓글
      </h4>
      {myComment.comment && <Comments comments={myComment.comment} />}
    </div>
  );
}
