import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BiLogoNetlify, BiLogoGithub } from 'react-icons/bi';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import { AiOutlineUnorderedList, AiOutlineComment } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { skillIcons } from '../../data/skillIcons';
import { deleteImage } from '../../api/firebase/portfolio';
import { useUserContext } from '../../context/UserContext';
import Comments from '../../components/Comments/Comments';
import SubLayout from '../../components/UI/SubLayout';
import usePortfolio from '../../hooks/usePortfolio';
import LikesButton from '../../components/LikesButton';
import useComment from '../../hooks/useComment';
import useReply from '../../hooks/useReply';
import ProjectsSkeleton from '../../components/Skeleton/ProjectsSkeleton';
import Profile from '../../components/Profile/Profile';

export default function PortfolioDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext() || {};

  const {
    portfolioQuery: { isLoading, error, data: projectList },
    deletePortfolioMutation,
  } = usePortfolio();
  const project = projectList?.find((project) => project.id === id) || {};
  const { title, images, skills, description, buildAdress, codeAdress, likes } =
    project;
  //이미지 1~6번 순서대로 정렬
  const sortedImg = images?.sort((a, b) => a.index - b.index);

  //댓글 불러오기
  const { data: commentsList } = useComment().commentsQuery;
  const comments = commentsList?.filter((data) => data.pageId === id);
  const commentsId = comments?.map((comment) => comment.id);

  //대댓글 불러오기
  const { data: replyList } = useReply().replyQuery;
  const reply = replyList?.filter((reply) =>
    commentsId?.includes(reply.commentId)
  );
  const totalComments = comments && reply ? comments.length + reply.length : 0;

  //댓글 토글
  const [commentToggle, setCommentToggle] = useState(false);
  const [likeToggle, setLikeToggle] = useState(false);
  const handleCommentToggle = () => {
    setCommentToggle((prev) => !prev);
    if (likeToggle) setLikeToggle(false);
  };
  const handleLikeToggle = () => {
    setLikeToggle((prev) => !prev);
    if (commentToggle) setCommentToggle(false);
  };

  //라이크리스트
  const likeList = likes && Object.values(likes);

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

  //prev,next 페이지 적용
  const currentIndex =
    projectList?.findIndex((project) => project.id === id) || 0;
  const firstPage = currentIndex === 0;
  const lastPage = currentIndex === (projectList?.length || 0) - 1;

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

  //메인페이지에서 댓글을 눌렀다면 코멘트를 볼수있도록 스크롤 이벤트
  const { scollId } = useLocation().state || {};
  const commentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scollId && commentRef.current) {
      setCommentToggle(true);
      setTimeout(() => {
        commentRef?.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 500);
    }
  }, [scollId]);

  return (
    <SubLayout className='detail_container' subTitle='portfolio'>
      <>
        <h3 className='common_h3'>
          {title}
          <span>맘에 드신다면 하단에 있는 좋아요를 눌러주세요❤️</span>
        </h3>
        {error ? <p>ERROR! 잠시 후 다시 시도해주세요 :)</p> : null}
        {isLoading && <ProjectsSkeleton count={6} height={250} />}
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
            {user && user?.isAdmin && (
              <div className='admin_btns'>
                <button onClick={handleEdit}>수정</button>
                <button onClick={handleDelete}>삭제</button>
              </div>
            )}
            <div className='detail_bottom_btns' ref={commentRef}>
              <div className='bottom_btns'>
                <div
                  className={`bottom_btn_wrap ${likeToggle ? 'active' : ''}`}
                >
                  <LikesButton id={id} likes={likes} />
                  <div onClick={handleLikeToggle} className='btn_toggle'>
                    {likeToggle ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>
                </div>
                <div
                  className={`bottom_btn_wrap ${commentToggle ? 'active' : ''}`}
                  onClick={handleCommentToggle}
                >
                  <button>
                    <AiOutlineComment />
                    댓글 보기 <b>{totalComments}</b>
                  </button>
                  <div className='btn_toggle'>
                    {commentToggle ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>
                </div>
              </div>
              <div className='bottom_btns'>
                <button onClick={() => navigate('/portfolio')}>
                  <AiOutlineUnorderedList />
                  목록 보기
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
            {commentToggle && (
              <div className='detail_comments'>
                <h3 className='common_h3'>
                  Comments <span>댓글의 주인공이 되어보세요!</span>
                </h3>
                {id && comments && <Comments pageId={id} comments={comments} />}
              </div>
            )}
            {likeToggle && (
              <div className='like_list'>
                <h3 className='common_h3'>
                  Like List <span>이 프로젝트에 Like를 누른 코드러버님들 </span>
                </h3>
                {likeList && likeList?.length > 0 ? (
                  <ul>
                    {likeList
                      .filter((like) => like.like)
                      .map(({ displayName, email, photoURL }, index) => (
                        <li key={index}>
                          <Profile
                            displayName={displayName || ''}
                            email={email || ''}
                            photoURL={photoURL || ''}
                          />
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p>좋아요를 누른 코드러버님이 없습니다.</p>
                )}
              </div>
            )}
          </>
        )}
      </>
    </SubLayout>
  );
}
