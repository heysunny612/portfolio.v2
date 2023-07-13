import { FaReact, FaSass } from 'react-icons/fa';
import { BiLogoFirebase } from 'react-icons/bi';
import { SiReactquery, SiTypescript } from 'react-icons/si';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Tag } from 'react-tag-input';
import Tags from '../../components/Tags/Tags';
import Button from '../../components/Button/Button';
import SubLayout from '../../components/UI/SubLayout';

const skills = [
  { name: 'react', icon: <FaReact /> },
  { name: 'sass', icon: <FaSass /> },
  { name: 'firebase', icon: <BiLogoFirebase /> },
  { name: 'react-query', icon: <SiReactquery /> },
  { name: 'typescript', icon: <SiTypescript /> },
];

export default function AddPortfolio() {
  const { register, handleSubmit } = useForm();
  const [desc, setDesc] = useState<Tag[]>([]);
  const onAddProject = (data) => {
    console.log(data.skills);
  };
  return (
    <SubLayout className='add_portfolio_container' subTitle='portfolio'>
      <>
        <h3 className='common_h3'>포트폴리오 작성</h3>
        <form onSubmit={handleSubmit(onAddProject)}>
          <label>
            <span>프로젝트명</span>
            <input type='text' {...register('title')} />
          </label>
          <label>
            <span>프로젝트 설명</span>
            <Tags
              tags={desc}
              setTags={setDesc}
              placeholder='프로젝트 설명을 입력하세요 (엔터사용해서 추가)'
            />
          </label>
          <div className='skills_checkbox'>
            <span>사용기술</span>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>
                  <label>
                    <input
                      {...register('skills')}
                      type='checkbox'
                      value={skill.name}
                    />
                    {skill.name}
                    {skill.icon}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <label>
            <span>배포주소</span>
            <input type='text' {...register('buildAdress')} />
          </label>
          <label>
            <span>소스코드</span>
            <input type='text' {...register('codeAdress')} />
          </label>
          <ul className='image_files'>
            <li>
              <label>
                <span>이미지 1</span>
                <input type='file' />
              </label>
              <div className='image_preview'>IMAGE_PREVIEW</div>
            </li>
            <li>
              <label>
                <span>이미지 2</span>
                <input type='file' />
              </label>
              <div className='image_preview'>IMAGE_PREVIEW</div>
            </li>
            <li>
              <label>
                <span>이미지 3</span>
                <input type='file' />
              </label>
              <div className='image_preview'>IMAGE_PREVIEW</div>
            </li>
            <li>
              <label>
                <span>이미지 4</span>
                <input type='file' />
              </label>
              <div className='image_preview'>IMAGE_PREVIEW</div>
            </li>
            <li>
              <label>
                <span>이미지 5</span>
                <input type='file' />
              </label>
              <div className='image_preview'>IMAGE_PREVIEW</div>
            </li>
            <li>
              <label>
                <span>이미지 6</span>
                <input type='file' />
              </label>
              <div className='image_preview'>IMAGE_PREVIEW</div>
            </li>
          </ul>
          <div className='add_btns'>
            <Button filled type='submit'>
              등록
            </Button>
            <Button type='button'>취소</Button>
          </div>
        </form>
      </>
    </SubLayout>
  );
}
