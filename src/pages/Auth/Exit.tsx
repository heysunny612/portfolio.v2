import { MdOutlineWavingHand } from 'react-icons/md';
import Button from '../../components/Button/Button';
import { exitUser } from '../../api/firebase/auth';

export default function Exit() {
  const handleExit = async () => {
    const isExit = window.confirm(
      '계정이 바로 삭제됩니다. 정말 삭제하시겠습니까?'
    );
    if (!isExit) return;
    await exitUser();
  };

  return (
    <>
      <h3 className='common_h3'>
        계정삭제
        <span>다음에 꼭 좋은 인연이 되었으면 좋겠습니다!</span>
      </h3>
      <div className='exit_btn'>
        <div className='exit_icon'>
          <MdOutlineWavingHand />
        </div>
        <Button large onClick={handleExit}>
          계정삭제하기
        </Button>
      </div>
    </>
  );
}
