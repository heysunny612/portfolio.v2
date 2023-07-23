import { useNavigate, useSearchParams } from 'react-router-dom';
import { AiOutlineComment } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { galleryPhotos } from '../../data/GalleryPhotos';
import Slider from 'react-slick';

export default function Gallery() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { activity, graduation } = Object.fromEntries(searchParams);
  const getMatchingPhotos = (id: string, type: string) => {
    const foundGallery = galleryPhotos.find((gallery) => gallery.id === id);
    return (
      foundGallery?.gallery.find((value) => value.type === type)?.photos || []
    );
  };
  const photos = activity
    ? getMatchingPhotos(activity, 'activity')
    : graduation
    ? getMatchingPhotos(graduation, 'graduation')
    : [];

  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          <img src={photos[i].image} />
        </a>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  //bg누르면 갤러리 닫는 함수, UI 불편하여 주석처리
  // const handleBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const target = e.target as HTMLElement;
  //   if (target.className !== 'gallery') return;
  //   navigate(-1);
  // };
  return (
    <section className='gallery_container'>
      <div className='gallery'>
        <Slider {...settings}>
          {photos.map(({ desc, image }) => (
            <div className='gallery_box'>
              <img src={image} />
              {desc && (
                <p className='gallery_desc'>
                  <AiOutlineComment />
                  {desc}
                </p>
              )}
            </div>
          ))}
        </Slider>
        <button className='close_gallery' onClick={() => navigate(-1)}>
          <span>
            <GrClose />
          </span>
        </button>
      </div>
    </section>
  );
}
