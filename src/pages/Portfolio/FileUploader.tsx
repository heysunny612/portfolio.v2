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
  const existingImage = images?.find((image) => image.index === index);
  const imageSrc =
    uploadedFiles.find((file) => file.index === index)?.imageURL || '';

  //파일업로드 후 미리보기 및 URL 저장
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
          const existingImage = prevImages.find(
            (image) => image.index === index
          );
          //수정모드에서 이미 이미지가 있는데, 파일추가로 추가한 경우
          if (existingImage) {
            return prevImages.map((image) =>
              image.index === index
                ? { index, imageURL: fileURL as string }
                : image
            );
          }
          //이미지가 추가되지 않은 상태에서 새로 이미지를 추가하는 경우
          else {
            return [
              ...prevImages.filter((image) => image.index !== index),
              { index, imageURL: fileURL as string },
            ];
          }
        });
      }
    };
  };
  const handleDelete = () => {
    setFile('');
    //업로드된 이미지가 이미 있는데, 삭제하는경우
    if (existingImage) {
      setUploadedFiles((prevImages) =>
        prevImages.map((image) =>
          image.index === index
            ? { ...image, imageURL: file ? existingImage.imageURL : '' }
            : image
        )
      );
    }
    // 파이어베이스에 올라가기전에 이미지 업로드를 취소하는 경우
    else if (file) {
      setUploadedFiles((prevImages) =>
        prevImages.map((image) =>
          image.index === index ? { ...image, imageURL: '' } : image
        )
      );
    }
  };

  return (
    <li>
      <label>
        <span>이미지 {index + 1}</span>
        <input type='file' accept='image/*' onChange={handleFile} />
      </label>
      <div className='image_preview'>
        {imageSrc ? (
          <img src={imageSrc} alt='프로젝트 이미지 미리보기' />
        ) : (
          'IMAGE_PREVIEW'
        )}
        {imageSrc && !file && (
          <button onClick={handleDelete} type='button'>
            삭제
          </button>
        )}
        {file && (
          <button onClick={handleDelete} type='button'>
            업로드취소
          </button>
        )}
      </div>
    </li>
  );
}
