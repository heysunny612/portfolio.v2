import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function AskMeSkeleton() {
  return (
    <SkeletonTheme baseColor='#495670' highlightColor='#8892b0'>
      <div className='askme_skeleton'>
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} count={1} height={100} />
        ))}
      </div>
    </SkeletonTheme>
  );
}
