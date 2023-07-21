import { useLocation, useNavigate } from 'react-router-dom';
import { BsSuitHeartFill } from 'react-icons/bs';
import { educationList } from '../../data/educationList';
import { motion, useInView } from 'framer-motion';
import { FaBrain } from 'react-icons/fa';
import { SiBuymeacoffee } from 'react-icons/si';
import { IoIosAirplane } from 'react-icons/io';
import { BsMusicNoteBeamed, BsMusicNote, BsCupStraw } from 'react-icons/bs';
import SubLayout from '../../components/UI/SubLayout';
import Gallery from '../../components/Gallery/Gallery';
import fadeIn from '../../utils/fadeIn';
import { useRef } from 'react';
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
                안녕하세요! 땡땡땡땡땡 프론트엔드 개발자 황수연입니다.
              </p>
              <p className='desc'>
                웹 개발의 매력에 빠져있는 프론트엔드 개발자입니다. 코드를 짜는
                것을 좋아하고, 웹사이트를 개발함으로써 사람들에게 긍정적인
                영향을 줄 수 있다는 것을 믿어요 웹의 세계로 여러분을 초대합니다!
                저는 프론트엔드 개발자로서 사용자들의 요구에 부응하는 멋진 웹
                애플리케이션을 만들기 위해 열심히 노력하고 있어요. 함께 웹을
                즐겁게 만들어볼까요 (임시문구)
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
          <h3 className='common_h3'>Education</h3>
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
                </li>
              )
            )}
          </ul>
        </article>
        <article className='about_kit'>
          <h3 className='common_h3'>
            My developer Kit
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
                  칭찬을 항상 들어왔습니다:)
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
                  코로나로 인해 몇년동안 비행기를 타지못했지만, 새로운 사람을
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
                  커피는 하루에 10시간 이상 일할 수 있게 해주는 저의 비밀 KIT
                  입니다! (TMI. 저는 얼죽아입니다 :)
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
                  출퇴근 하는 지하철안에서 듣는 음악은 저를 신나게 일할 수
                  있도록 도와줍니다♬ 저는 걸그룹 노래를 좋아합니다:)
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
