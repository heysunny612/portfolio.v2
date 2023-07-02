interface IButtonPros {
  children: string;
  filled?: boolean;
  large?: boolean;
}

export default function Button({ children, filled, large }: IButtonPros) {
  return (
    <button
      className={`primary_btn ${filled ? 'filled' : null}
      ${large ? 'large' : null}`}
    >
      {children}
    </button>
  );
}
