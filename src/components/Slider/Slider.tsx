import BlogSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { RiArrowRightSFill } from 'react-icons/ri';
import { IBlog } from '../../interfaces/Blog';

interface ISliderProps {
  myStoryList: IBlog[];
}

export default function Slider({ myStoryList }: ISliderProps) {
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
  const navigate = useNavigate();
  const handleClick = (myStory: IBlog, index: number) => {
    navigate(`/blog/${myStory.id}`, {
      state: { blog: myStory, index, myStoryList },
    });
  };
  return (
    <div className='slider_container'>
      <BlogSlider {...settings}>
        {myStoryList.map((myStory, index) => (
          <div
            className='slider_box'
            onClick={() => handleClick(myStory, index)}
            role='button'
            key={myStory.id}
          >
            {myStory.thumbnail && (
              <img src={myStory.thumbnail} alt='마이스토리 썸네일' />
            )}
            <div className='slider_tags'>
              {myStory.blogTags.map((tag, index) => (
                <span key={index}>#{tag.text}</span>
              ))}
            </div>
            <div className='title_area'>
              <h4>{myStory.title}</h4>
              <p>
                View details <RiArrowRightSFill />
              </p>
            </div>
          </div>
        ))}
      </BlogSlider>
    </div>
  );
}
