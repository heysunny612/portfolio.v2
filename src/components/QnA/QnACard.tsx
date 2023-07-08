import { useState } from 'react';
import { IAskMe } from '../../interfaces/AskMe';
import Profile from '../Profile/Profile';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaLock } from 'react-icons/fa';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useUserContext } from '../../context/UserContext';
import { formatDate } from '../../utils/formatDate';
interface IQnACardProps {
  question: IAskMe;
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

export default function QnACard({ question }: IQnACardProps) {
  const [isToggle, setToggle] = useState(false);
  const toggleQnA = () => setToggle((prevToggle) => !prevToggle);
  const { user } = useUserContext() ?? {};
  const { id, question: text, writer, isPublic, createAt, reply } = question;
  const answer = '테스트중입니다';
  return (
    <li className='qna_card'>
      <div className='qan_info' role='button' onClick={toggleQnA}>
        <span className={`badge ${reply ? 'completed' : ''}`}>
          {isPublic && <FaLock />} {reply ? '답변완료' : '답변대기중'}
        </span>
        <h4 className='title'>
          {isPublic && !(user?.uid === writer.uid)
            ? '비공개로 작성된 질문입니다'
            : text}
        </h4>
        {reply && (
          <div className='toggle'>
            {isToggle ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        )}
      </div>
      <div className='qna_writer'>
        <Profile
          inline
          displayName={writer.displayName}
          companyName={writer.companyName}
          photoURL={writer.photoURL}
          email={writer.email}
        />
        <span className='date'>작성일 : {formatDate(createAt)}</span>
        <div className='qna_buttons'>
          <button>수정</button>
          <button>삭제</button>
          <button>답변</button>
        </div>
      </div>
      {reply && (
        <AnimatePresence>
          {isToggle ? (
            <motion.div
              className='qna_answer'
              variants={answerVars}
              initial='initial'
              animate='visible'
              exit='leaving'
            >
              {answer}
            </motion.div>
          ) : null}
        </AnimatePresence>
      )}
    </li>
  );
}
