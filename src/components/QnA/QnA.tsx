import { useLocation, useNavigate } from 'react-router-dom';
import { IQnA } from '../../interfaces/QnA';
import Button from '../Button/Button';
import QnACard from './QnACard';
import AddQnA from './AddQnA';
import { AnimatePresence, motion } from 'framer-motion';

const qna: IQnA[] = [
  {
    id: 1,
    createAt: 20231101,
    title: '포트폴리오 만드는데 얼마나 걸렸나요?',
    reply: false,
  },
  {
    id: 2,
    createAt: 20231101,
    title: '제로베이스는 어땠나요?',
    reply: true,
    answer: '어떤 부분이 구체적으로 말씀하시는건지 모르겠지만 어쩌고저쩌고~',
  },
  {
    id: 3,
    createAt: 20231101,
    title: '뷰가 아닌 리액트를 선택한 이유가있나요?',
    reply: false,
  },
  {
    id: 4,
    createAt: 20231101,
    title: '구직 중이 신가요?',
    reply: true,
    answer: '넵 맞습니다 ! 언제든지 연락주세요!',
  },
];

export default function QnA() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <ul className='qna_list'>
        {qna.map((q) => (
          <QnACard key={q.id} qna={q} />
        ))}
      </ul>
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
