import { useNavigate } from 'react-router-dom';
import { IBlog } from '../../interfaces/Blog';
import { formatDate } from '../../utils/formatDate';
import useBlog from '../../hooks/useBlog';

interface IBlogCardPrps {
  blog: IBlog;
  index: number;
  blogItems: IBlog[];
}

export default function BlogCard({
  blog,
  blog: { id, thumbnail, category, createdAt, title },
  index,
  blogItems,
}: IBlogCardPrps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/blog/${id}`, { state: { blog, index, blogItems } });
  };
  const { deleteblogMutation } = useBlog();

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const isDelete = confirm('정말 삭제하시겠습니까?');
    if (!isDelete) return;
    deleteblogMutation.mutate(id!, {
      onSuccess: () => {
        alert('삭제되었습니다');
      },
    });
  };

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigate(`/blog/write/${id}`, { state: { blog } });
  };

  return (
    <li onClick={handleClick} role='button'>
      <div className='thumb_area'>
        {thumbnail ? (
          <img src={thumbnail} alt='블로그 썸네일 이미지' />
        ) : (
          <p>
            CODE LOVER <br /> SUNNY
          </p>
        )}
      </div>
      <div className='text_area'>
        <p className='category'>{category}</p>
        <h4>{title}</h4>
        <p className='date'>{formatDate(createdAt)}</p>
      </div>
      <div className='blog_card_btns'>
        <button onClick={handleEdit}>수정</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
    </li>
  );
}
