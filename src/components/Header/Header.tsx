import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { BiLogoAngular } from 'react-icons/bi';

export default function Header() {
  return (
    <header>
      <div className='header_container'>
        <h1 className='header_logo'>
          <Link to='/'>
            <BiLogoAngular />
          </Link>
        </h1>
        <nav className='header_nav'>
          <Link to='about'>About</Link>
          <Link to='portfolio'>Portfolio</Link>
          <Link to='blog'>Blog</Link>
          <Link to='contact'>Contact</Link>
        </nav>
        <div className='header_btns'>
          <Button>Login</Button>
          <Button filled>Resume</Button>
        </div>
      </div>
    </header>
  );
}
