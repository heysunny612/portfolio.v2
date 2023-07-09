import { useState } from 'react';
import { IAskMe } from '../../interfaces/AskMe';
import Profile from '../Profile/Profile';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaLock } from 'react-icons/fa';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useUserContext } from '../../context/UserContext';
import { formatDate } from '../../utils/formatDate';
import { deleteQuestion } from '../../api/firebase/askMe';
import useAskMe from '../../hooks/useAskMe';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
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
  const { user } = useUserContext() || {};
  const { id, question: text, writer, isPublic, createAt, answer } = question;
  const [isToggle, setToggle] = useState(false);
  const toggleQnA = () => setToggle(!isToggle);
  const { updateQuestionMutation } = useAskMe();
  const { register, handleSubmit, reset } = useForm<{
    answerText: string;
  }>();
  const [isAnswerClick, setIsAnswerClick] = useState(false);
  const toggleAnswerClick = () => {
    setIsAnswerClick(!isAnswerClick);
    reset({ answerText: answer?.content || '' });
  };

  //질문삭제
  const handleDelete = async () => {
    const isDelete = confirm(`[${text}] 정말 삭제 하시겠습니까?`);
    if (answer && !user?.isAdmin) {
      alert('답변이 달린 경우, 질문을 삭제할 수 없습니다.');
      return;
    }
    if (isDelete && id) {
      await deleteQuestion(id);
    }
  };

  //답변등록
  const handleAddAnswer = ({ answerText }: { answerText: string }) => {
    updateQuestionMutation.mutate(
      {
        id: id ?? '',
        answer: {
          uid: user?.uid ?? '',
          displayName: user?.displayName ?? '',
          photoURL: user?.photoURL ?? '',
          email: user?.email ?? '',
          content: answerText,
          createAt: Date.now(),
        },
      },
      {
        onSuccess: () => {
          toggleAnswerClick();
          setToggle(true);
        },
      }
    );
  };

  return (
    <li className='qna_card'>
      <div className='qan_info' role='button' onClick={toggleQnA}>
        <span className={`badge ${answer ? 'completed' : ''}`}>
          {!isPublic ? <FaLock /> : ''} {answer ? '답변완료' : '답변대기중'}
        </span>
        <h4 className='title'>
          {!isPublic && user && !user?.isAdmin && !(user?.uid === writer.uid)
            ? '비공개로 작성된 질문입니다'
            : text}
        </h4>
        {answer && (
          <div className='toggle'>
            {isToggle ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        )}
      </div>
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
                <button>수정</button>
                <button onClick={handleDelete}>삭제</button>
              </>
            )}
            {user?.isAdmin && (
              <button onClick={toggleAnswerClick}>
                {isAnswerClick ? '취소' : '답변'}
              </button>
            )}
          </div>
        )}
      </div>
      {isAnswerClick && (
        <div className='qna_answer_form'>
          <form onSubmit={handleSubmit(handleAddAnswer)}>
            <textarea
              placeholder='답변을 작성하세요'
              {...register('answerText')}
              defaultValue={answer?.content || ''}
            ></textarea>
            <Button type='submit'>답변등록</Button>
          </form>
        </div>
      )}
      {answer && (
        <AnimatePresence>
          {isToggle ? (
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
