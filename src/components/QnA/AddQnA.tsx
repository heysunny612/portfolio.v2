import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { AiOutlineClose } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { useUserContext } from '../../context/UserContext';
import { addQuestion } from '../../api/firebase/askMe';

interface IAddQnAFormData {
  question: string;
  radio: string;
}

export default function AddQnA() {
  const { user } = useUserContext() ?? {};
  const navigate = useNavigate();
  const handleClose = () => navigate('/askme', { replace: true });
  console.log(user);
  const { register, handleSubmit } = useForm<IAddQnAFormData>({
    defaultValues: {
      question: '',
      radio: 'public',
    },
  });
  const onAddQuestion = async (data: IAddQnAFormData) => {
    if (data.question.trim() === '') return;
    await addQuestion({
      writer: {
        uid: user?.uid ?? '',
        displayName: user?.displayName ?? '',
        companyName: user?.company?.companyName ?? '',
        photoURL: user?.photoURL ?? '',
        email: user?.email ?? '',
      },
      question: data.question.trim(),
      isPublic: data.radio === 'public' ? true : false,
      createAt: Date.now(),
      reply: false,
    });
  };

  return (
    <section className='qna_add_container'>
      <div className='qna_add'>
        <h3 className='common_h3'>Question</h3>
        <form onSubmit={handleSubmit(onAddQuestion)}>
          <div className='qna_radio'>
            <label>
              공개질문
              <input {...register('radio')} type='radio' value='public' />
            </label>
            <label>
              비공개질문
              <input {...register('radio')} type='radio' value='notPublic' />
            </label>
          </div>
          <div className='qna_input'>
            <input
              type='text'
              placeholder='무엇이든 편하게 질문해주세요'
              {...register('question', { required: true })}
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
