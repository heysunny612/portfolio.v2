import Projects from '../../components/Projects/Projects';

export default function Home() {
  return (
    <main className='main'>
      <section className='banner-container'></section>
      <section className='works-container'>
        <div className='common_inner'>
          <h2 className='common_h2'>
            <span>SOME OF MY LATEST WORK</span>
          </h2>
          <Projects />
        </div>
      </section>
    </main>
  );
}
