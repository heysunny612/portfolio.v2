import { Link, useParams } from 'react-router-dom';
import useBlog from '../../hooks/useBlog';
import { formatDate } from '../../utils/formatDate';

export default function RecentBlogList() {
  const { isLoading, error, data: blogItems } = useBlog().blogQuery;
  const { id } = useParams();
  const recentBlog = blogItems && blogItems.filter((item) => item.id !== id);
  return (
    <div className='blog_detail_list'>
      <div>
        <h3>최근 작성한 글</h3>
        <Link to='/blog'>전체글 보기</Link>
      </div>
      {isLoading && <p>최근작성글 로딩중입니다</p>}
      {error ? <p>최근 작성글을 불러오지 못했습니다.</p> : null}
      {blogItems && (
        <ul className='blog_list'>
          {recentBlog?.slice(0, 5).map((blog) => (
            <li key={blog.id}>
              <Link to={`/blog/${blog.id}`} state={{ blog }}>
                <span> {blog.title}</span>
                <span className='date'>{formatDate(blog.createdAt)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
