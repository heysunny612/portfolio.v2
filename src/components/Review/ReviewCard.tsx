import { Link } from 'react-router-dom';
import { IComment } from '../../interfaces/Comments';
import { FaUserCircle } from 'react-icons/fa';
import usePortfolio from '../../hooks/usePortfolio';

interface IReviewCardProps {
  review: IComment;
}

export default function ReviewCard({
  review: { id, comment, pageId, writer },
}: IReviewCardProps) {
  const {
    portfolioQuery: { data: projects },
  } = usePortfolio();
  const portfolioTitle =
    projects && projects.find((project) => project.id === pageId)?.title;

  return (
    <Link to={`/portfolio/${pageId}`} state={{ scollId: id }}>
      <div className='review_card'>
        <p className='review_from'>
          From. [<span>{portfolioTitle}</span>]
        </p>
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
