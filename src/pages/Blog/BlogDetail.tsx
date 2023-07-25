import { useLocation, useNavigate } from 'react-router-dom';
import { IBlog } from '../../interfaces/Blog';
import { formatDate } from '../../utils/formatDate';
import { useUserContext } from '../../context/UserContext';
import 'react-quill/dist/quill.snow.css';
import './QuillCustom.scss';
import RecentBlogList from './RecentBlogList';
import Profile from '../../components/Profile/Profile';
import SubLayout from '../../components/UI/SubLayout';
import ReactQuill from 'react-quill';
import useBlog from '../../hooks/useBlog';

const modules = {
  toolbar: false, // 툴바 비활성화
};

export default function BlogDetail() {
  const { blog, index, blogItems, myStoryList } = useLocation().state as {
    blog: IBlog;
    index: number;
    blogItems: IBlog[];
    myStoryList?: IBlog[];
  };
  const { user } = useUserContext() || {};
  const navigate = useNavigate();
  const { deleteblogMutation } = useBlog();
  const totalCount =
    (blogItems && blogItems.length) || (myStoryList && myStoryList.length);
  const firstPage = index === 0;
  const lastPage = index === totalCount! - 1;

  const handlePrev = () => {
    const prevIndex = index - 1;
    if (prevIndex >= 0) {
      if (myStoryList) {
        navigate(`/blog/${myStoryList[prevIndex].id}`, {
          state: {
            blog: myStoryList[prevIndex],
            index: prevIndex,
            myStoryList,
          },
        });
        return;
      }
      navigate(`/blog/${blogItems[prevIndex].id}`, {
        state: { blog: blogItems[prevIndex], index: prevIndex, blogItems },
      });
    }
  };
  const handleNext = () => {
    const nextIndex = index + 1;
    if (nextIndex <= totalCount!) {
      if (myStoryList) {
        navigate(`/blog/${myStoryList[nextIndex].id}`, {
          state: {
            blog: myStoryList[nextIndex],
            index: nextIndex,
            myStoryList,
          },
        });
        return;
      }
      navigate(`/blog/${blogItems[nextIndex].id}`, {
        state: { blog: blogItems[nextIndex], index: nextIndex, blogItems },
      });
    }
  };

  const handleDelete = () => {
    const isDelete = confirm('정말 삭제하시겠습니까?');
    if (!isDelete) return;
    deleteblogMutation.mutate(blog.id!, {
      onSuccess: () => {
        alert('삭제되었습니다');
        navigate('/blog');
      },
    });
  };

  const handleEdit = () => {
    navigate(`/blog/write/${blog.id}`, { state: { blog } });
  };

  return (
    <SubLayout className='blog_detail' subTitle='blog'>
      <>
        <p className='blog_detail_category'>{blog.category}</p>
        <h3 className='common_h3'>{blog.title}</h3>
        <div className='blog_detail_top'>
          <div className='blog_writer_info'>
            <span>Written by</span>
            {blog.writer && (
              <Profile
                displayName={blog.writer.displayName}
                photoURL={blog.writer.photoURL}
                email={blog.writer.email}
              />
            )}
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <div className='blog_top_btns'>
            {user && user.isAdmin && (
              <>
                <button onClick={handleEdit}>수정</button>
                <button onClick={handleDelete}>삭제</button>
              </>
            )}
            {!firstPage && <button onClick={handlePrev}>이전글</button>}
            <button onClick={() => navigate('/blog')}>목록보기</button>
            {!lastPage && <button onClick={handleNext}>다음글</button>}
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
