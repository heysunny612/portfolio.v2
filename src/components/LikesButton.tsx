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
  const { updatePortfolioMutation } = usePortfolio();
  const isLikedByCurrentUser = uid && likes && likes[uid]?.like;
  const isLikedCount =
    likes && Object.values(likes).filter((value) => value.like === true).length;

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!user) {
      alert('로그인 후, 좋아요를 눌러보세요!');
      return;
    }

    const toggleLike = {
      [`likes.${uid}`]: {
        like: !isLikedByCurrentUser,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      },
    };

    updatePortfolioMutation.mutate({ id: id ?? '', updateData: toggleLike });
  };

  return (
    <button onClick={handleLike}>
      {isLikedByCurrentUser ? <BsSuitHeartFill /> : <BsSuitHeart />}
      Like <b>{isLikedCount}</b>
    </button>
  );
}
