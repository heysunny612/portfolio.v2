import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import MyComment from '../../components/Comments/MyComment';
import EmptyState from '../../components/UI/EmptyState';
import { useUserContext } from '../../context/UserContext';
import useComment from '../../hooks/useComment';
import usePortfolio from '../../hooks/usePortfolio';

export default function MyComments() {
  const navigate = useNavigate();
  const { user } = useUserContext() || {};
  const uid = user && user.uid;
  const { commentsQuery } = useComment();
  const { data: commentList } = commentsQuery;
  const { portfolioQuery } = usePortfolio();
  const { data: portfolioList } = portfolioQuery;

  const portfolioWithComments = portfolioList?.map((portfolio) => {
    const comments = commentList?.filter(
      (comment) => comment.pageId === portfolio.id && comment.writer.uid === uid
    );
    return {
      ...portfolio,
      comment: comments,
    };
  });
  const myCommentList = portfolioWithComments?.filter(
    (portfolio) => portfolio.comment?.length !== 0
  );
  const hasMyCommentList = myCommentList && myCommentList?.length > 0;

  return (
    <>
      <h3 className='common_h3'>
        내 댓글
        <span>내가 남긴 댓글을 한눈에 확인할 수 있어요!</span>
      </h3>
      {myCommentList &&
        myCommentList.map((myComment) => <MyComment myComment={myComment} />)}
      {!hasMyCommentList && (
        <EmptyState text='소중한 첫 댓글을 달아보세요 ❤️'>
          <Button filled large onClick={() => navigate('/portfolio')}>
            댓글 등록하러가기
          </Button>
        </EmptyState>
      )}
    </>
  );
}
