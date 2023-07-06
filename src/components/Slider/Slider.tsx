import BlogSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { RiArrowRightSFill } from 'react-icons/ri';

export default function Slider() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className='slider_container'>
      <BlogSlider {...settings}>
        <div className='slider_box'>
          <img
            src='https://www.navercorp.com/navercorp_/story/2023/20230220125733_1.jpg'
            alt=''
          />
          <div className='title_area'>
            <h4>내가 제일 좋아하는 취미생활</h4>
            <Link to='/'>
              View details <RiArrowRightSFill />
            </Link>
          </div>
        </div>
        <div className='slider_box'>
          <img
            src='https://www.navercorp.com/img/ko/story/img_work_view.png'
            alt=''
          />
          <div className='title_area'>
            <h4>내가 요즘 행복한이유</h4>
            <Link to='/'>
              View details <RiArrowRightSFill />
            </Link>
          </div>
        </div>
        <div className='slider_box'>
          <img
            src='https://www.navercorp.com/img/ko/story/img_teamnaver.png'
            alt=''
          />
          <div className='title_area'>
            <h4>포트폴리오를 만들면서 ...</h4>
            <Link to='/'>
              View details <RiArrowRightSFill />
            </Link>
          </div>
        </div>
        <div className='slider_box'>
          <img
            src='https://www.navercorp.com/navercorp_/story/2023/20230220125733_1.jpg'
            alt=''
          />
          <div className='title_area'>
            <h4>내가 요즘 행복한이유</h4>
            <Link to='/'>
              View details <RiArrowRightSFill />
            </Link>
          </div>
        </div>
      </BlogSlider>
    </div>
  );
}
