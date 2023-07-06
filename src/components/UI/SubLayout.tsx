interface ISubLayoutProps {
  className?: string;
  subTitle: string;
  children: JSX.Element;
}

export default function SubLayout({
  className,
  subTitle,
  children,
}: ISubLayoutProps) {
  return (
    <section className={className}>
      <div className='page_header'>
        <h2>{subTitle}</h2>
      </div>
      <div className='common_inner sub_pages'>{children}</div>
    </section>
  );
}
