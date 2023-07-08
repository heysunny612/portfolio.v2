import { FaUserCircle } from 'react-icons/fa';

interface IProfileProps {
  inline?: boolean;
  displayName: string;
  photoURL: string;
  email: string;
}

export default function Profile({
  inline,
  displayName,
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
        <div className='display_name'>{displayName ? displayName : email}</div>
      </div>
    </div>
  );
}
