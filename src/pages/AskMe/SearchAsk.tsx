import { BsFillSearchHeartFill } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function SearchAsk() {
  const { register, handleSubmit, setValue } = useForm<{ keyword: string }>();
  const navigate = useNavigate();
  const { keyword } = useParams();
  const onSearchKeyword = ({ keyword }: { keyword: string }) => {
    navigate(`/askme/${keyword}`);
  };

  useEffect(() => {
    setValue('keyword', keyword!);
  }, [keyword]);
  return (
    <form className='qna_search_form' onSubmit={handleSubmit(onSearchKeyword)}>
      <div className='input'>
        <input
          type='text'
          placeholder='Search Keyword'
          {...register('keyword', { required: true })}
        />
      </div>
      <div className='button'>
        <button>
          <BsFillSearchHeartFill />
        </button>
      </div>
    </form>
  );
}
