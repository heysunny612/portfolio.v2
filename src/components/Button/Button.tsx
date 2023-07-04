interface IButtonPros {
  children: string | JSX.Element;
  filled?: boolean;
  large?: boolean;
  onClick?: () => void;
}

export default function Button({
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
    >
      {children}
    </button>
  );
}
