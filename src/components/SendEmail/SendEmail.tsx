import Button from '../Button/Button';

export default function SendEmail() {
  return (
    <form className='contact_form'>
      <div className='input_area'>
        <div>
          <label className='common_label'>
            <span className='label_text'>이름 또는 회사명</span>
            <div className='input'>
              <input type='text' />
              <span className='line1'></span>
              <span className='line2'></span>
              <span className='line3'></span>
              <span className='line4'></span>
            </div>
          </label>
          <label className='common_label'>
            <span className='label_text'>이메일</span>
            <div className='input'>
              <input type='text' />
              <span className='line1'></span>
              <span className='line2'></span>
              <span className='line3'></span>
              <span className='line4'></span>
            </div>
          </label>
        </div>
        <div>
          <label className='common_label'>
            <span className='label_text'>메시지</span>
            <div className='input'>
              <textarea name='' id=''></textarea>
              <span className='line1'></span>
              <span className='line2'></span>
              <span className='line3'></span>
              <span className='line4'></span>
            </div>
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
