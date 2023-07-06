interface IInputProps {
  title: string;
  required?: boolean;
  children: JSX.Element;
}

export default function InputLayout({
  title,
  required,
  children,
}: IInputProps) {
  return (
    <label className='common_label'>
      <span className='label_text'>
        {title} {required && <b>*</b>}
      </span>
      <div className='input'>
        {children}
        <span className='line1'></span>
        <span className='line2'></span>
        <span className='line3'></span>
        <span className='line4'></span>
      </div>
    </label>
  );
}
