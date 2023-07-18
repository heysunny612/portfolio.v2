import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import EmptyState from '../../components/UI/EmptyState';
import { useUserContext } from '../../context/UserContext';
import useAskMe from '../../hooks/useAskMe';
import Questions from '../../components/Question/Questions';

export default function MyQnA() {
  const { user } = useUserContext() || {};
  const uid = user && user.uid;
  const navigate = useNavigate();
  const { questionsQuery } = useAskMe();
  const { data: questionList } = questionsQuery;
  const myQnaList = questionList?.filter(
    (question) => question.writer.uid === uid
  );
  const hasMyQnaList = myQnaList && myQnaList?.length > 0;

  return (
    <>
      <h3 className='common_h3'>
        나의 질문
        <span>내가 등록한 질문을 한눈에 볼 수 있어요!</span>
      </h3>
      <div className='myQna_container'>
        {myQnaList && (
          <Questions questions={myQnaList} animation={false} loadCount={20} />
        )}
        {!hasMyQnaList && (
          <EmptyState text='남긴 질문이 없습니다. 무엇이든 편하게 질문해주세요😆'>
            <Button filled large onClick={() => navigate('/portfolio')}>
              좋아요 누르러가기
            </Button>
          </EmptyState>
        )}
      </div>
    </>
  );
}
