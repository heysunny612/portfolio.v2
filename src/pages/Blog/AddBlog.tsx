import { useForm } from 'react-hook-form';
import SubLayout from '../../components/UI/SubLayout';

const blogData = {
  title: '',
  tags: [],
  category: '',
};

const blogCategoryOption = ['My Story', 'FRONT-END'];

export default function AddBlog() {
  const { register } = useForm();
  return (
    <SubLayout subTitle='blog'>
      <>
        <h3 className='common_h3'>블로그 작성</h3>
        <form>
          <label>
            제목
            <input type='text' {...register('title')} />
          </label>{' '}
          <br />
          <label>
            태그
            <input type='text' {...register('title')} />
          </label>
          <br />
          <label>
            카테고리
            <input type='text' {...register('title')} />
          </label>
          <br />
          <label>
            내용
            <input type='text' {...register('title')} />
          </label>
          <br />
          <label>
            내용
            <input type='file' {...register('title')} />
          </label>
        </form>
      </>
    </SubLayout>
  );
}
