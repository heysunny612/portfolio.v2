import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { AiOutlineClose } from 'react-icons/ai';

export default function AddQnA() {
  const navigate = useNavigate();
  const handleClose = () => navigate('/askme', { replace: true });
  return (
    <section className='qna_add_container'>
      <div className='qna_add'>
        <h3 className='common_h3'>Answer</h3>
        <form>
          <div className='qna_input'>
            <input type='text' placeholder='무엇이든 편하게 질문해주세요' />
          </div>
          <div className='qna_buttons'>
            <Button type='submit' filled>
              등록
            </Button>
            <Button type='button' onClick={handleClose}>
              취소
            </Button>
          </div>
        </form>
        <button className='qna_add_close' onClick={handleClose}>
          <AiOutlineClose />
        </button>
      </div>
    </section>
  );
}
