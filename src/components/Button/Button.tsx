interface IButtonPros {
  type?: 'button' | 'submit' | 'reset';
  children: string | JSX.Element;
  filled?: boolean;
  large?: boolean;
  onClick?: () => void;
}

export default function Button({
  type,
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
