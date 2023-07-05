import { useState } from 'react';
import { IQnA } from '../../interfaces/QnA';
import Profile from '../Profile/Profile';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { AnimatePresence, Variants, motion } from 'framer-motion';
interface IQnACardProps {
  qna: IQnA;
}

const answerVars: Variants = {
  initial: { opacity: 0, transform: 'scaleY(0)' },
  visible: {
    opacity: 1,
    transform: 'scaleY(1)',
    transition: { type: 'tween', duration: 0.3 },
  },
  leaving: {
    opacity: 0,
    transform: 'scaleY(0)',
    transition: { type: 'tween', duration: 0.3 },
  },
};

export default function QnACard({ qna }: IQnACardProps) {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle((toggle) => !toggle);
  return (
    <li className='qna_card'>
      <div className='qan_info' role='button' onClick={handleToggle}>
        <span className={`badge ${qna.reply ? 'completed' : ''}`}>
          {qna.reply ? '답변완료' : '답변대기중'}
        </span>
        <h4 className='title' role='button'>
          {qna.title}
        </h4>
        {qna.reply && (
          <div className='toggle'>
            {toggle ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        )}
      </div>
      <div className='qna_writer'>
        <Profile inline /> <span className='date'>작성일 : {qna.createAt}</span>
        <div className='qna_buttons'>
          <button>수정</button>
          <button>삭제</button>
          <button>답변</button>
        </div>
      </div>
      {qna.reply && (
        <AnimatePresence>
          {toggle ? (
            <motion.div
              className='qna_answer'
              variants={answerVars}
              initial='initial'
              animate='visible'
              exit='leaving'
            >
              {qna.answer}
            </motion.div>
          ) : null}
        </AnimatePresence>
      )}
    </li>
  );
}
