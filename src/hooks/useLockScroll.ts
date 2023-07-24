import { useEffect } from 'react';

export default function useLockScroll() {
  useEffect(() => {
    const orginalStyle = window.getComputedStyle(document.body).overflow;
    //스크롤이 없어지도록 body에 스타일을 추가
    document.body.style.overflow = 'hidden';

    //컴포넌트가 언마운트 될 때 스타일을 복원
    return () => {
      document.body.style.overflow = orginalStyle;
    };
  }, []);
}
