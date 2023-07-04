import PageHeader from '../../components/PageHeader/PageHeader';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import { SiNaver } from 'react-icons/si';
import { FaYoutube } from 'react-icons/fa';
import SendEmail from '../../components/SendEmail/SendEmail';
import Button from '../../components/Button/Button';

export default function Contact() {
  return (
    <section className='contact_container'>
      <PageHeader title='contact' />
      <div className='common_inner sub_pages'>
        <h3 className='common_h3'>Send me an Email</h3>
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
      </div>
    </section>
  );
}
