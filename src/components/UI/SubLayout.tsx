import PageHeader from '../PageHeader/PageHeader';

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
      <PageHeader title={subTitle} />
      <div className='common_inner sub_pages'>{children}</div>
    </section>
  );
}
