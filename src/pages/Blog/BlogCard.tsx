import { useNavigate } from 'react-router-dom';
import { IBlog } from '../../interfaces/Blog';
import { formatDate } from '../../utils/formatDate';

interface IBlogCardPrps {
  blog: IBlog;
}

export default function BlogCard({
  blog,
  blog: { id, thumbnail, category, createdAt, title },
}: IBlogCardPrps) {
  const navigate = useNavigate();
  console.log(thumbnail);

  const handleClick = () => {
    navigate(`/blog/${id}`, { state: { blog } });
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
        <button>수정</button>
        <button>삭제</button>
      </div>
    </li>
  );
}
