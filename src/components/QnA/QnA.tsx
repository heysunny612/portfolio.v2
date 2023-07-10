import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../Button/Button';
import QnACard from './QnACard';
import AddQnA from './AddQnA';
import { AnimatePresence, motion } from 'framer-motion';
import useAskMe from '../../hooks/useAskMe';
import { useUserContext } from '../../context/UserContext';
import { useState } from 'react';
import SearchQnA from './SearchQna';
import { IAskMe } from '../../interfaces/AskMe';

const LOAD_COUNT = 5;

export default function QnA() {
  const { user } = useUserContext() || {};
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoading, error, data: questions } = useAskMe().questionsQuery;
  const [loadCount, setLoadCount] = useState(LOAD_COUNT);
  const questionsCount = questions?.length || 0;
  const { keyword } = useParams<{ keyword: string }>();
  const handleMore = () => {
    if (questions && loadCount + LOAD_COUNT >= questionsCount) {
      setLoadCount(questionsCount);
      return;
    }
    setLoadCount((prevCount) => prevCount + LOAD_COUNT);
  };
  const filtered = questions?.filter((question) =>
    question.question.includes(keyword!)
  );
  const hasFiltered = filtered?.length! <= 0;
  return (
    <>
      {isLoading && <p>로딩중입니다</p>}
      {error && <p>썸띵이즈롱</p>}
      {questions && (
        <div className='qna_wrap'>
          <SearchQnA />
          {hasFiltered && keyword && (
            <div className='qna_no_result'>{keyword} 검색결과가 없습니다</div>
          )}
          <ul className='qna_list'>
            {!keyword
              ? questions
                  .slice(0, loadCount)
                  .map((question) => (
                    <QnACard key={question.id} question={question} />
                  ))
              : filtered!.map((question) => (
                  <QnACard key={question.id} question={question} />
                ))}
          </ul>
          <div className='qna_list_bottom'>
            {!keyword ? (
              <Button
                filled
                large
                onClick={handleMore}
                disabled={loadCount === questionsCount}
              >
                Show More <span>{loadCount}</span> / {questionsCount}
              </Button>
            ) : (
              <Button filled large onClick={() => navigate('/askme')}>
                리스트보기
              </Button>
            )}

            <div className='btn_write'>
              {user ? (
                <Button onClick={() => navigate('write')}>질문하기</Button>
              ) : (
                <Button onClick={() => navigate('/auth/login')}>로그인</Button>
              )}
            </div>
          </div>
        </div>
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
