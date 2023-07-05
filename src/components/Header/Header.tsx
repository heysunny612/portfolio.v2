import { Link, NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { BsSuitHeartFill } from 'react-icons/bs';

const nav = [
  { title: 'About', path: '/about' },
  { title: 'Portfolio', path: '/portfolio' },
  { title: 'Blog', path: '/blog' },
  { title: 'Ask me', path: '/askme' },
  { title: 'Contact', path: '/contact' },
];

export default function Header() {
  const location = useLocation();

  return (
    <header>
      <div className='header_container common_inner'>
        <h1 className='header_logo'>
          <Link to='/'>
            <span className='logo_text'>
              <b>CODE</b> LOVER <br /> SUNNY
            </span>
            <div className='logo_icon'>
              <BsSuitHeartFill />
            </div>
            {location.pathname === '/' ? (
              <motion.div layoutId='line' className='nav_effect'>
                <BsSuitHeartFill />
              </motion.div>
            ) : null}
          </Link>
        </h1>
        <nav className='header_nav'>
          {nav.map(({ title, path }, idx) => (
            <NavLink
              key={idx}
              to={path}
              className={({ isActive }: { isActive: boolean }): string =>
                isActive ? 'active' : ''
              }
            >
              {title}
              {location.pathname.includes(path) ? (
                <motion.div layoutId='line' className='nav_effect'>
                  <BsSuitHeartFill />
                </motion.div>
              ) : null}
            </NavLink>
          ))}
        </nav>
        <div className='header_btns'>
          <Button>Login</Button>
          <Button filled>Resume</Button>
        </div>
      </div>
    </header>
  );
}
