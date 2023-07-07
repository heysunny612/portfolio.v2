import { useForm } from 'react-hook-form';
import { useUserContext } from '../../context/UserContext';
import Button from '../Button/Button';
import InputLayout from '../UI/InputLayout';
import { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
interface EmailFormData {
  user_name: string;
  user_email: string;
  message: string;
}

export default function SendEmail() {
  const { user } = useUserContext() ?? {};
  const { register, handleSubmit, setValue, reset } = useForm<EmailFormData>();
  const [isEmailSent, setIsEmailSent] = useState('');
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const { displayName, email, company } = user || {};
    setValue('user_name', company?.companyName || displayName || '');
    setValue('user_email', email || '');
  }, [user, setValue]);

  const sendEmail = async () => {
    setIsEmailSent('메일을 전송중입니다....!');
    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
        import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID,
        form.current!,
        import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY
      );
      if (result.text === 'OK') {
        setIsEmailSent('정상적으로 전송되었습니다. 관심가져주셔서 감사합니다.');
      }
      setTimeout(() => {
        setIsEmailSent('');
      }, 5000);
    } catch (error: unknown) {
      setIsEmailSent((error as { text?: string }).text || '');
    }
    reset({ message: '' });
  };

  return (
    <form
      className='contact_form'
      onSubmit={handleSubmit(sendEmail)}
      ref={form}
    >
      <div className='input_area'>
        <div>
          <InputLayout title='이름 또는 회사명' required>
            <input type='text' {...register('user_name', { required: true })} />
          </InputLayout>
          <InputLayout title='이메일' required>
            <input
              type='email'
              {...register('user_email', { required: true })}
            />
          </InputLayout>
        </div>
        <div>
          <InputLayout title='메시지' required>
            <textarea {...register('message', { required: true })}></textarea>
          </InputLayout>
        </div>
      </div>
      <div className='contact_btn'>
        {isEmailSent && <p>{isEmailSent}</p>}
        <Button filled large type='submit'>
          Send Email
        </Button>
      </div>
    </form>
  );
}
