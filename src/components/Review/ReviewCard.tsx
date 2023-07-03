import { IReview } from '../../interfaces/Reviews';

interface IReviewCardProps {
  review: IReview;
}

export default function ReviewCard({ review }: IReviewCardProps) {
  return (
    <a href={review?.href} target='_blank'>
      <div className='review_card'>
        <p className='review_comment'>{review.content}</p>
        <div className='card_bottom'>
          <img src={review?.avatar} />
          <p>{review.name}</p>
        </div>
      </div>
    </a>
  );
}
