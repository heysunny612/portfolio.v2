import { useQuery } from 'react-query';
import ProjectCard from './ProjectCard';
import { getPortfolios } from '../../api/firebase/portfolio';
import { IPortfolio } from '../../interfaces/Portfolio';

export default function Projects() {
  const {
    isLoading,
    error,
    data: projectList,
  } = useQuery<IPortfolio[]>(['portfolio'], () => getPortfolios());

  return (
    <>
      {projectList && (
        <ul className='projects'>
          {projectList.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
      )}
    </>
  );
}
