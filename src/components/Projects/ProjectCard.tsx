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
  return (
    <li className='project_card' role='button'>
      <div className='thum'>
        <img src={project.thumbnail} alt='' />
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
        <a href='/'>
          <BsGithub />
        </a>
        <a href='/'>
          <BsLink45Deg />
        </a>
        <button>
          <BsSuitHeart />
        </button>
      </div>
    </li>
  );
}
