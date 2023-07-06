import Slider from '../../components/Slider/Slider';
import SubLayout from '../../components/UI/SubLayout';

export default function Blog() {
  return (
    <SubLayout className='blog_container' subTitle='blog'>
      <>
        <h3 className='common_h3'>My Stroy</h3>
        <Slider />

        <h3 className='common_h3'>전체보기</h3>

        <ul className='blog_list'>
          <li>
            <div className='thumb_area'>
              <img
                src='https://www.navercorp.com/navercorp_/story/2023/20230220125733_1.jpg'
                alt=''
              />
            </div>
            <div className='text_area'>
              <p className='category'>카테고리</p>
              <h4>제로베이스를 수강하며...</h4>
              <p className='date'>2021.07.01</p>
            </div>
          </li>
          <li>
            <div className='thumb_area'>
              <img
                src='https://www.navercorp.com/navercorp_/story/2023/20230220125414_1.jpg'
                alt=''
              />
            </div>
            <div className='text_area'>
              <p className='category'>카테고리</p>
              <h4>성장의 조각을 찾기 위한 나의 도전 ! ✨</h4>
              <p className='date'>2021.07.01</p>
            </div>
          </li>
          <li>
            <div className='thumb_area'>
              <img
                src='https://www.navercorp.com/navercorp_/story/2023/20230220125733_1.jpg'
                alt=''
              />
            </div>
            <div className='text_area'>
              <p className='category'>카테고리</p>
              <h4>제로베이스를 수강하며...</h4>
              <p className='date'>2021.07.01</p>
            </div>
          </li>
          <li>
            <div className='thumb_area'>
              <img
                src='https://www.navercorp.com/navercorp_/story/2023/20230220125414_1.jpg'
                alt=''
              />
            </div>
            <div className='text_area'>
              <p className='category'>카테고리</p>
              <h4>성장의 조각을 찾기 위한 나의 도전 ! ✨</h4>
              <p className='date'>2021.07.01</p>
            </div>
          </li>
        </ul>
      </>
    </SubLayout>
  );
}
