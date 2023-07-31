import { BsGithub } from 'react-icons/bs';
import { SiNaver } from 'react-icons/si';
import { FaYoutube } from 'react-icons/fa';
export default function Footer() {
  return (
    <footer>
      <div className='common_inner'>
        <p>
          © 2023 Designed & Built by <span>Suyeon Hwang</span>
        </p>
        <div className='footer_links'>
          <a
            href='https://github.com/heysunny612'
            target='_blank'
            rel='noopener noreferrer'
          >
            <BsGithub />
          </a>
          <a
            href='https://blog.naver.com/heysunny0612'
            target='_blank'
            rel='noopener noreferrer'
          >
            <SiNaver />
          </a>
          <a
            href='https://www.youtube.com/watch?v=qy5weglCYB0'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
}
