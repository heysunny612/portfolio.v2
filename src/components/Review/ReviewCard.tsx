import { Link } from 'react-router-dom';
import { IComment } from '../../interfaces/Comments';
import { FaUserCircle } from 'react-icons/fa';

interface IReviewCardProps {
  review: IComment;
}

export default function ReviewCard({
  review: { comment, pageId, writer },
}: IReviewCardProps) {
  return (
    <Link to={`/portfolio/${pageId}`}>
      <div className='review_card'>
        <p className='review_comment'>{comment}</p>
        <div className='card_bottom'>
          {writer.photoURL ? (
            <img src={writer?.photoURL} />
          ) : (
            <span>
              <FaUserCircle />
            </span>
          )}

          <p>{writer.displayName}</p>
        </div>
      </div>
    </Link>
  );
}
