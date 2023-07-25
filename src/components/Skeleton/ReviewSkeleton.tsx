import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ReviewSkeleton() {
  const [skeletonCount, setSkeletonCount] = useState(0);
  //브라우저 크기가 960 이하일때는, 메인프로젝트 = 4개
  const updateReviewList = () => {
    const windowWidth = window.innerWidth;
    const count = windowWidth <= 960 ? 3 : 5;
    setSkeletonCount(count);
  };

  useEffect(() => {
    updateReviewList();
    const handleResize = () => {
      updateReviewList();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <SkeletonTheme baseColor='#495670' highlightColor='#8892b0'>
      <div className='review_skeleton'>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <Skeleton key={index} count={1} height={170} />
        ))}
      </div>
    </SkeletonTheme>
  );
}
