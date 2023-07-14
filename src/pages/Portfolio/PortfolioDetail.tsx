import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BiLogoNetlify, BiLogoGithub } from 'react-icons/bi';
import { BsSuitHeartFill } from 'react-icons/bs';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IPortfolio } from '../../interfaces/Portfolio';
import { skillIcons } from './skillIcons';
import { deleteImage, deletePortfolio } from '../../api/firebase/portfolio';
import Comments from '../../components/Comments/Comments';
import SubLayout from '../../components/UI/SubLayout';

interface IStateProp {
  project: IPortfolio;
}
export default function PortfolioDetail() {
  const navigate = useNavigate();
  const { project } = useLocation().state as IStateProp;
  const { id, title, images, skills, description, buildAdress, codeAdress } =
    project;
  const sortedImg = images.sort((a, b) => a.index - b.index);

  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle((toggle) => !toggle);
  const handleDelete = async () => {
    const isDelete = window.confirm('정말 삭제하시겠습니까?');
    if (isDelete && id) {
      await Promise.all(
        images.map(async (image) => {
          if (!image.imageURL) return;
          await deleteImage(image.imageURL);
        })
      );
      await deletePortfolio(id);
      navigate('/portfolio');
    }
  };
  const handleEdit = () => {
    navigate(`/portfolio/write/${id}`, { state: { project } });
  };
  return (
    <SubLayout className='detail_container' subTitle='portfolio'>
      <>
        <div className='btn_heart'>
          <BsSuitHeartFill />
        </div>
        <h3 className='common_h3'>
          {title}
          <span>맘에 드신다면 오른쪽에 있는 하트를 눌러주세요❤️</span>
        </h3>
        <ul className='detail_images'>
          {sortedImg.map(({ index, imageURL }) => (
            <li key={index}>
              <img src={imageURL!} alt='프로젝트 이미지' />
            </li>
          ))}
        </ul>
        <h3 className='common_h3'>Information</h3>
        <div className='detail_info'>
          <div className='detail_desc'>
            <h4>프로젝트 설명</h4>
            <ul>
              {description.map(({ text }, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          </div>
          <div className='detail_skills'>
            <h4>사용 기술</h4>
            <ul>
              {skills.map((skill, index) => {
                const found = skillIcons.find((item) => item.name === skill);
                return (
                  <li key={index}>
                    <span>{found ? found.icon : <BsSuitHeartFill />}</span>
                    {skill}
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
              <a href={buildAdress} target='_blank' rel='noopener noreferrer'>
                {buildAdress}
              </a>
            </p>
          </div>
          <div className='detail_deploy'>
            <h4>소스코드</h4>
            <p>
              <span>
                <BiLogoGithub />
              </span>
              <a href={codeAdress} target='_blank' rel='noopener noreferrer'>
                {codeAdress}
              </a>
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
          <div className='bottom_btns'>
            <button onClick={handleEdit}>
              <span>수정</span>
            </button>
            <button onClick={handleDelete}>
              <span>삭제</span>
            </button>
            <button onClick={() => navigate('/portfolio')}>
              <AiOutlineUnorderedList />
              <span>목록 보기</span>
            </button>
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
