import { ChangeEvent, useState } from 'react';

interface IFileUploader {
  index: number;
  onFileUpload: (index: number, file: string) => void;
  onFileDelete: (index: number) => void;
}

export default function FileUploader({
  index,
  onFileUpload,
  onFileDelete,
}: IFileUploader) {
  const [file, setFile] = useState<string>('');
  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const image = files && files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image!);
    reader.onloadend = (finishedEvent) => {
      const fileURL = finishedEvent?.target?.result;
      if (fileURL) {
        setFile(fileURL as string);
        onFileUpload(index, fileURL as string);
      }
    };
  };

  const handleDelete = () => {
    setFile('');
    onFileDelete(index);
  };
  return (
    <li>
      <label>
        <span>이미지 {index + 1}</span>
        <input type='file' accept='image/*' onChange={handleFile} />
      </label>
      <div className='image_preview'>
        {file ? (
          <img src={file} alt='프로젝트 이미지 미리보기' />
        ) : (
          ' IMAGE_PREVIEW'
        )}
        {file && <button onClick={handleDelete}>삭제</button>}
      </div>
    </li>
  );
}
