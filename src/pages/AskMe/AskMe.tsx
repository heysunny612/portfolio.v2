import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useUserContext } from '../../context/UserContext';
import { useEffect, useState } from 'react';
import AddAsk from './AddAsk';
import SubLayout from '../../components/UI/SubLayout';
import SearchAsk from './SearchAsk';
import Button from '../../components/Button/Button';
import useAskMe from '../../hooks/useAskMe';
import Questions from '../../components/Question/Questions';
import AskMeSkeleton from '../../components/Skeleton/AskMeSkeleton';

const LOAD_COUNT = 5;

export default function AskMe() {
  const { user } = useUserContext() || {};
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoading, error, data: questions } = useAskMe().questionsQuery;

  const [loadCount, setLoadCount] = useState(0);
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
  const initialCount =
    questions && questions?.length <= 5 ? questions?.length : LOAD_COUNT;
  useEffect(() => {
    setLoadCount(initialCount);
  }, [initialCount]);

  return (
    <>
      <SubLayout className='qna_container' subTitle='ask me'>
        <>
          <h3 className='common_h3'>
            Ask me <span>무엇이든 편하게 질문주세요 ☺️</span>
          </h3>
          <>
            {isLoading && <AskMeSkeleton />}
            {error ? <p>ERROR! 잠시 후 재시도 부탁드립니다.</p> : null}
            {questions && (
              <div className='qna_wrap'>
                <SearchAsk />
                {hasFiltered && keyword && (
                  <div className='qna_no_result'>
                    {keyword} 검색결과가 없습니다
                  </div>
                )}
                <Questions
                  keyword={keyword}
                  questions={questions}
                  filtered={filtered}
                  loadCount={loadCount}
                />
                <div className='qna_list_bottom'>
                  {!keyword ? (
                    <Button
                      filled
                      large
                      onClick={handleMore}
                      disabled={loadCount === questionsCount}
                    >
                      Show More <span>{initialCount}</span> / {questionsCount}
                    </Button>
                  ) : (
                    <Button filled large onClick={() => navigate('/askme')}>
                      리스트보기
                    </Button>
                  )}

                  <div className='btn_write'>
                    {user ? (
                      <Button onClick={() => navigate('write')}>
                        질문하기
                      </Button>
                    ) : (
                      <Button onClick={() => navigate('/auth/login')}>
                        로그인
                      </Button>
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
                  <AddAsk />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        </>
      </SubLayout>
    </>
  );
}
