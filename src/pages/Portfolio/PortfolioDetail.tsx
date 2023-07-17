import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BiLogoNetlify, BiLogoGithub } from 'react-icons/bi';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { skillIcons } from './skillIcons';
import { deleteImage } from '../../api/firebase/portfolio';
import { useUserContext } from '../../context/UserContext';
import Comments from '../../components/Comments/Comments';
import SubLayout from '../../components/UI/SubLayout';
import usePortfolio from '../../hooks/usePortfolio';
import LikesButton from '../../components/LikesButton';

export default function PortfolioDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext() || {};
  const {
    portfolioQuery: { data: projectList },
    deletePortfolioMutation,
  } = usePortfolio();
  const project = projectList?.find((project) => project.id === id) || {};
  const { title, images, skills, description, buildAdress, codeAdress, likes } =
    project;
  //이미지 1~6번 순서대로 정렬
  const sortedImg = images?.sort((a, b) => a.index - b.index);

  //prev,next 페이지 적용
  const currentIndex =
    projectList?.findIndex((project) => project.id === id) || 0;
  const firstPage = currentIndex === 0;
  const lastPage = currentIndex === (projectList?.length || 0) - 1;

  //댓글 토글
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle((toggle) => !toggle);

  //이미지 및 프로젝트삭제
  const handleDelete = async () => {
    const isDelete = window.confirm('정말 삭제하시겠습니까?');
    if (isDelete && id && images) {
      await Promise.all(
        images.map(async (image) => {
          if (!image.imageURL) return;
          await deleteImage(image.imageURL);
        })
      );
      await deletePortfolioMutation.mutateAsync(id!, {
        onSuccess: () => {
          navigate('/portfolio');
          alert('삭제되었습니다.');
        },
      });
    }
  };

  //수정페이지로 이동
  const handleEdit = () => {
    navigate(`/portfolio/write/${id}`, { state: { project } });
  };

  //이전페이지
  const handlePrev = () => {
    if (!firstPage) {
      const prevIndex = currentIndex - 1;
      const prevProjectId = projectList && projectList[prevIndex].id;
      navigate(`/portfolio/${prevProjectId}`);
    }
  };

  //다음페이지
  const handleNext = () => {
    if (!lastPage) {
      const nextIndex = currentIndex + 1;
      const nextProjectId = projectList && projectList[nextIndex].id;
      navigate(`/portfolio/${nextProjectId}`);
    }
  };
  return (
    <SubLayout className='detail_container' subTitle='portfolio'>
      <>
        <h3 className='common_h3'>
          {title}
          <span>맘에 드신다면 하단에 있는 좋아요를 눌러주세요❤️</span>
        </h3>
        {projectList && project && (
          <>
            <ul className='detail_images'>
              {sortedImg?.map(({ index, imageURL }) => (
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
                  {description?.map(({ text }, index) => (
                    <li key={index}>{text}</li>
                  ))}
                </ul>
              </div>
              <div className='detail_skills'>
                <h4>사용 기술</h4>
                <ul>
                  {skills?.map((skill, index) => {
                    const found = skillIcons.find(
                      (item) => item.name === skill
                    );
                    return (
                      <li key={index}>
                        <span>{found?.icon}</span>
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
                  <a
                    href={buildAdress}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
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
                  <a
                    href={codeAdress}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {codeAdress}
                  </a>
                </p>
              </div>
            </div>
            <div className='detail_bottom_btns'>
              <div className='bottom_btns'>
                <LikesButton id={id} likes={likes} />
                <button
                  onClick={handleToggle}
                  className={`${toggle ? 'active' : ''}`}
                >
                  {toggle ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  <span>댓글 보기 15</span>
                </button>
              </div>
              <div className='bottom_btns'>
                {user && user?.isAdmin && (
                  <>
                    <button onClick={handleEdit}>
                      <span>수정</span>
                    </button>
                    <button onClick={handleDelete}>
                      <span>삭제</span>
                    </button>
                  </>
                )}
                <button onClick={() => navigate('/portfolio')}>
                  <AiOutlineUnorderedList />
                  <span>목록 보기</span>
                </button>
              </div>
            </div>
            <div className='detail_btns'>
              {!firstPage && (
                <button className='prev' onClick={handlePrev}>
                  <MdArrowBackIos />
                </button>
              )}
              {!lastPage && (
                <button className='next' onClick={handleNext}>
                  <MdArrowForwardIos />
                </button>
              )}
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
        )}
      </>
    </SubLayout>
  );
}
