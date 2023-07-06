interface IButtonPros {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  filled?: boolean;
  large?: boolean;
  onClick?: () => void;
}

export default function Button({
  type = 'button',
  children,
  filled,
  large,
  onClick,
}: IButtonPros) {
  return (
    <button
      className={`primary_btn ${filled ? 'filled' : null}
      ${large ? 'large' : null}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
