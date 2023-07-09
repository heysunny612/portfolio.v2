import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { AiOutlineClose } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { useUserContext } from '../../context/UserContext';
import useAskMe from '../../hooks/useAskMe';
import { FaLock, FaUnlock } from 'react-icons/fa';
interface IAddQnAFormData {
  question: string;
  publicType: string;
}

export default function AddQnA() {
  const { user } = useUserContext() ?? {};
  const navigate = useNavigate();
  const handleClose = () => navigate('/askme', { replace: true });
  const { register, handleSubmit, watch } = useForm<IAddQnAFormData>({
    defaultValues: {
      question: '',
      publicType: 'public',
    },
  });
  const publicType = watch('publicType');
  const { addQuestionMutation } = useAskMe();
  const onAddQuestion = async (data: IAddQnAFormData) => {
    if (data.question.trim() === '') return;
    const questionData = {
      writer: {
        uid: user?.uid ?? '',
        displayName: user?.displayName ?? '',
        photoURL: user?.photoURL ?? '',
        email: user?.email ?? '',
      },
      question: data.question.trim(),
      isPublic: data.radio === 'public' ? true : false,
      createAt: Date.now(),
    };
    addQuestionMutation.mutate(questionData, {
      onSuccess: () => navigate('/askme'),
    });
  };

  return (
    <section className='qna_add_container'>
      <div className='qna_add'>
        <h3 className='common_h3'>Question</h3>
        <form onSubmit={handleSubmit(onAddQuestion)}>
          <div className='qna_radio'>
            <label className={publicType === 'public' ? 'checked' : ''}>
              <input {...register('publicType')} type='radio' value='public' />
              <FaUnlock /> 공개질문
            </label>
            <label className={publicType === 'notPublic' ? 'checked' : ''}>
              <input
                {...register('publicType')}
                type='radio'
                value='notPublic'
              />
              <FaLock /> 비공개질문
            </label>
          </div>
          <div className='qna_input'>
            <input
              type='text'
              placeholder='무엇이든 편하게 질문해주세요'
              {...register('question', { required: true })}
              autoComplete='off'
            />
          </div>
          <div className='qna_buttons'>
            <Button type='submit' filled>
              등록
            </Button>
            <Button type='button' onClick={handleClose}>
              취소
            </Button>
          </div>
        </form>
        <button className='qna_add_close' onClick={handleClose}>
          <AiOutlineClose />
        </button>
      </div>
    </section>
  );
}
