import { BsGithub } from 'react-icons/bs';
import { SiNaver } from 'react-icons/si';
export default function Footer() {
  return (
    <footer>
      <div className='common_inner'>
        <p>
          © 2023 Designed & Built by <span>Suyeon Hwang</span>
        </p>
        <div className='footer_links'>
          <a href='/'>
            <BsGithub />
          </a>
          <a href='/'>
            <SiNaver />
          </a>
        </div>
      </div>
    </footer>
  );
}
