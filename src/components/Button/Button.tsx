interface IButtonPros {
  children: string;
  filled?: boolean;
}

export default function Button({ children, filled }: IButtonPros) {
  return (
    <button className={`primary_btn ${filled ? 'filled' : null}`}>
      {children}
    </button>
  );
}
