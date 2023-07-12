import { useLocation, useNavigate } from 'react-router-dom';
import { IBlog } from '../../interfaces/Blog';
import { formatDate } from '../../utils/formatDate';
import RecentBlogList from './RecentBlogList';
import Profile from '../../components/Profile/Profile';
import SubLayout from '../../components/UI/SubLayout';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const modules = {
  toolbar: false, // 툴바 비활성화
};

export default function BlogDetail() {
  const { blog } = useLocation().state as { blog: IBlog };
  const navigate = useNavigate();
  return (
    <SubLayout className='blog_detail' subTitle='blog'>
      <>
        <p className='blog_detail_category'>{blog.category}</p>
        <h3 className='common_h3'>{blog.title}</h3>
        <div className='blog_detail_top'>
          <div className='blog_writer_info'>
            <span>Written by</span>
            <Profile
              displayName={blog.writer.displayName}
              photoURL={blog.writer.photoURL}
              email={blog.writer.email}
            />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <div className='blog_top_btns'>
            <button>이전글</button>
            <button onClick={() => navigate('/blog')}>목록보기</button>
            <button>다음글</button>
          </div>
        </div>
        <div className='blog_content_wrap'>
          <ReactQuill
            value={blog.content}
            readOnly={true}
            className='blog_content'
            modules={modules}
          />
          <ul className='blog_detail_tags'>
            {blog.blogTags.map(({ id, text }) => (
              <li key={id}>#{text}</li>
            ))}
          </ul>
        </div>
        <RecentBlogList />
      </>
    </SubLayout>
  );
}
