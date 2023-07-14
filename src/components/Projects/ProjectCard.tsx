import { useNavigate } from 'react-router-dom';

import {
  BsLink45Deg,
  BsGithub,
  BsSuitHeart,
  BsSuitHeartFill,
} from 'react-icons/bs';
import { IPortfolio } from '../../interfaces/Portfolio';

interface IProjectProps {
  project: IPortfolio;
}

export default function ProjectCard({ project }: IProjectProps) {
  const { id, title, skills, images, buildAdress, codeAdress } = project;
  const navigate = useNavigate();
  return (
    <li
      className='project_card'
      role='button'
      onClick={() => navigate(`/portfolio/${id}`, { state: { project } })}
    >
      <div className='thum'>
        <img src={images[0]?.imageURL!} alt={project.title} />
      </div>
      <div className='info'>
        <h3>{title}</h3>
        <ul className='skills'>
          {skills.map((skill: string, idx: number) => (
            <li key={idx}>#{skill}</li>
          ))}
        </ul>
      </div>
      <div className='links'>
        <a href={buildAdress} target='_blank' rel='noopener noreferrer'>
          <BsGithub />
        </a>
        <a href={codeAdress} target='_blank' rel='noopener noreferrer'>
          <BsLink45Deg />
        </a>
        <button>
          <BsSuitHeart />
        </button>
      </div>
    </li>
  );
}
