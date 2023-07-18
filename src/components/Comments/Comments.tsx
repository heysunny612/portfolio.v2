import AddComment from './AddComment';
import Comment from './Comment';
import { IComment } from '../../interfaces/Comments';
interface ICommentsProps {
  pageId?: string;
  comments: IComment[];
}

export default function Comments({ pageId, comments }: ICommentsProps) {
  return (
    <section className='comments_container'>
      {pageId && <AddComment pageId={pageId} />}
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
