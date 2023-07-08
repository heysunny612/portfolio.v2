import { FaUserCircle } from 'react-icons/fa';

interface IProfileProps {
  inline?: boolean;
  displayName: string;
  companyName: string;
  photoURL: string;
  email: string;
}

export default function Profile({
  inline,
  displayName,
  companyName,
  photoURL,
  email,
}: IProfileProps) {
  return (
    <div className={`user_profile ${inline ? 'inline' : ''}`}>
      <div className='user_wrap'>
        <span className='image'>
          {photoURL ? (
            <img src={photoURL} alt='유저이미지' />
          ) : (
            <FaUserCircle />
          )}
        </span>
        <div className='display_name'>
          {displayName ? displayName : companyName ? companyName : email}
        </div>
      </div>
    </div>
  );
}
