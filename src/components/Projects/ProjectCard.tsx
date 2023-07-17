import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  BsLink45Deg,
  BsGithub,
  BsSuitHeart,
  BsSuitHeartFill,
} from 'react-icons/bs';
import { IPortfolio } from '../../interfaces/Portfolio';
import usePortfolio from '../../hooks/usePortfolio';
import { useUserContext } from '../../context/UserContext';

interface IProjectProps {
  project: IPortfolio;
  projectList: IPortfolio[];
}

export default function ProjectCard({ project, projectList }: IProjectProps) {
  const { user } = useUserContext() || {};
  const uid = user?.uid;
  const { id, title, skills, images, buildAdress, codeAdress, likes } = project;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramSkills = searchParams?.get('skills');
  const skillArray = paramSkills?.split(',');
  const { updateBlogMutation } = usePortfolio();
  const isLikedByCurrentUser = likes && user && likes[user.uid];
  const isLikedCount =
    likes && Object.values(likes).filter((value) => value === true).length;

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!user) {
      alert('로그인 후, 좋아요를 눌러보세요!');
      return;
    }
    const toggleLike = {
      [`likes.${uid}`]: isLikedByCurrentUser ? false : true,
    };
    updateBlogMutation.mutate(
      { id: id ?? '', updateData: toggleLike },
      {
        onSuccess: () => {
          console.log('성공');
        },
      }
    );
  };

  return (
    <li
      className='project_card'
      role='button'
      onClick={() =>
        navigate(`/portfolio/${id}`, { state: { project, projectList } })
      }
    >
      <div className='thum'>
        {images && <img src={images[0]?.imageURL!} alt={project.title} />}
        <div className='project_likes'>
          <button onClick={handleLike}>
            {isLikedByCurrentUser ? <BsSuitHeartFill /> : <BsSuitHeart />}
            <span>좋아요 {isLikedCount}</span>
          </button>
        </div>
      </div>
      <div className='info'>
        <h3>{title}</h3>
        <ul className='skills'>
          {skills?.map((skill: string, idx: number) => (
            <li
              key={idx}
              className={skillArray?.includes(skill) ? 'active' : ''}
            >
              #{skill}
            </li>
          ))}
        </ul>
      </div>
      <div className='links'>
        <a
          href={buildAdress}
          target='_blank'
          rel='noopener noreferrer'
          onClick={(e) => e.stopPropagation()}
        >
          <BsGithub />
        </a>
        <a
          href={codeAdress}
          target='_blank'
          rel='noopener noreferrer'
          onClick={(e) => e.stopPropagation()}
        >
          <BsLink45Deg />
        </a>
      </div>
    </li>
  );
}
