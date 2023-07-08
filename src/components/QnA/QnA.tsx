import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import QnACard from './QnACard';
import AddQnA from './AddQnA';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { getQuestion } from '../../api/firebase/askMe';

export default function QnA() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    isLoading,
    error,
    data: questions,
  } = useQuery(['question'], getQuestion);

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
        </Button>
        <div className='btn_write'>
          <Button onClick={() => navigate('write')}>질문하기</Button>
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
