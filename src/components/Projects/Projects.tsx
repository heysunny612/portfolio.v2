import ProjectCard from './ProjectCard';
import { IPortfolio } from '../../interfaces/Portfolio';

interface IProjectsProps {
  projectList: IPortfolio[];
}
export default function Projects({ projectList }: IProjectsProps) {
  return (
    <>
      {projectList && (
        <ul className='projects'>
          {projectList.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              projectList={projectList}
            />
          ))}
        </ul>
      )}
    </>
  );
}
