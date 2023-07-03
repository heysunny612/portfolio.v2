import Button from '../../components/Button/Button';
import Projects from '../../components/Projects/Projects';
import Review from '../../components/Review/Review';

export default function Home() {
  return (
    <main className='main'>
      <section className='banner-container'></section>
      <section className='works-container'>
        <div className='common_inner'>
          <h2 className='common_h2'>
            <b>N</b>oteworthy Projects
            <span>최근 작업한 프로젝트</span>
          </h2>
          <Projects />
          <div className='btn_view_all'>
            <Button large>View All Projects</Button>
          </div>
        </div>
      </section>
      <section className='comment_container'>
        <h2 className='common_h2'>
          <b>W</b>hat people are saying
          <span>프로젝트에 달린 댓글들</span>
        </h2>
        <Review />
      </section>
    </main>
  );
}
