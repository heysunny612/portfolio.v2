import { useForm } from 'react-hook-form';
import SubLayout from '../../components/UI/SubLayout';
import Button from '../../components/Button/Button';
import Tags from '../../components/Tags/Tags';
import { useState } from 'react';
import { Tag } from 'react-tag-input';

const categoryOptions = ['스토리', '개발스토리'];

export default function AddBlog() {
  const { register } = useForm();
  const [blogTags, setBlogTags] = useState<Tag[]>([]);

  return (
    <SubLayout subTitle='blog' className='blog_add_container'>
      <>
        <h3 className='common_h3'>블로그 작성</h3>
        <form>
          <label>
            <span>제목</span>
            <input type='text' {...register('title')} />
          </label>
          <label>
            <span>태그</span>
            <Tags tags={blogTags} setTags={setBlogTags} />
          </label>
          <label>
            <span>카테고리</span>
            <select {...register('category')}>
              <option value=''>Please select category</option>
              {categoryOptions.map((category, index) => (
                <option value={category} key={index}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>내용</span>
            <textarea {...register('contents')} />
          </label>
          <label>
            <span>파일</span>
            <input type='file' {...register('file')} />
          </label>
          <div className='blog_add_btns'>
            <Button filled type='submit'>
              등록
            </Button>
            <Button type='button'>취소</Button>
          </div>
        </form>
      </>
    </SubLayout>
  );
}
