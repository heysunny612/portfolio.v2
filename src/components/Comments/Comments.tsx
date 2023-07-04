import AddComment from './AddComment';
import Comment from './Comment';

const comments = [
  {
    id: 1,
    user: 'heysunny',
    comment: '우왕 굿이네요!!',
    createAt: '2023.7.4 20:15',
  },
  {
    id: 2,
    user: '황수연',
    comment: '너무 잘만들었네요!',
    createAt: '2023.7.4 20:15',
  },
];

export default function Comments() {
  return (
    <section className='comments_container'>
      <AddComment />
      <ul className='commnets_list'>
        {comments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </ul>
    </section>
  );
}
