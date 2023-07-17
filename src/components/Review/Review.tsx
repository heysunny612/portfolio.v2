import ReviewCard from './ReviewCard';
import ReviewRow from './ReviewRow';
import useComment from '../../hooks/useComment';

export default function Review() {
  const {
    commentsQuery: { isLoading, error, data: comments },
  } = useComment();

  return (
    <section className='review_container'>
      {isLoading && <p>로딩중입니다</p>}
      {error ? <p>썸띵이즈롱</p> : null}
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
