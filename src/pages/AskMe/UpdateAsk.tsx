import { useForm } from 'react-hook-form';
import { IUser } from '../../interfaces/User';
import Button from '../../components/Button/Button';
import useAskMe from '../../hooks/useAskMe';

interface IUpdateQnAProps {
  id: string;
  defaultValue: string;
  user?: IUser;
  answer?: boolean;
  toggle: () => void;
  setisCardClick?: (value: boolean) => void;
}
interface IFormData {
  updateText: string;
}

export default function UpdateAsk({
  defaultValue,
  id,
  user,
  answer,
  toggle,
  setisCardClick,
}: IUpdateQnAProps) {
  const { register, handleSubmit } = useForm<IFormData>();
  const { updateQuestionMutation } = useAskMe();

  const onSubmit = ({ updateText }: IFormData) => {
    if (updateText === defaultValue || updateText.trim().length === 0) return;
    const mutationData = {
      id,
      updateData: answer
        ? {
            //답변데이터
            answer: {
              uid: user?.uid || '',
              displayName: user?.displayName || '',
              photoURL: user?.photoURL || '',
              email: user?.email || '',
              content: updateText,
              createAt: Date.now(),
            },
          }
        : {
            //질문수정데이터
            question: updateText,
          },
    };

    updateQuestionMutation.mutate(mutationData, {
      onSuccess: () => {
        toggle();
        if (setisCardClick) {
          setisCardClick(true);
        }
      },
    });
  };

  return (
    <div className='qna_update_form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          placeholder='답변을 작성하세요'
          {...register('updateText')}
          defaultValue={defaultValue || ''}
        ></textarea>
        <Button type='submit'>{answer ? '답변등록' : '질문수정'}</Button>
      </form>
    </div>
  );
}
