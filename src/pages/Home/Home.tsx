import { TypeAnimation } from 'react-type-animation';
import Button from '../../components/Button/Button';
import Projects from '../../components/Projects/Projects';
import Review from '../../components/Review/Review';
import { motion } from 'framer-motion';
import fadeIn from '../../utils/fadeIn';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Avatar from '../../components/Avatar/Avatar';
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

export default function Home() {
  return (
    <main className='main'>
      <section className='banner_container'>
        <div className='banner_bg'>
          <ul className='icons'>
            <li>
              <SiJavascript />
            </li>
            <li>
              <FaReact />
            </li>
            <li>
              <SiTypescript />
            </li>
            <li>
              <SiHtml5 />
            </li>
            <li>
              <SiCss3 />
            </li>
            <li>
              <FaSass />
            </li>
            <li>
              <SiReactquery />
            </li>
            <li>
              <BsSuitHeartFill />
            </li>
            <li>
              <SiReactrouter />
            </li>
            <li>
              <BsGoogle />
            </li>
          </ul>
        </div>
        <div className='common_inner'>
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
              저는 <span>황수연</span>입니다
            </motion.h2>
            <motion.p
              variants={fadeIn('right', 0.7)}
              initial='hidden'
              whileInView='show'
            >
              제가 여행으로 다녀온 일부 나라의 인사말입니다. 누군가에게는 가장
              익숙하고 쉬운 말이지만, 또 누군가에게는 처음 보는 이상한(?) 언어일
              수 도있습니다. 내게 익숙하지 않은 것들은 개발자에게는 언제나
              일어나는 일상이라고 생각합니다. 알고 나면 별거 아닌 걸수도 있는
              것들을 지나치지 않고 새로운 언어와 기술에 호기심을 갖고
              <span>새로운 도전을 통해 성장하고자 하는 열정적인 개발자</span>가
              되겠습니다✨ (임시문구)
            </motion.p>
            <motion.div
              className='banner_buttons'
              variants={fadeIn('right', 0.9)}
              initial='hidden'
              whileInView='show'
            >
              <Button filled large>
                See my Portfolio
              </Button>
              <Button large>Contact Me</Button>
            </motion.div>
          </div>
          <motion.div
            className='banner_avatar'
            variants={fadeIn('left', 0.3)}
            initial='hidden'
            whileInView='show'
          >
            <Canvas
              camera={{ position: [0, 0, 7], fov: 10 }}
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <ambientLight intensity={1.25} />
              <ambientLight intensity={0.1} />
              <directionalLight intensity={0.4} />
              <Avatar position={[0.025, -1.2, 0]} />
              <OrbitControls />
            </Canvas>
          </motion.div>
        </div>
      </section>
      <section className='works_container'>
        <div className='common_inner'>
          <h2 className='common_h2'>
            <b>N</b>oteworthy Projects
            <span>최근 작업한 프로젝트</span>
          </h2>
          <Projects />
          <div className='btn_view_all'>
            <Button large>View All Projects</Button>
          </div>
        </div>
      </section>
      <section className='comment_container'>
        <h2 className='common_h2'>
          <b>W</b>hat people are saying
          <span>프로젝트에 달린 댓글들</span>
        </h2>
        <Review />
      </section>
    </main>
  );
}
