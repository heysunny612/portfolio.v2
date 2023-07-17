import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import { IPortfolio } from '../interfaces/Portfolio';
import { useUserContext } from '../context/UserContext';
import usePortfolio from '../hooks/usePortfolio';

interface ILikesButtonProps {
  id: IPortfolio['id'];
  likes: IPortfolio['likes'];
}
export default function LikesButton({ likes, id }: ILikesButtonProps) {
  const { user } = useUserContext() ?? {};
  const uid = user?.uid;
  const { updateBlogMutation } = usePortfolio();
  const isLikedByCurrentUser = uid && likes && likes[uid];
  const isLikedCount =
    likes && Object.values(likes).filter((value) => value === true).length;

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!user) {
      alert('로그인 후, 좋아요를 눌러보세요!');
      return;
    }

    const toggleLike = {
      [`likes.${uid}`]: !isLikedByCurrentUser,
    };

    updateBlogMutation.mutate(
      { id: id ?? '', updateData: toggleLike },
      {
        onSuccess: () => {
          console.log('성공');
        },
      }
    );
  };

  return (
    <button onClick={handleLike}>
      {isLikedByCurrentUser ? <BsSuitHeartFill /> : <BsSuitHeart />}
      <span>좋아요 {isLikedCount}</span>
    </button>
  );
}
