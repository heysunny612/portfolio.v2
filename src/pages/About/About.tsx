import { useLocation, useNavigate } from 'react-router-dom';
import SubLayout from '../../components/UI/SubLayout';
import Gallery from '../../components/Gallery/Gallery';

const educationList = [
  {
    id: 'zerobase',
    logo: '제로베이스',
    title: '제로베이스',
    date: '2023.03.01 ~ 2023.08.31',
    list: ['프론트엔드 스쿨 13기'],
    activityPhotos: false,
    graduationPhotos: false,
  },
  {
    id: 'deepdive',
    logo: 'https://image.yes24.com/goods/92742567/XL',
    title: '이웅모 저자님과 함께하는 자바스크립트 북스터디',
    date: '2023.04.20 ~ 2023.06.08',
    list: [
      '자바스크립트의 기본 개념과 동작 원리',
      '모던 자바스크립트 Deep Dive',
    ],
    activityPhotos: true,
    graduationPhotos: false,
  },
  {
    id: 'dreamcoding',
    logo: 'https://academy.dream-coding.com/logo-long-white.svg',
    title: '드림코딩아카데미',
    date: '2023.04.09 ~ ',
    list: [
      'Git 마스터과정',
      '리액트 개념정리 · 클론코딩',
      '프론트엔드 필수 브라우저101',
      '자바스크립트 마스터리 (ES6+)',
    ],
    activityPhotos: false,
    graduationPhotos: true,
  },
  {
    id: 'nomard',
    logo: 'https://nomadcoders.co/m.svg',
    title: '노마드코더',
    date: '2023.03.01 ~ 2023.08.31',
    list: ['React JS 마스터클래스', '트위터 클론코딩'],
    activityPhotos: false,
    graduationPhotos: true,
  },
  {
    id: 'korea1',
    logo: '',
    title: '근로자직업능력 개발훈련',
    date: '2015-03-28 ~ 2015-04-19',
    list: ['자바스크립트 & 제이쿼리 주말반', '반응형웹 HTML5&CSS 3.0 주말반'],
    activityPhotos: false,
    graduationPhotos: false,
  },
  {
    id: 'korea2',
    logo: '',
    title: '취업성공패키지',
    date: '2012.08.61 ~ 2013.12.09',
    list: [
      '일러스트 백터그래픽',
      '웹디자이너 취업 기본과정',
      '웹디자이너 양성과정 1단계(포토샵기초+활용)',
      '웹표준디자인',
    ],
    activityPhotos: false,
    graduationPhotos: false,
  },
];

export default function About() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const gallery = pathname === '/about/gallery';

  return (
    <SubLayout className='about_container' subTitle='about'>
      <>
        <article className='about_about'>
          <h3 className='common_h3'>About Me</h3>
          <div className='about_row'>
            <div className='about-text_area'>
              <h1>About.</h1>
              <p className='intro'>
                안녕하세요! 땡땡땡땡땡 프론트엔드 개발자 황수연입니다.
              </p>
              <p className='desc'>
                웹 개발의 매력에 빠져있는 프론트엔드 개발자입니다. 코드를 짜는
                것을 좋아하고, 웹사이트를 개발함으로써 사람들에게 긍정적인
                영향을 줄 수 있다는 것을 믿어요 웹의 세계로 여러분을 초대합니다!
                저는 프론트엔드 개발자로서 사용자들의 요구에 부응하는 멋진 웹
                애플리케이션을 만들기 위해 열심히 노력하고 있어요. 함께 웹을
                즐겁게 만들어볼까요 (임시문구)
              </p>
            </div>
            <div className='about-img_area'></div>
          </div>
          <ul className='about-images'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </article>
        <article className='about_education'>
          <h3 className='common_h3'>Education</h3>
          <ul className='education-list'>
            {educationList.map(
              ({
                id,
                logo,
                title,
                list,
                date,
                activityPhotos,
                graduationPhotos,
              }) => (
                <li key={id}>
                  <div className='info'>
                    <div className='logo'>
                      <img src={logo} alt='' />
                    </div>
                    <h4> {title}</h4>
                    {list.map((value) => (
                      <p>{value}</p>
                    ))}
                  </div>
                  <p className='date'>{date}</p>
                  <div className='education-hover_btns'>
                    <div>
                      {activityPhotos && (
                        <button
                          onClick={() => navigate(`gallery?activity=${id}`)}
                        >
                          활동 사진 보기
                        </button>
                      )}
                      {graduationPhotos && (
                        <button
                          onClick={() => navigate(`gallery?graduation=${id}`)}
                        >
                          수료증 보기
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
        </article>
        <article className='about_skills'>
          <h3 className='common_h3'>My Skills</h3>
        </article>
        <article className='about_kit'>
          <h3 className='common_h3'>My dev Kit</h3>
          <div className='kit-hover_area'>
            <ul>
              <li className='item1'>1</li>
              <li className='item2'>2</li>
              <li className='item3'>3</li>
              <li className='item4'>4</li>
            </ul>
          </div>
        </article>
        {gallery ? <Gallery /> : ''}
      </>
    </SubLayout>
  );
}
