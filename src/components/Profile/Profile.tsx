import React from 'react';

interface IProfileProps {
  inline: boolean;
}

export default function Profile({ inline }: IProfileProps) {
  return (
    <div className={`user_profile ${inline ? 'inline' : ''}`}>
      <div className='user_wrap'>
        <span className='image'></span>
        <div className='display_name'> heysunny612@gmail.com</div>
      </div>
    </div>
  );
}
