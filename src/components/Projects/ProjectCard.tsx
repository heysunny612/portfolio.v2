import { useNavigate } from 'react-router-dom';
import { IProject } from '../../interfaces/Project';
import {
  BsLink45Deg,
  BsGithub,
  BsSuitHeart,
  BsSuitHeartFill,
} from 'react-icons/bs';

interface IProjectProps {
  project: IProject;
}

export default function ProjectCard({ project }: IProjectProps) {
  const navigate = useNavigate();
  return (
    <li
      className='project_card'
      role='button'
      onClick={() =>
        navigate(`/portfolio/${project.id}`, { state: { project } })
      }
    >
      <div className='thum'>
        <img src={project.thumbnail} alt={project.title} />
      </div>
      <div className='info'>
        <h3>{project.title}</h3>
        <ul className='skills'>
          {project.skills.map((skill, idx) => (
            <li key={idx}>#{skill}</li>
          ))}
        </ul>
      </div>
      <div className='links'>
        <a href={project.repository} target='_blank' rel='noopener noreferrer'>
          <BsGithub />
        </a>
        <a href={project.deploy} target='_blank' rel='noopener noreferrer'>
          <BsLink45Deg />
        </a>
        <button>
          <BsSuitHeart />
        </button>
      </div>
    </li>
  );
}
