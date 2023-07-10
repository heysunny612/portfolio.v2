interface IButtonPros {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  filled?: boolean;
  large?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  type = 'button',
  children,
  filled,
  large,
  disabled,
  onClick,
}: IButtonPros) {
  return (
    <button
      className={`primary_btn ${filled ? 'filled' : null}  
      ${large ? 'large' : null} ${disabled ? 'disabled' : null}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
