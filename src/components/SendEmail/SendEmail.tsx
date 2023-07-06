import Button from '../Button/Button';
import InputLayout from '../UI/InputLayout';

export default function SendEmail() {
  return (
    <form className='contact_form'>
      <div className='input_area'>
        <div>
          <InputLayout title='이름 또는 회사명'>
            <input type='email' />
          </InputLayout>
          <InputLayout title='이메일'>
            <input type='email' />
          </InputLayout>
        </div>
        <div>
          <InputLayout title='이메일'>
            <textarea name='' id=''></textarea>
          </InputLayout>
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
