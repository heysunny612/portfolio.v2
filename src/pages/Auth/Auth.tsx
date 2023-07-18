import { Outlet, useLocation } from 'react-router-dom';
import SubLayout from '../../components/UI/SubLayout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserContext } from '../../context/UserContext';

const authMenu = [
  { path: '/auth/login', title: '로그인', isAuth: false },
  { path: '/auth/join', title: '계정만들기', isAuth: false },
  { path: '/auth/mypage', title: '나의 프로필', isAuth: true },
  { path: '/auth/myheart', title: '관심 프로젝트', isAuth: true },
  { path: '/auth/mycomments', title: '나의 댓글', isAuth: true },
  { path: '/auth/myqna', title: '나의 질문', isAuth: true },
  { path: '/auth/exit', title: '계정삭제', isAuth: true },
];

export default function Auth() {
  const user = useUserContext()?.user;
  const isUser = user ? true : false;
  const { pathname } = useLocation();
  const filteredMenu = authMenu.filter((menu) => menu.isAuth === isUser);

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
        </div>
      </div>
    </SubLayout>
  );
}
