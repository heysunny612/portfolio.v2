import Projects from '../../components/Projects/Projects';
import EmptyState from '../../components/UI/EmptyState';
import usePortfolio from '../../hooks/usePortfolio';
import { useUserContext } from '../../context/UserContext';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

export default function MyHeart() {
  const { user } = useUserContext() || {};
  const uid = user && user.uid;
  const { portfolioQuery } = usePortfolio();
  const { data: projectList } = portfolioQuery;
  const likedProjects = projectList?.filter((project) => {
    if (project.likes && uid) {
      return project.likes[uid] === true;
    }
  });
  const hasLikedProjects = likedProjects && likedProjects?.length > 0;
  const navigate = useNavigate();
  return (
    <>
      <h3 className='common_h3'>
        관심 프로젝트
        <span>내가 누른 좋아요 프로젝트를 한눈에 볼 수 있어요!</span>
      </h3>
      <>
        {likedProjects && <Projects projectList={likedProjects} />}
        {!hasLikedProjects && (
          <EmptyState text='좋아요❤️를 누른 프로젝트가 없습니다.'>
            <Button filled large onClick={() => navigate('/portfolio')}>
              좋아요 누르러가기
            </Button>
          </EmptyState>
        )}
      </>
    </>
  );
}
