import { BsGithub, BsTwitter } from 'react-icons/bs';
import { SiNaver } from 'react-icons/si';
import { FaYoutube } from 'react-icons/fa';
import SendEmail from '../../components/SendEmail/SendEmail';
import Button from '../../components/Button/Button';
import SubLayout from '../../components/UI/SubLayout';

const PERSONAL_EMAIL = 'heysunny@gamil.com';

export default function Contact() {
  return (
    <SubLayout className='contact_container' subTitle='contact'>
      <>
        <h3 className='common_h3'>
          Send me an Email <span>{PERSONAL_EMAIL}로 메일을 전송합니다😆</span>
        </h3>
        <SendEmail />
        <h3 className='common_h3'>SNS</h3>
        <ul className='contact_sns'>
          <li>
            <a href='/'>
              <Button large>
                <BsGithub />
              </Button>
              <span>Github</span>
            </a>
          </li>
          <li>
            <a href='/'>
              <Button large>
                <SiNaver />
              </Button>
              <span>Blog</span>
            </a>
          </li>
          <li>
            <a href='/'>
              <Button large>
                <FaYoutube />
              </Button>
              <span>Youtube</span>
            </a>
          </li>
          <li>
            <a href='/'>
              <Button large>
                <BsTwitter />
              </Button>
              <span>Twitter</span>
            </a>
          </li>
        </ul>
      </>
    </SubLayout>
  );
}
