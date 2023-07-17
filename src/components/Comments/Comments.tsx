import { useParams } from 'react-router-dom';
import useComment from '../../hooks/useComment';
import AddComment from './AddComment';
import Comment from './Comment';
interface ICommentsProps {
  pageId: string;
}

export default function Comments({ pageId }: ICommentsProps) {
  const { id } = useParams();
  const {
    commentsQuery: { isLoading, error, data },
  } = useComment();
  const comments = data && data.filter((data) => data.pageId === id);

  return (
    <section className='comments_container'>
      <AddComment pageId={pageId} />
      {isLoading && <p>로딩중입니다</p>}
      {error ? <p>썸띵이즈롱</p> : null}
      {comments && (
        <ul className='commnets_list'>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      )}
    </section>
  );
}
