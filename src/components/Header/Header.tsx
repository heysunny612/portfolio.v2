import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsSuitHeartFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useUserContext } from '../../context/UserContext';
import { useState, useEffect } from 'react';
import { logout } from '../../api/firebase/auth';

import Button from '../Button/Button';
const navItems = [
  { title: 'About', path: '/about' },
  { title: 'Portfolio', path: '/portfolio' },
  { title: 'Blog', path: '/blog' },
  { title: 'Ask me', path: '/askme' },
  { title: 'Contact', path: '/contact' },
];

export default function Header() {
  const user = useUserContext()?.user;
  const location = useLocation();
  const navigate = useNavigate();
  const [isUserMenu, setIsUserMenu] = useState(false);
  const toggleUserMenu = () => setIsUserMenu((userMenu) => !userMenu);
  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMobileMenu = () => setMobileMenu(!mobileMenu);
  const closeMobileMenu = () => setMobileMenu(false);

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

  // 사용자가 반응형 모바일 메뉴를 누른후, 브라우저 사이즈를 키웠을때
  const handleResize = () => {
    if (window.innerWidth >= 960) {
      setMobileMenu(false);
    }
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
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
        <div className={`header_nav_wrap ${mobileMenu ? 'active' : ''}`}>
          <nav className='header_nav'>
            {navItems.map(({ title, path }, idx) => (
              <NavLink
                key={idx}
                to={path}
                onClick={closeMobileMenu}
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
              <>
                <div
                  role='button'
                  onClick={toggleUserMenu}
                  className='user_menu_wrap'
                >
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
                      <li onClick={logout} role='button'>
                        LOGOUT
                      </li>
                    </ul>
                  )}
                </div>
                <div className='mobile_mypage_btn'>
                  <Button
                    onClick={() => {
                      navigate('/auth/mypage');
                      closeMobileMenu();
                    }}
                  >
                    My Page
                  </Button>
                  <Button onClick={logout}>Logout</Button>
                </div>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    navigate('/auth/login');
                    closeMobileMenu();
                  }}
                >
                  Login
                </Button>
              </>
            )}
            <div className='mobile_resume'>
              <Button filled>Resume</Button>
            </div>
          </div>
        </div>
      </div>
      {mobileMenu && (
        <div
          className={`mobile_bg ${mobileMenu ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        ></div>
      )}
      <button className='mobile_menu' onClick={toggleMobileMenu}>
        {mobileMenu ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>
    </header>
  );
}
