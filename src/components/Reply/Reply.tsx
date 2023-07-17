import useReply from '../../hooks/useReply';
import ReplyCard from './ReplyCard';

interface IReplyProps {
  commentId: string;
}

export default function Reply({ commentId }: IReplyProps) {
  const {
    replyQuery: { isLoading, error, data },
  } = useReply();
  const replyList =
    data && data.filter((value) => value.commentId === commentId);

  return (
    <>
      {isLoading && <p>로딩중입니다</p>}
      {error && <p>썸딩이즈롱</p>}
      <ul className='reply_list'>
        {data &&
          replyList &&
          replyList.map((reply) => (
            <ReplyCard reply={reply} commentId={commentId} />
          ))}
      </ul>
    </>
  );
}
