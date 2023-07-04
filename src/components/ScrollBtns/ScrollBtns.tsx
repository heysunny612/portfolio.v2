import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import fadeIn from '../../utils/fadeIn';

export default function ScrollBtn() {
  const [showButton, setShowButton] = useState(false);
  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const threshold = 200;
    scrollTop > threshold ? setShowButton(true) : setShowButton(false);
  };
  const handleScrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleScrollToBottom = () =>
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const btnsVars = {
    initial: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
    },
    leaving: {
      opacity: 0,
      x: 80,
    },
  };

  return (
    <AnimatePresence>
      {showButton ? (
        <motion.div
          className='scroll_btn'
          variants={btnsVars}
          initial='initial'
          animate='visible'
          exit='leaving'
        >
          <button onClick={handleScrollToTop}>
            <AiOutlineArrowUp />
          </button>
          <button onClick={handleScrollToBottom}>
            <AiOutlineArrowDown />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
