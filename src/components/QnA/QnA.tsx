import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import QnACard from './QnACard';
import AddQnA from './AddQnA';
import { AnimatePresence, motion } from 'framer-motion';
import useAskMe from '../../hooks/useAskMe';
import { useUserContext } from '../../context/UserContext';

export default function QnA() {
  const { user } = useUserContext() || {};
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoading, error, data: questions } = useAskMe().questionsQuery;
  const sortedQuestions =
    questions && questions.sort((a, b) => b.createAt - a.createAt);
  return (
    <>
      {isLoading && <p>로딩중입니다</p>}
      {error && <p>썸띵이즈롱</p>}
      {questions && (
        <ul className='qna_list'>
          {sortedQuestions?.map((question) => (
            <QnACard key={question.id} question={question} />
          ))}
        </ul>
      )}
      <div className='qna_list_bottom'>
        <Button filled large>
          View More
        </Button>{' '}
        <div className='btn_write'>
          {user ? (
            <Button onClick={() => navigate('write')}>질문하기</Button>
          ) : (
            <Button onClick={() => navigate('/auth/login')}>로그인</Button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {pathname === '/askme/write' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className=''
          >
            <AddQnA />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
