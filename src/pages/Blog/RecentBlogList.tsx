import { Link } from 'react-router-dom';

export default function RecentBlogList() {
  return (
    <div className='blog_detail_list'>
      <div>
        <h3>Recent articles</h3>
        <Link to='/blog'>전체글 보기</Link>
      </div>
      <ul className='blog_list'>
        <li>
          <Link to='/'>
            <span> 내가 요즘 행복한 이유</span>
            <span className='date'>2023.07.06</span>
          </Link>
        </li>
        <li>
          <Link to='/'>
            <span> 내가 요즘 행복한 이유</span>
            <span className='date'>2023.07.06</span>
          </Link>
        </li>
        <li>
          <Link to='/'>
            <span> 내가 요즘 행복한 이유</span>
            <span className='date'>2023.07.06</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
