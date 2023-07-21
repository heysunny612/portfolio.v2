import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Tag } from 'react-tag-input';
import { deleteImage, uploadImage } from '../../api/firebase/portfolio';
import { skillIcons } from '../../data/skillIcons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IPortfolio } from '../../interfaces/Portfolio';
import usePortfolio from '../../hooks/usePortfolio';
import Tags from '../../components/Tags/Tags';
import Button from '../../components/Button/Button';
import SubLayout from '../../components/UI/SubLayout';
import FileUploader from './FileUploader';
interface IFilesData {
  index: number;
  imageURL: string;
}
interface IFormData {
  title: string;
  skills: string[];
  buildAdress: string;
  codeAdress: string;
}

export default function AddPortfolio() {
  const { id } = useParams();
  const { project }: { project?: IPortfolio } = useLocation()?.state || {};
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm<IFormData>({
    defaultValues: {
      // 수정모드로 들어왔을경우 초기값 셋팅
      title: project ? project.title : '',
      codeAdress: project ? project.codeAdress : '',
      buildAdress: project ? project.buildAdress : '',
      skills: project ? project.skills : [],
    },
  });
  const [desc, setDesc] = useState<Tag[]>(
    project && project.description ? project.description : []
  );
  const [uploadedFiles, setUploadedFiles] = useState<IFilesData[]>(
    project?.images?.map((image) => ({
      index: image.index,
      imageURL: image.imageURL || '',
    })) || []
  );
  const [isUploding, setIsUploding] = useState(false);
  const { addPortfolioMutation, updateBlogMutation } = usePortfolio();

  // 기존에 등록된 이미지 URL 리스트
  const existingImages = project?.images?.map((image) => image.imageURL);
  // 업로드된 파일들의 URL 리스트
  const uploadedImages = uploadedFiles?.map((file) => file.imageURL);
  // 기존 이미지와 업로드된 파일들을 비교하여 삭제해야 할 이미지 URL 리스트
  const imagesToDelete = existingImages?.filter(
    (imageURL) => !uploadedImages.includes(imageURL!)
  );

  const onAddProject = async (data: IFormData) => {
    setIsUploding(true);
    try {
      //파이어베이스에 이미지 올리기
      const uploadPromises = uploadedFiles.map(async (uploadeFile) => {
        if (uploadeFile.imageURL.startsWith('data:')) {
          const imageURL = await uploadImage(uploadeFile.imageURL);
          return { index: uploadeFile.index, imageURL };
        } else {
          return uploadeFile;
        }
      });
      //파이어베이스에 저장된 URL 가져오기
      const images = await Promise.all(uploadPromises);

      //파이어베이스에서도 사용하지 않는 이미지 삭제하기
      if (imagesToDelete && imagesToDelete.length > 0) {
        const deletePromises = imagesToDelete.map((imageURL) => {
          if (!imageURL) return;
          deleteImage(imageURL);
        });
        await Promise.all(deletePromises);
      }

      const portfolioData = {
        title: data.title,
        description: desc,
        skills: data.skills,
        buildAdress: data.buildAdress,
        codeAdress: data.codeAdress,
        images,
        createdAt: project ? project.createdAt : Date.now(),
      };

      if (id && project) {
        updateBlogMutation.mutate(
          { id, updateData: portfolioData },
          {
            onSuccess: () => {
              alert('정상적으로 수정되었습니다');
              navigate('/portfolio');
            },
          }
        );
        return;
      }
      addPortfolioMutation.mutate(portfolioData, {
        onSuccess: () => {
          alert('정상적으로 등록되었습니다');
          navigate('/portfolio');
        },
      });
    } finally {
      setIsUploding(false);
    }
  };

  return (
    <SubLayout className='add_portfolio_container' subTitle='portfolio'>
      <>
        <h3 className='common_h3'>포트폴리오 작성</h3>
        <form onSubmit={handleSubmit(onAddProject)}>
          <label>
            <span>프로젝트명</span>
            <input
              type='text'
              {...register('title', { required: true })}
              autoFocus
            />
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
              {skillIcons.map(({ name, icon }, index) => (
                <li key={index}>
                  <label
                    key={index}
                    className={watch('skills')?.includes(name) ? 'checked' : ''}
                  >
                    <input
                      {...register('skills')}
                      type='checkbox'
                      value={name}
                    />
                    {icon}
                    {name}
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
                  uploadedFiles={uploadedFiles}
                  setUploadedFiles={setUploadedFiles}
                  images={project && (project.images as IFilesData[])}
                />
              ))}
          </ul>
          <div className='add_btns'>
            <Button filled type='submit'>
              {isUploding ? '업로드중...' : id && project ? '수정' : '등록'}
            </Button>
            <Button type='button' onClick={() => navigate(-1)}>
              취소
            </Button>
          </div>
        </form>
      </>
    </SubLayout>
  );
}
