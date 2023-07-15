import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    //경로 제외
    const excludePaths = [
      '/askme',
      '/askme/write',
      '/auth/join',
      '/auth/login',
      '/portfolio/search/:keyword',
    ];
    if (excludePaths.includes(pathname)) return;
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
