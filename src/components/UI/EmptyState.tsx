import { ReactNode } from 'react';

interface IEmptyStateProps {
  text: string;
  children: ReactNode;
}

export default function EmptyState({ text, children }: IEmptyStateProps) {
  return (
    <div className='empty_state_container'>
      <p>{text}</p>
      {children}
    </div>
  );
}
