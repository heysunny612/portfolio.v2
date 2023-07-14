import { ChangeEvent, useState } from 'react';

interface IFileUploader {
  index: number;
  images?: { index: number; imageURL: string }[];
  uploadedFiles: {
    index: number;
    imageURL: string;
  }[];
  setUploadedFiles: React.Dispatch<
    React.SetStateAction<{ index: number; imageURL: string }[]>
  >;
}

export default function FileUploader({
  index,
  images,
  uploadedFiles,
  setUploadedFiles,
}: IFileUploader) {
  const [file, setFile] = useState<string>('');
  const found = images?.find((image) => image.index === index);

  const imageURL = file || (found ? found.imageURL : '');
  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const image = files && files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image!);
    reader.onloadend = (finishedEvent) => {
      const fileURL = finishedEvent?.target?.result;
      if (fileURL) {
        setFile(fileURL as string);

        setUploadedFiles((prevImages) => {
          const existingImage = images?.find((image) => image.index === index);
          //이미 파이어베이스 저장된 IAMGE가 있는데, 파일 업로드를 했을경우
          if (existingImage) {
            return prevImages.map((image) =>
              image.index === index
                ? { index, imageURL: fileURL as string }
                : image
            );
          } else {
            return [...prevImages, { index, imageURL: fileURL as string }];
          }
        });
      }
    };
  };

  //파일삭제
  const handleDelete = () => {
    setFile('');
    const existingImage = images?.find((image) => image.index === index);
    //이미 파이어베이스 저장된 IAMGE가 있는데, 파일업로드후, 업로드전 삭제했을때
    if (existingImage) {
      setUploadedFiles((prevImages) =>
        prevImages.map((image) =>
          image.index === index ? existingImage : image
        )
      );
    } else {
      const filteredFiles = uploadedFiles.filter(
        (image) => image.index !== index
      );
      setUploadedFiles(filteredFiles);
    }
  };

  return (
    <li>
      <label>
        <span>이미지 {index + 1}</span>
        <input type='file' accept='image/*' onChange={handleFile} />
      </label>
      <div className='image_preview'>
        {imageURL ? (
          <img src={imageURL as string} alt='프로젝트 이미지 미리보기' />
        ) : (
          'IMAGE_PREVIEW'
        )}
        {file && (
          <button onClick={handleDelete} type='button'>
            삭제
          </button>
        )}
      </div>
    </li>
  );
}
