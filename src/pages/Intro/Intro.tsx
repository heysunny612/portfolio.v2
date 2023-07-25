import { useNavigate } from 'react-router-dom';
import { Variants, motion } from 'framer-motion';
import { useEffect } from 'react';
import { BsSuitHeartFill } from 'react-icons/bs';
import useLockScroll from '../../hooks/useLockScroll';
const textVariants: Variants = {
  hidden: { left: '-100%' },
  show: {
    left: 0,
    transition: { delay: 0.7, duration: 1.5, type: 'spring' },
  },
};

const boxVariants: Variants = {
  hidden: { left: '50%' },
  show: {
    left: '-100%',
    transition: { delay: 2.5, duration: 1.5 },
  },
};
const createBgVariants = (axis: 'x' | 'y', per: string) => {
  return {
    hidden: {
      [axis]: per,
      transition: { delay: 3, duration: 1, type: 'spring' },
    },
  };
};

export default function Intro() {
  useLockScroll();
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/main');
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className='intro_wrap'>
      <motion.div
        className='top'
        variants={createBgVariants('y', '-100%')}
        animate='hidden'
      ></motion.div>
      <motion.div
        className='bottom'
        variants={createBgVariants('y', '100%')}
        animate='hidden'
      ></motion.div>
      <motion.div
        className='left'
        variants={createBgVariants('x', '-100%')}
        animate='hidden'
      ></motion.div>
      <motion.div
        className='right'
        variants={createBgVariants('x', '100%')}
        animate='hidden'
      ></motion.div>
      <motion.div
        className='middle_box'
        variants={boxVariants}
        initial='hidden'
        animate='show'
      >
        <motion.div
          className='text_wrap'
          variants={textVariants}
          initial='hidden'
          animate='show'
        >
          <BsSuitHeartFill /> &nbsp; CODE LOVER <span>SUNNY</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
