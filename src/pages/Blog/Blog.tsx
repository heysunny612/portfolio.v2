import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import Button from '../../components/Button/Button';
import Slider from '../../components/Slider/Slider';
import SubLayout from '../../components/UI/SubLayout';
import BlogCard from './BlogCard';
import useBlog from '../../hooks/useBlog';
import BlogSkeleton from '../../components/Skeleton/BlogSkeleton';
import EmptyState from '../../components/UI/EmptyState';

export default function Blog() {
  const navigate = useNavigate();
  const { isLoading, error, data: blogItems } = useBlog().blogQuery;
  const myStoryList =
    blogItems && blogItems.filter((item) => item.category === '나의 스토리');
  const { user } = useUserContext() || {};

  const date2 = new Date('2023-07-27T20:55:00');
  const milliseconds2 = date2.getTime();
  console.log(milliseconds2); // 변경된 결과 출력

  return (
    <SubLayout className='blog_container' subTitle='blog'>
      <>
        {error ? <p>ERROR! 잠시 후 재시도 부탁드립니다.</p> : null}
        <h3 className='common_h3'>My Story</h3>
        {isLoading && <BlogSkeleton />}
        {myStoryList && myStoryList?.length > 0 ? (
          <Slider myStoryList={myStoryList || []} />
        ) : (
          <EmptyState text='등록된 My Story가 없습니다'></EmptyState>
        )}
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
