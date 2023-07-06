import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import { motion } from 'framer-motion';
import { BsSuitHeartFill } from 'react-icons/bs';
import { useUserContext } from '../../context/UserContext';
import { FaUserCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { logout } from '../../api/firebase';

const navItems = [
  { title: 'About', path: '/about' },
  { title: 'Portfolio', path: '/portfolio' },
  { title: 'Blog', path: '/blog' },
  { title: 'Ask me', path: '/askme' },
  { title: 'Contact', path: '/contact' },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUserContext()?.user;
  const [isUserMenu, setIsUserMenu] = useState(true);
  const toggleUserMenu = () => setIsUserMenu((userMenu) => !userMenu);

  //마우스 다른곳 클릭시, 유저메뉴 닫기
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.header_btns') && isUserMenu) {
        setIsUserMenu(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isUserMenu]);

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
            {location.pathname === '/' && (
              <motion.div layoutId='line' className='nav_effect'>
                <BsSuitHeartFill />
              </motion.div>
            )}
          </Link>
        </h1>
        <nav className='header_nav'>
          {navItems.map(({ title, path }, idx) => (
            <NavLink
              key={idx}
              to={path}
              className={({ isActive }: { isActive: boolean }): string =>
                isActive ? 'active' : ''
              }
            >
              {title}
              {location.pathname.includes(path) && (
                <motion.div layoutId='line' className='nav_effect'>
                  <BsSuitHeartFill />
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>
        <div className='header_btns'>
          {user ? (
            <div role='button' onClick={toggleUserMenu}>
              {user.photoURL ? (
                <img src={user.photoURL} alt='유저이미지' />
              ) : (
                <FaUserCircle />
              )}
              {isUserMenu && (
                <ul className='user_menu'>
                  <li>
                    <Link to='/auth/mypage'>MY PAGE</Link>
                  </li>
                  <li onClick={logout}>LOGOUT</li>
                </ul>
              )}
            </div>
          ) : (
            <Button onClick={() => navigate('/auth/login')}>Login</Button>
          )}
          <Button filled>Resume</Button>
        </div>
      </div>
    </header>
  );
}
