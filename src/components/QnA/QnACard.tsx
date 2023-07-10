import { useState } from 'react';
import { IAskMe } from '../../interfaces/AskMe';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaLock } from 'react-icons/fa';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useUserContext } from '../../context/UserContext';
import { formatDate } from '../../utils/formatDate';
import Profile from '../Profile/Profile';
import useAskMe from '../../hooks/useAskMe';
import UpdateQnA from './UpdateQnA';

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

export default function QnACard({
  question: { id, question: text, writer, isPublic, createAt, answer },
}: IQnACardProps) {
  const { user } = useUserContext() || {};
  const { deleteQuestionMutation } = useAskMe();
  const [isCardClick, setisCardClick] = useState(false);
  const [isAnswerClick, setIsAnswerClick] = useState(false);
  const [isEditClick, setIsEditClick] = useState(false);
  const toggleCard = () => setisCardClick(!isCardClick);
  const toggleAnswer = () => setIsAnswerClick(!isAnswerClick);
  const toggleEdit = () => setIsEditClick(!isEditClick);

  const handleEdit = () => {
    if (answer && !user?.isAdmin) {
      alert('답변이 등록된 질문은 수정할 수 없습니다.');
      return;
    }
    setIsEditClick(!isEditClick);
  };

  //질문삭제
  const handleDelete = () => {
    const isDelete = confirm(`[${text}] 정말 삭제 하시겠습니까?`);
    if (answer && !user?.isAdmin) {
      alert('답변이 등록된 질문을 삭제할 수 없습니다.');
      return;
    }
    if (isDelete && id) {
      deleteQuestionMutation.mutate(id);
    }
  };
  return (
    <li className='qna_card'>
      <div className='qan_info'>
        <span className={`badge ${answer ? 'completed' : ''}`}>
          {!isPublic ? <FaLock /> : ''} {answer ? '답변완료' : '답변대기중'}
        </span>
        <h4 className='title' onClick={toggleCard} role='button'>
          {!isPublic &&
          (!user || (!user?.isAdmin && !(user?.uid === writer.uid)))
            ? '비공개로 작성된 질문입니다'
            : text}
        </h4>
        {answer && (
          <div className='toggle' onClick={toggleCard} role='button'>
            {isCardClick ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        )}
      </div>
      {isEditClick && (
        <UpdateQnA
          defaultValue={text}
          id={id!}
          user={user!}
          toggle={toggleEdit}
        />
      )}
      <div className='qna_writer'>
        <Profile
          inline
          displayName={writer?.displayName}
          photoURL={writer?.photoURL}
          email={writer?.email}
        />
        <span className='date'>작성일 : {formatDate(createAt)}</span>
        {user && (
          <div className='qna_buttons'>
            {(user?.uid === writer?.uid || user?.isAdmin) && (
              <>
                <button onClick={handleEdit}>
                  {isEditClick ? '취소' : '수정'}
                </button>
                <button onClick={handleDelete}>삭제</button>
              </>
            )}
            {user?.isAdmin && (
              <button onClick={toggleAnswer}>
                {isAnswerClick ? '취소' : '답변'}
              </button>
            )}
          </div>
        )}
      </div>
      {isAnswerClick && (
        <UpdateQnA
          id={id!}
          defaultValue={answer?.content || ''}
          user={user!}
          toggle={toggleAnswer}
          setisCardClick={setisCardClick}
          answer
        />
      )}
      {answer && (
        <AnimatePresence>
          {isCardClick ? (
            <motion.div
              className='qna_answer'
              variants={answerVars}
              initial='initial'
              animate='visible'
              exit='leaving'
            >
              <p>
                {isPublic || (!isPublic && writer.uid === user?.uid)
                  ? answer.content
                  : `작성자 ${writer.displayName}님만 열람이 가능합니다.`}
              </p>
              <div className='answer_bottom'>
                <Profile
                  displayName={answer.displayName}
                  photoURL={answer.photoURL}
                  email={answer.email}
                />
                <span className='date'>
                  답변일 : {formatDate(answer.createAt)}
                </span>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      )}
    </li>
  );
}
