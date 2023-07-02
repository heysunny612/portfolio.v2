import { IProject } from '../../interfaces/Project';
import ProjectCard from './ProjectCard';

const projects: IProject[] = [
  {
    id: 1,
    title: 'PERSONAL PORTFOLIO',
    skills: ['Firebase', 'React', 'React-query', 'SCSS'],
    description: '기획부터 진행한 나만의 포트폴리오',
    thumbnail:
      'https://www.adhamdannaway.com/wp-content/uploads/2022/12/feature-ui-design-book.jpg',
    main: true,
    link: '',
  },
  {
    id: 2,
    title: 'Mini Youtube',
    skills: ['Firebase', 'React', 'React-query', 'Styled-Components'],
    description:
      '유투브 API를 이용하여, 동영상을 불러오고 댓글, 관련있는 동영상까지 볼 수있는 미니유튜브 사이트',
    thumbnail:
      'https://www.adhamdannaway.com/wp-content/uploads/2020/08/feature-william-hill-design-system.jpg',
    main: true,
    link: '',
  },
  {
    id: 3,
    title: 'SUNNY SHOPPY',
    skills: ['Firebase', 'React', 'React-query', 'SCSS'],
    description:
      '처음부터 머리 없는 모바일 앱 CMS 구축 Upstatement에서 프로젝트를 위해 ',
    thumbnail:
      'https://www.adhamdannaway.com/wp-content/uploads/2019/04/feature-interior-design-news-feed-2.jpg',
    main: true,
    link: '',
  },
];

export default function Projects() {
  return (
    <ul className='projects'>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </ul>
  );
}
