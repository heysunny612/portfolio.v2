import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiReactquery,
  SiReactrouter,
} from 'react-icons/si';
import { FaReact, FaSass } from 'react-icons/fa';
import { BsSuitHeartFill, BsGoogle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IPortfolio } from '../../interfaces/Portfolio';
import SendEmail from '../../components/SendEmail/SendEmail';
import fadeIn from '../../utils/fadeIn';
import Button from '../../components/Button/Button';
import Projects from '../../components/Projects/Projects';
import Review from '../../components/Review/Review';
import Avatar from '../../components/Avatar/Avatar';
import usePortfolio from '../../hooks/usePortfolio';
import ProjectsSkeleton from '../../components/Skeleton/ProjectsSkeleton';

const typeAni = [
  '안녕하세요',
  2000,
  'Hi! there',
  2000,
  'Buongiorno',
  2000,
  'Geten Tag!',
  2000,
  'xin chào',
  2000,
  'Bonjour',
  2000,
];

const bgIcons = [
  <SiJavascript />,
  <FaReact />,
  <SiTypescript />,
  <SiHtml5 />,
  <SiCss3 />,
  <FaSass />,
  <SiReactquery />,
  <BsSuitHeartFill />,
  <SiReactrouter />,
  <BsGoogle />,
];

export default function Home() {
  const navigate = useNavigate();
  const { portfolioQuery } = usePortfolio();
  const { isLoading, error, data: projectList } = portfolioQuery;
  const [mainProjectList, setMainProjectList] = useState<IPortfolio[]>([]);

  //브라우저 크기가 960 이하일때는, 메인프로젝트 = 4개
  const updateProjectList = () => {
    if (projectList) {
      if (window.innerWidth <= 960) {
        setMainProjectList(projectList?.slice(0, 4));
      } else {
        setMainProjectList(projectList?.slice(0, 3));
      }
    }
  };

  useEffect(() => {
    updateProjectList();
    const handleResize = () => {
      updateProjectList();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [projectList]);

  return (
    <main className='main'>
      <section className='banner_container'>
        <div className='banner_bg'>
          <ul className='icons'>
            {bgIcons.map((icon, idx) => (
              <li key={idx}>{icon}</li>
            ))}
          </ul>
        </div>
        <div className='common_inner banner_wrap'>
          <div className='banner_text'>
            <motion.div
              variants={fadeIn('right', 0.3)}
              initial='hidden'
              whileInView='show'
            >
              <TypeAnimation
                sequence={typeAni}
                speed={50}
                repeat={Infinity}
                className='ani_text'
                wrapper='p'
              />
            </motion.div>
            <motion.h2
              variants={fadeIn('right', 0.5)}
              initial='hidden'
              whileInView='show'
            >
              저는 <span>황수연</span>입니다.
            </motion.h2>
            <motion.p
              variants={fadeIn('right', 0.7)}
              initial='hidden'
              whileInView='show'
            >
              "제가 여행으로 다녀온 몇몇 나라들의 인사말을 소개해요!
              누군가에게는 친숙하고 쉬운 말이지만, 또 누군가에게는 처음 보는
              이상한(?) 언어가 될 수 있어요. 하지만 이런 익숙하지 않은 것들은
              개발자에게는 언제나 일상이죠! 저는 호기심을 갖고 새로운 언어와
              기술에 도전하는 열정적인 개발자입니다!&nbsp;
              <span>함께 성장하고 싶으시다면, 주저말고 연락주세요! ✨</span>"
            </motion.p>
            <motion.div
              className='banner_buttons'
              variants={fadeIn('right', 0.9)}
              initial='hidden'
              whileInView='show'
            >
              <Button filled large onClick={() => navigate('/portfolio')}>
                See my Portfolio
              </Button>
              <Button large onClick={() => navigate('/contact')}>
                Contact Me
              </Button>
            </motion.div>
          </div>
          <motion.div
            className='banner_avatar'
            variants={fadeIn('left', 0.3)}
            initial='hidden'
            whileInView='show'
          >
            <Canvas
              camera={{ position: [0, 0, 10], fov: 5 }}
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <ambientLight intensity={1.25} />
              <ambientLight intensity={0.1} />
              <directionalLight intensity={0.4} />
              <Avatar position={[0, -1.3, 0]} />
              <OrbitControls />
            </Canvas>
          </motion.div>
        </div>
      </section>
      <section className='works_container'>
        <div className='common_inner'>
          <h2 className='common_h2'>
            Some of my latest work
            <span>최근 작업한 프로젝트를 소개합니다!</span>
          </h2>
          {isLoading && <ProjectsSkeleton />}
          {error ? <p>잠시 후 다시 시도해주세요!</p> : null}
          {mainProjectList && <Projects projectList={mainProjectList} />}
          <div className='btn_view_all'>
            <Button large onClick={() => navigate('/portfolio')}>
              View All Projects
            </Button>
          </div>
        </div>
      </section>
      <section className='comment_container'>
        <h2 className='common_h2'>
          What people are saying
          <span>프로젝트에 달린 소중한 댓글들을 소개합니다!</span>
        </h2>
        <Review />
      </section>
      <section className='contact_container'>
        <div className='common_inner'>
          <h2 className='common_h2'>
            Get In Touch
            <span>heysunny612@gamil.com로 메일이 전송됩니다✨</span>
          </h2>
          <SendEmail />
        </div>
      </section>
    </main>
  );
}
