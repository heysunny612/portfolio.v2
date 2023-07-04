import Button from '../Button/Button';

export default function SendEmail() {
  return (
    <form className='contact_form'>
      <div className='input_area'>
        <div>
          <label>
            <span>이름 또는 회사명</span>
            <input type='text' />
          </label>
          <label>
            <span>이메일</span>
            <input type='text' />
          </label>
        </div>
        <div>
          <label>
            <span>메시지</span>
            <textarea name='' id=''></textarea>
          </label>
        </div>
      </div>
      <div className='contact_btn'>
        <p>
          정상적으로 전송되었습니다. 관심가져주셔서 감사합니다.
          <br /> 메일전송에 실패했습니다. 다시한번 시도 부탁드립니다.
        </p>
        <Button filled large>
          Send Email
        </Button>
      </div>
    </form>
  );
}
