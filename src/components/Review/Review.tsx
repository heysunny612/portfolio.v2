import ReviewCard from './ReviewCard';
import ReviewRow from './ReviewRow';
import useComment from '../../hooks/useComment';
import ReviewSkeleton from '../Skeleton/ReviewSkeleton';

export default function Review() {
  const {
    commentsQuery: { isLoading, error, data: comments },
  } = useComment();

  return (
    <section className='review_container'>
      {isLoading && <ReviewSkeleton />}
      {error ? <p>ERROR! 잠시 후 재시도 부탁드립니다</p> : null}
      {comments && (
        <ReviewRow speed={50}>
          {comments.map((comment) => (
            <ReviewCard key={comment.id} review={comment} />
          ))}
        </ReviewRow>
      )}
    </section>
  );
}
