import { IProject } from '../../interfaces/Project';
import ProjectCard from './ProjectCard';

const projects: IProject[] = [
  {
    id: 1,
    title: 'PERSONAL PORTFOLIO',
    skills: ['Firebase', 'React', 'React-query', 'SCSS'],
    thumbnail:
      'https://www.adhamdannaway.com/wp-content/uploads/2022/12/feature-ui-design-book.jpg',
    main: true,
    link: '',
    images: [
      'https://www.adhamdannaway.com/wp-content/themes/dannaway/images/portfolio/growth-giant-2/user-interface-experiment.jpg',
      'https://www.adhamdannaway.com/wp-content/themes/dannaway/images/portfolio/growth-giant-2/user-interface-experiment.jpg',
      'https://www.adhamdannaway.com/wp-content/themes/dannaway/images/portfolio/growth-giant-2/user-interface-experiment.jpg',
      'https://www.adhamdannaway.com/wp-content/themes/dannaway/images/portfolio/growth-giant-2/user-interface-new-experiment.jpg',
      'https://www.adhamdannaway.com/wp-content/themes/dannaway/images/portfolio/growth-giant-2/user-interface-new-experiment.jpg',
      'https://www.adhamdannaway.com/wp-content/themes/dannaway/images/portfolio/growth-giant-2/user-interface-new-experiment.jpg',
    ],
    tags: [
      'React',
      'Sass',
      'Firebase',
      'React-query',
      'TypeScript',
      'test1',
      'test2',
      'test3',
      'test4',
      'test4',
    ],
    desc: [
      'Fake Store API 데이터 사용하여 쇼핑몰 구현',
      '키보드 KEY DOWN 이벤트 검색영역에 적용',
      'context 를 사용한 전역상태 관리 (장바구니,테마)',
      'API 로딩시 스켈레톤 구현',
    ],
    deploy: 'http://localhost:5173/portfolio/1',
    repository: 'http://localhost:5173/portfolio/1',
  },
  {
    id: 2,
    title: 'Mini Youtube',
    skills: ['Firebase', 'React', 'React-query', 'Styled-Components'],
    thumbnail:
      'https://www.adhamdannaway.com/wp-content/uploads/2020/08/feature-william-hill-design-system.jpg',
    main: true,
    link: '',
    images: [
      'https://www.adhamdannaway.com/wp-content/themes/dannaway/images/portfolio/growth-giant-2/user-interface-experiment.jpg',
      'https://www.adhamdannaway.com/wp-content/themes/dannaway/images/portfolio/growth-giant-2/user-interface-experiment.jpg',
      'https://www.adhamdannaway.com/wp-content/themes/dannaway/images/portfolio/growth-giant-2/user-interface-experiment.jpg',
      'https://www.adhamdannaway.com/wp-content/themes/dannaway/images/portfolio/growth-giant-2/user-interface-new-experiment.jpg',
      'https://www.adhamdannaway.com/wp-content/themes/dannaway/images/portfolio/growth-giant-2/user-interface-new-experiment.jpg',
      'https://www.adhamdannaway.com/wp-content/themes/dannaway/images/portfolio/growth-giant-2/user-interface-new-experiment.jpg',
    ],
    tags: [
      'React',
      'Sass',
      'Firebase',
      'React-query',
      'TypeScript',
      'test1',
      'test2',
      'test3',
      'test4',
      'test4',
    ],
    desc: [
      'Fake Store API 데이터 사용하여 쇼핑몰 구현',
      '키보드 KEY DOWN 이벤트 검색영역에 적용',
      'context 를 사용한 전역상태 관리 (장바구니,테마)',
      'API 로딩시 스켈레톤 구현',
    ],
    deploy: 'http://localhost:5173/portfolio/1',
    repository: 'http://localhost:5173/portfolio/1',
  },
  {
    id: 3,
    title: 'SUNNY SHOPPY',
    skills: ['Firebase', 'React', 'React-query', 'SCSS'],
    thumbnail:
      'https://www.adhamdannaway.com/wp-content/uploads/2019/04/feature-interior-design-news-feed-2.jpg',
    main: true,
    link: '',
    images: [
      'https://www.adhamdannaway.com/wp-content/themes/dannaway/images/portfolio/growth-giant-2/user-interface-experiment.jpg',
      'https://www.adhamdannaway.com/wp-content/themes/dannaway/images/portfolio/growth-giant-2/user-interface-experiment.jpg',
      'https://www.adhamdannaway.com/wp-content/themes/dannaway/images/portfolio/growth-giant-2/user-interface-experiment.jpg',
      'https://www.adhamdannaway.com/wp-content/themes/dannaway/images/portfolio/growth-giant-2/user-interface-new-experiment.jpg',
      'https://www.adhamdannaway.com/wp-content/themes/dannaway/images/portfolio/growth-giant-2/user-interface-new-experiment.jpg',
      'https://www.adhamdannaway.com/wp-content/themes/dannaway/images/portfolio/growth-giant-2/user-interface-new-experiment.jpg',
    ],
    tags: [
      'React',
      'Sass',
      'Firebase',
      'React-query',
      'TypeScript',
      'test1',
      'test2',
      'test3',
      'test4',
      'test4',
    ],
    desc: [
      'Fake Store API 데이터 사용하여 쇼핑몰 구현',
      '키보드 KEY DOWN 이벤트 검색영역에 적용',
      'context 를 사용한 전역상태 관리 (장바구니,테마)',
      'API 로딩시 스켈레톤 구현',
    ],
    deploy: 'http://localhost:5173/portfolio/1',
    repository: 'http://localhost:5173/portfolio/1',
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
