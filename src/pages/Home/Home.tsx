import Button from '../../components/Button/Button';
import Projects from '../../components/Projects/Projects';

export default function Home() {
  return (
    <main className='main'>
      <section className='banner-container'></section>
      <section className='works-container'>
        <div className='common_inner'>
          <h2 className='common_h2'>
            <span>SOME OF MY LATEST PROJECTS</span>
          </h2>
          <Projects />
          <div className='btn_view_all'>
            <Button large>View All Projects</Button>
          </div>
        </div>
      </section>
      <section className='comment_container'>
        <div className='common_inner'>
          <h2 className='common_h2'>
            <span>Comment on my latest portfolio</span>
          </h2>
        </div>
      </section>
    </main>
  );
}
