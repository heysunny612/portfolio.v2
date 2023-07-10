import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import QnACard from './QnACard';
import AddQnA from './AddQnA';
import { AnimatePresence, motion } from 'framer-motion';
import useAskMe from '../../hooks/useAskMe';
import { useUserContext } from '../../context/UserContext';
import { useRef, useState } from 'react';

const LOAD_COUNT = 5;

export default function QnA() {
  const listRef = useRef(null);
  const { user } = useUserContext() || {};
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoading, error, data: questions } = useAskMe().questionsQuery;
  const [loadCount, setLoadCount] = useState(LOAD_COUNT);
  const questionsCount = questions?.length || 0;
  const handleMore = () => {
    if (questions && loadCount + LOAD_COUNT >= questionsCount) {
      setLoadCount(questionsCount);
      return;
    }
    setLoadCount((prevCount) => prevCount + LOAD_COUNT);
  };

  return (
    <>
      {isLoading && <p>로딩중입니다</p>}
      {error && <p>썸띵이즈롱</p>}
      {questions && (
        <>
          <ul className='qna_list' ref={listRef}>
            {questions.slice(0, loadCount).map((question) => (
              <QnACard key={question.id} question={question} />
            ))}
          </ul>
          <div className='qna_list_bottom'>
            <Button
              filled
              large
              onClick={handleMore}
              disabled={loadCount === questionsCount}
            >
              Show More <span>{loadCount}</span> / {questionsCount}
            </Button>

            <div className='btn_write'>
              {user ? (
                <Button onClick={() => navigate('write')}>질문하기</Button>
              ) : (
                <Button onClick={() => navigate('/auth/login')}>로그인</Button>
              )}
            </div>
          </div>
        </>
      )}

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
