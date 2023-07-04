import { useLocation } from 'react-router-dom';
import SubLayout from '../../components/UI/SubLayout';
import { IProject } from '../../interfaces/Project';
import { FaReact, FaSass } from 'react-icons/fa';
import { BiLogoFirebase, BiLogoNetlify, BiLogoGithub } from 'react-icons/bi';
import { SiReactquery, SiTypescript } from 'react-icons/si';
import { BsSuitHeartFill } from 'react-icons/bs';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';

export default function PortfolioDetail() {
  interface IStateProp {
    project: IProject;
  }
  const location = useLocation();
  const state = location.state as IStateProp;
  const { project } = state;
  const tagIcons: { [key: string]: JSX.Element } = {
    react: <FaReact />,
    sass: <FaSass />,
    firebase: <BiLogoFirebase />,
    'react-query': <SiReactquery />,
    typescript: <SiTypescript />,
  };

  return (
    <SubLayout className='detail_container' subTitle='portfolio'>
      <>
        <h3 className='common_h3'>{project.title}</h3>
        <ul className='detail_images'>
          {project.images.map((image, idx) => (
            <li key={idx}>
              <img src={image} alt='프로젝트 이미지' />
            </li>
          ))}
        </ul>
        <h3 className='common_h3'>Information</h3>
        <div className='detail_info'>
          <div className='detail_desc'>
            <h4>프로젝트 설명</h4>
            <ul>
              {project.desc.map((value, idx) => (
                <li key={idx}>{value}</li>
              ))}
            </ul>
          </div>
          <div className='detail_skills'>
            <h4>사용 기술</h4>
            <ul>
              {project.tags.map((tag, idx) => {
                const icon = Object.keys(tagIcons).find(
                  (key) => key.toLowerCase() === tag.toLowerCase()
                );
                return (
                  <li key={idx}>
                    <span>{icon ? tagIcons[icon] : <BsSuitHeartFill />}</span>
                    {tag}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='detail_deploy'>
            <h4>배포주소</h4>
            <p>
              <span>
                <BiLogoNetlify />
              </span>
              <a href={project.deploy}>{project.deploy}</a>
            </p>
          </div>
          <div className='detail_deploy'>
            <h4>소스코드</h4>
            <p>
              <span>
                <BiLogoGithub />
              </span>
              <a href={project.repository}>{project.repository}</a>
            </p>
          </div>
        </div>
        <div className='detail_btns'>
          <button className='prev'>
            <MdArrowBackIos />
          </button>
          <button className='next'>
            <MdArrowForwardIos />
          </button>
        </div>
      </>
    </SubLayout>
  );
}
