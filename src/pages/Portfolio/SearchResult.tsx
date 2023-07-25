import { useSearchParams } from 'react-router-dom';
import Projects from '../../components/Projects/Projects';
import usePortfolio from '../../hooks/usePortfolio';
import ProjectsSkeleton from '../../components/Skeleton/ProjectsSkeleton';

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const skills = searchParams.get('skills');
  const skillArray = skills?.split(',');
  const { portfolioQuery } = usePortfolio();
  const { isLoading, error, data: projectList } = portfolioQuery;
  const filteredProjects = skills
    ? projectList?.filter((project) =>
        project?.skills?.some((skill) => skillArray?.includes(skill))
      )
    : projectList || [];
  return (
    <>
      <h3 className='common_h3'>
        Projects
        <span>로그인하시면, 프로젝트에 좋아요를 누를 수 있어요! ☺️</span>
      </h3>
      {skills && (
        <div className='search_result'>
          <ul>
            {skillArray?.map((skill, index) => (
              <li key={index}>
                "{skill}" <span>,</span>
              </li>
            ))}
          </ul>
          <p>
            검색 결과 : <b>{filteredProjects?.length}</b>
          </p>
        </div>
      )}
      {isLoading && <ProjectsSkeleton count={9} />}
      {error && <p>Something is wrong 😥 Try Again</p>}
      {filteredProjects && filteredProjects?.length > 0 ? (
        <Projects projectList={filteredProjects} />
      ) : (
        <div className='no_search_result'>검색결과가 없습니다.😥</div>
      )}
    </>
  );
}
