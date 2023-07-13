import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Tag } from 'react-tag-input';
import Tags from '../../components/Tags/Tags';
import Button from '../../components/Button/Button';
import SubLayout from '../../components/UI/SubLayout';
import FileUploader from './FileUploader';
import { addPortfolio, uploadImage } from '../../api/firebase/portfolio';
import { skillIcons } from './skillIcons';

interface IFilesData {
  index: number;
  file: string;
}

interface IFormData {
  title: string;
  skills: string[];
  buildAdress: string;
  codeAdress: string;
}
export default function AddPortfolio() {
  const { register, handleSubmit } = useForm<IFormData>();
  const [desc, setDesc] = useState<Tag[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<IFilesData[]>([]);

  const onAddProject = async (data: IFormData) => {
    //파이어베이스에 이미지 올리기
    const uploadPromises = uploadedFiles.map(async (file) => {
      const imageURL = await uploadImage(file.file);
      return { index: file.index, imageURL };
    });
    //저장된 URL
    const images = await Promise.all(uploadPromises);
    const portfolioData = {
      title: data.title,
      description: desc,
      skills: data.skills,
      buildAdress: data.buildAdress,
      codeAdress: data.codeAdress,
      images,
      createdAt: Date.now(),
    };
    await addPortfolio(portfolioData).then(() =>
      alert('정상적으로 등록되었습니다')
    );
  };

  const handleFileUpload = (index: number, file: string) => {
    setUploadedFiles((prev) => [...prev, { index, file }]);
  };
  const handleDeleteFile = (index: number) => {
    const filteredFiles = uploadedFiles.filter((file) => file.index !== index);
    setUploadedFiles(filteredFiles);
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
              {skillIcons.map((skill, index) => (
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
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <FileUploader
                  key={index}
                  index={index}
                  onFileUpload={handleFileUpload}
                  onFileDelete={handleDeleteFile}
                />
              ))}
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
