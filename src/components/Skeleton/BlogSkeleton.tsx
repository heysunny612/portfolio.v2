import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function BlogSkeleton() {
  const [skeletonCount, setSkeletonCount] = useState(0);
  //브라우저 크기가 960 이하일때는, 메인프로젝트 = 4개
  const updateProjectList = () => {
    const windowWidth = window.innerWidth;
    const count = windowWidth <= 1024 ? 2 : 3;
    setSkeletonCount(count);
  };

  useEffect(() => {
    updateProjectList();
    const handleResize = () => {
      updateProjectList();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <SkeletonTheme baseColor='#495670' highlightColor='#8892b0'>
      <div className='blog_skeleton'>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <Skeleton key={index} count={1} height={250} />
        ))}
      </div>
    </SkeletonTheme>
  );
}
