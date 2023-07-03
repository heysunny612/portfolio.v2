import React, {
  useRef,
  cloneElement,
  useEffect,
  useState,
  ReactElement,
  ReactNode,
} from 'react';

interface IReviewRowProps {
  children: ReactNode[];
  speed: number;
}

export default function ReviewRow({ children, speed }: IReviewRowProps) {
  const [playing, setPlaying] = useState(true);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const clonedScrollerRef = useRef<HTMLDivElement | null>(null);
  const hoverRef = useRef(false);
  const playingRef = useRef(playing);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  const clonedChildren = React.Children.map(children, (child: ReactNode) =>
    cloneElement(child as ReactElement)
  );

  useEffect(() => {
    const pixelsPerFrame = speed / 60;
    let scrollerXPos = 0;
    let clonedScrollerXPos = 0;
    let animating = true;

    function animate() {
      if (playingRef.current && !hoverRef.current) {
        scrollerXPos -= pixelsPerFrame;
        clonedScrollerXPos -= pixelsPerFrame;
        const scrollerWidth = scrollerRef.current?.offsetWidth;
        const clonedScrollerWidth = clonedScrollerRef.current?.offsetWidth;

        if (scrollerWidth && scrollerXPos <= -scrollerWidth) {
          scrollerXPos = scrollerWidth;
        }
        if (
          clonedScrollerWidth &&
          clonedScrollerXPos <= -clonedScrollerWidth * 2
        ) {
          clonedScrollerXPos = 0;
        }
        if (scrollerRef.current) {
          scrollerRef.current.style.transform = `translateX(${scrollerXPos}px)`;
        }
        if (clonedScrollerRef.current) {
          clonedScrollerRef.current.style.transform = `translateX(${clonedScrollerXPos}px)`;
        }
      }
      if (animating) {
        window.requestAnimationFrame(animate);
      }
    }

    window.requestAnimationFrame(animate);

    // Clean-up
    return () => {
      animating = false;
    };
  }, []);

  return (
    <div
      className='review_row'
      onMouseOver={() => setPlaying(false)}
      onMouseOut={() => setPlaying(true)}
    >
      <div ref={scrollerRef}>{children}</div>
      <div ref={clonedScrollerRef}>{clonedChildren}</div>
    </div>
  );
}
