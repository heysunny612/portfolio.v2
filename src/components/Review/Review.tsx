import ReviewCard from './ReviewCard';
import ReviewRow from './ReviewRow';
import { IReview } from '../../interfaces/Reviews';

const reviews: IReview[] = [
  {
    id: 0,
    name: 'Sunny',
    avatar: 'https://manuarora.in/avatar-new.png',
    content: '포트폴리오 구경 잘하고 갑니다! 좋네여~! 😉',
    href: 'https://twitter.com/mannupaaji/status/1542486005403746305',
  },
  {
    id: 1,
    name: 'Elon Musk',
    avatar:
      'https://pbs.twimg.com/profile_images/1529956155937759233/Nyn1HZWF_400x400.jpg',
    content: '엇!!! 취업 잘하시길 바랍니당~!',
    href: 'https://twitter.com/mannupaaji',
  },
  {
    id: 2,
    name: 'Salman Bhai',
    avatar:
      'https://pbs.twimg.com/profile_images/1268824832424022017/vUx5TGw7_400x400.jpg',
    content: '재밌는 포트폴리오네요!!',
    href: 'https://twitter.com/mannupaaji',
  },
  {
    id: 3,
    name: 'Vercel',
    avatar:
      'https://pbs.twimg.com/profile_images/1252531684353998848/6R0-p1Vf_400x400.jpg',
    content: '특히나 넷플릭스가 참 좋네여!',
    href: 'https://twitter.com/mannupaaji',
  },
  {
    id: 4,
    name: 'GitHub',
    avatar:
      'https://pbs.twimg.com/profile_images/1414990564408262661/r6YemvF9_400x400.jpg',
    content: '❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️',
    href: 'https://twitter.com/mannupaaji',
  },
  {
    id: 5,
    name: 'TailwindCSS',
    avatar: '디양한 라이브러리를 사용하셨군요',
    content: 'Tailwind Templates are here! 🎉',
    href: 'https://twitter.com/mannupaaji',
  },
];

export default function Review() {
  return (
    <section className='review_container'>
      <ReviewRow speed={50}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ReviewRow>
    </section>
  );
}
