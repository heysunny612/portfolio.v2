import { useNavigate, useSearchParams } from 'react-router-dom';
import { BsLink45Deg, BsGithub } from 'react-icons/bs';
import { IPortfolio } from '../../interfaces/Portfolio';
import LikesButton from '../LikesButton';

interface IProjectProps {
  project: IPortfolio;
}

export default function ProjectCard({ project }: IProjectProps) {
  const { id, title, skills, images, buildAdress, codeAdress, likes } = project;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramSkills = searchParams?.get('skills');
  const skillArray = paramSkills?.split(',');
  const thumbnail = images?.find((image) => image.index === 0);

  return (
    <li
      className='project_card'
      role='button'
      onClick={() => navigate(`/portfolio/${id}`)}
    >
      <div className='thum'>
        {thumbnail && <img src={thumbnail.imageURL!} alt={project.title} />}
        <div className='project_likes'>
          <LikesButton likes={likes} id={id} />
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
          href={codeAdress}
          target='_blank'
          rel='noopener noreferrer'
          onClick={(e) => e.stopPropagation()}
        >
          <BsGithub />
        </a>
        <a
          href={buildAdress}
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
