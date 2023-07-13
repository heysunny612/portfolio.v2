import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Slider from '../../components/Slider/Slider';
import SubLayout from '../../components/UI/SubLayout';
import BlogCard from './BlogCard';
import useBlog from '../../hooks/useBlog';
import { useUserContext } from '../../context/UserContext';

export default function Blog() {
  const navigate = useNavigate();
  const { isLoading, error, data: blogItems } = useBlog().blogQuery;
  const myStoryList =
    blogItems && blogItems.filter((item) => item.category === '나의 스토리');
  const { user } = useUserContext() || {};

  return (
    <SubLayout className='blog_container' subTitle='blog'>
      <>
        {isLoading && <p>로딩중입니다</p>}
        {error && <p>썸딩이즈롱</p>}
        <h3 className='common_h3'>My Stroy</h3>
        <Slider myStoryList={myStoryList || []} />
        <h3 className='common_h3'>전체보기</h3>
        {blogItems && (
          <ul className='blog_list'>
            {blogItems.map((blog, index) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                index={index}
                blogItems={blogItems}
              />
            ))}
          </ul>
        )}
        {user && user.isAdmin && (
          <div className='blog_write_btn'>
            <Button filled onClick={() => navigate('/blog/write')}>
              Write
            </Button>
          </div>
        )}
      </>
    </SubLayout>
  );
}
