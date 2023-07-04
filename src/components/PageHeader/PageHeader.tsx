interface IPageHeaderPros {
  title: string;
}

export default function PageHeader({ title }: IPageHeaderPros) {
  return (
    <article className='page_header'>
      <h2>{title}</h2>
    </article>
  );
}
