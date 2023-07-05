import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IProject } from '../../interfaces/Project';
import { FaReact, FaSass } from 'react-icons/fa';
import { BiLogoFirebase, BiLogoNetlify, BiLogoGithub } from 'react-icons/bi';
import { SiReactquery, SiTypescript } from 'react-icons/si';
import { BsSuitHeartFill } from 'react-icons/bs';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Comments from '../../components/Comments/Comments';
import SubLayout from '../../components/UI/SubLayout';
interface IStateProp {
  project: IProject;
}
export default function PortfolioDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as IStateProp;
  const { project } = state;
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle((toggle) => !toggle);
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
        <div className='btn_heart'>
          <BsSuitHeartFill />
        </div>
        <h3 className='common_h3'>
          {project.title}
          <span>맘에 드신다면 오른쪽에 있는 하트를 눌러주세요❤️</span>
        </h3>
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
        <div className='detail_bottom_btns'>
          <div className='bottom_btns'>
            <button>
              <BsSuitHeartFill />
              <span>좋아요 128</span>
            </button>
            <button
              onClick={handleToggle}
              className={`${toggle ? 'active' : ''}`}
            >
              {toggle ? <IoIosArrowUp /> : <IoIosArrowDown />}
              <span>댓글 보기 15</span>
            </button>
          </div>
          <button onClick={() => navigate(-1)}>
            <AiOutlineUnorderedList />
            <span>목록 보기</span>
          </button>
        </div>
        <div className='detail_btns'>
          <button className='prev'>
            <MdArrowBackIos />
          </button>
          <button className='next'>
            <MdArrowForwardIos />
          </button>
        </div>
        {toggle && (
          <div className='detail_comments'>
            <h3 className='common_h3'>
              Comments <span>첫 댓글의 주인공이 되어보세요!</span>
            </h3>
            <Comments />
          </div>
        )}
      </>
    </SubLayout>
  );
}
