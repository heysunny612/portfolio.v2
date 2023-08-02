import { useLocation, useNavigate } from 'react-router-dom';
import { BsSuitHeartFill } from 'react-icons/bs';
import { educationList } from '../../data/educationList';
import { motion, useInView } from 'framer-motion';
import { FaBrain } from 'react-icons/fa';
import { SiBuymeacoffee } from 'react-icons/si';
import { IoIosAirplane } from 'react-icons/io';
import { useRef } from 'react';
import { BsMusicNoteBeamed, BsMusicNote, BsCupStraw } from 'react-icons/bs';
import SubLayout from '../../components/UI/SubLayout';
import Gallery from '../../components/Gallery/Gallery';
import fadeIn from '../../utils/fadeIn';
import Button from '../../components/Button/Button';

export default function About() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const gallery = pathname === '/about/gallery';
  const articleRef = useRef(null);
  const ulRef = useRef(null);
  const articleInView = useInView(articleRef, { once: true });
  const ulInView = useInView(ulRef, { once: true });

  return (
    <SubLayout className='about_container' subTitle='about'>
      <>
        <article className='about_about' ref={articleRef}>
          <h3 className='common_h3'>About Me</h3>
          <div className='about_row'>
            <motion.div
              className='about-text_area'
              variants={fadeIn('right', 0.5)}
              initial='hidden'
              animate={articleInView ? 'show' : 'hidden'}
            >
              <motion.h1
                variants={fadeIn('right', 0.7)}
                initial='hidden'
                animate={articleInView ? 'show' : 'hidden'}
              >
                About.
              </motion.h1>
              <p className='intro'>
                오늘 최선을 다하는 개발자
                <br /> 그러나, 내일 더 성장하는 개발자
                <br />
                프론트엔드 개발자 황수연입니다.
              </p>
              <p className='desc'>
                저는 약 3년 동안 웹 에이전시에서 웹 퍼블리셔로 근무한 경험이
                있습니다. 디자인과 개발 사이의 중간 단계인 '퍼블리싱'을
                담당하며, 수백 개의 웹사이트를 만들고 고객사와 직접 소통하여
                프로젝트를 성공적으로 마무리하는 역할을 수행했습니다. 이 경험을
                바탕으로 더 많은 도전을 즐기며 웹 개발 분야에서 더 큰 성장을
                꿈꾸고 있습니다!
                <br />
                <br /> "코드러버써니"라는 제 포트폴리오는 리액트와
                타입스크립트를 활용해 만들었고, 인터랙티브한 웹 개발에 관심이
                많습니다! 웹 사용자들과 상호작용할 수 있는 멋진 경험을
                만들어내는 걸 좋아합니다. 계속해서 더 재미있고 발전하는
                프로젝트로 더욱 성장하고 싶습니다! :)
              </p>
            </motion.div>
            <motion.div
              className='about-img_area'
              variants={fadeIn('left', 0.5)}
              initial='hidden'
              animate={articleInView ? 'show' : 'hidden'}
            >
              <img src='/images/profile-pic1.png' alt='' />
              <img src='/images/profile-pic2.png' alt='' className='shadow' />
              <BsSuitHeartFill className='heart' />
            </motion.div>
          </div>
          <motion.ul
            ref={ulRef}
            className='about-images'
            variants={fadeIn('left', 0.5)}
            initial='hidden'
            animate={ulInView ? 'show' : 'hidden'}
          >
            <li>
              <img src='/images/my_img1.jpg' alt='' />
            </li>
            <li>
              <img
                src='https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80'
                alt=''
              />
            </li>
            <li>
              <img src='/images/my_img3.jpg' alt='' />
            </li>
            <li>
              <img src='/images/my_img4.jpg' alt='' />
            </li>
            <li>
              <img src='/images/my_img5.jpg' alt='' />
            </li>
            <li>
              <img src='/images/my_img6.jpg' alt='' />
            </li>
          </motion.ul>
        </article>
        <article className='about_education'>
          <h3 className='common_h3'>
            Education <span>활동사진 또는 수료증을 볼 수 있어요!</span>
          </h3>
          <ul className='education-list'>
            {educationList.map(
              ({
                id,
                logo,
                title,
                list,
                date,
                activityPhotos,
                graduationPhotos,
              }) => (
                <li key={id}>
                  <div className='info'>
                    <div className='logo'>
                      <img src={logo} alt='' />
                    </div>
                    <h4> {title}</h4>
                    {list.map((value) => (
                      <p>{value}</p>
                    ))}
                  </div>
                  <p className='date'>{date}</p>
                  {(activityPhotos || graduationPhotos) && (
                    <div className='education-hover_btns'>
                      <div>
                        {activityPhotos && (
                          <button
                            onClick={() => navigate(`gallery?activity=${id}`)}
                          >
                            활동 사진 보기
                          </button>
                        )}
                        {graduationPhotos && (
                          <button
                            onClick={() => navigate(`gallery?graduation=${id}`)}
                          >
                            수료증 보기
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              )
            )}
          </ul>
        </article>
        <article className='about_kit'>
          <h3 className='common_h3'>
            My Developer Kit
            <span>저에 대해 더알고싶으다면, 마우스를 올려보세요 :)</span>
          </h3>
          <div className='kit-hover_area'>
            <ul>
              <li className='item1'>
                <span>
                  <FaBrain />
                  <b className='accent_brain'>
                    <FaBrain />
                  </b>
                </span>
                <div className='text'>
                  저는 아이큐가 월등히 높거나, 높은 학력을 가지고 있지는
                  않습니다. 하지만, 어느 곳에서 일하든 '일머리'가 아주 좋다는
                  칭찬을 항상 들어왔습니다:) 어떤 일을 하든 열심히 하고,
                  노력하는 모습을 소중히 여기며 앞으로도 발전하고 싶어요!
                </div>
              </li>
              <li className='item2'>
                {[1, 2, 3].map((index) => (
                  <motion.span
                    key={index}
                    initial={{
                      y: '0%',
                    }}
                    animate={{ y: '20%' }}
                    exit={{ y: '-20%' }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      delay: index,
                    }}
                  >
                    <IoIosAirplane />
                  </motion.span>
                ))}
                <div className='text'>
                  제가 열심히 일하고, 공부하는 이유 중 하나는 "여행"입니다.
                  코로나로 인해 몇 년 동안 비행기를 타지 못했지만, 새로운 사람을
                  만나고, 색다른 공기를 마실 수 있는 여행을 매우 좋아합니다 :)
                </div>
              </li>
              <li className='item3'>
                <motion.span
                  initial={{ y: '0%' }}
                  animate={{
                    y: '-20%',
                    rotate: [0, 15, 0, -15, 0],
                    transition: { duration: 2, repeat: Infinity },
                  }}
                >
                  <BsCupStraw />
                </motion.span>
                <motion.span
                  initial={{ y: '-20%' }}
                  animate={{
                    y: '0%',
                    rotate: [0, 15, 0, -15, 0],
                    transition: { duration: 2, repeat: Infinity },
                  }}
                >
                  <SiBuymeacoffee />
                </motion.span>
                <div className='text'>
                  아메리카노는 하루에 10시간 이상 일할 수 있게 해주는 저의 비밀
                  키트입니다! (TMI. 저는 얼죽아입니다 :)
                </div>
              </li>
              <li className='item4'>
                <motion.span
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                    transition: {
                      duration: 1,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    },
                  }}
                >
                  <BsMusicNoteBeamed />
                </motion.span>
                <motion.span
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                    transition: {
                      duration: 1,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      delay: 0.1,
                    },
                  }}
                >
                  <BsMusicNote />
                </motion.span>
                <div className='text'>
                  출퇴근하는 지하철 안에서 듣는 음악은 매일매일 신나게 일할 수
                  있도록 도와줍니다♬ 저는 K-pop 걸그룹 노래를 좋아합니다:)
                </div>
              </li>
            </ul>
          </div>
        </article>
        <article className='about_bottom'>
          <h3 className='common_h3'>make somethin' fun together!</h3>
          <div className='bottom-btns'>
            <Button large>Resume</Button>
            <Button filled onClick={() => navigate('/contact')}>
              Contact
            </Button>
            <Button large onClick={() => navigate('/portfolio')}>
              Portfolio
            </Button>
          </div>
        </article>
        {gallery ? <Gallery /> : ''}
      </>
    </SubLayout>
  );
}
