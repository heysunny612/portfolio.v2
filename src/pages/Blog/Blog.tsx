import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Slider from '../../components/Slider/Slider';
import SubLayout from '../../components/UI/SubLayout';
import { useQuery } from 'react-query';
import { getblogItems } from '../../api/firebase/blog';
import BlogCard from './BlogCard';

export default function Blog() {
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: blogItems,
  } = useQuery(['blog'], getblogItems);

  return (
    <SubLayout className='blog_container' subTitle='blog'>
      <>
        <h3 className='common_h3'>My Stroy</h3>
        <Slider />
        <h3 className='common_h3'>전체보기</h3>
        {blogItems && (
          <ul className='blog_list'>
            {blogItems.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </ul>
        )}
        <Button filled onClick={() => navigate('/blog/write')}>
          Write
        </Button>
      </>
    </SubLayout>
  );
}
