import { Outlet, useLocation } from 'react-router-dom';
import SubLayout from '../../components/UI/SubLayout';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const authMenu = [
  { path: '/auth/login', title: '로그인', isAuth: false },
  { path: '/auth/join', title: '계정만들기', isAuth: false },
  { path: '/auth/mypage', title: '마이페이지', isAuth: true },
  { path: '/auth/myheart', title: '마이하트', isAuth: true },
  { path: '/auth/mycomments', title: '마이댓글', isAuth: true },
];

export default function Auth() {
  const [user, setUser] = useState(false);
  const { pathname } = useLocation();
  const filteredMenu = authMenu.filter((menu) => menu.isAuth === user);

  return (
    <SubLayout subTitle={user ? 'mypage' : 'login'}>
      <div className='auth_container'>
        <ul className='auth_menu'>
          {filteredMenu.map(({ path, title }, idx) => (
            <li key={idx} className={pathname === path ? 'active' : ''}>
              <Link to={path}>{title}</Link>
              {pathname === path && (
                <motion.div
                  layoutId='line'
                  className='authMenu_effect'
                ></motion.div>
              )}
            </li>
          ))}
        </ul>
        <div className='auth_contents'>
          <Outlet />
          <button onClick={() => setUser((prev) => !prev)}>임시버튼</button>
        </div>
      </div>
    </SubLayout>
  );
}
