import SubLayout from '../../components/UI/SubLayout';
import Button from '../../components/Button/Button';
import Tags from '../../components/Tags/Tags';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Tag } from 'react-tag-input';
import { addBlog, deleteImage, uploadImage } from '../../api/firebase/blog';
import { IBlog } from '../../interfaces/Blog';
import { useUserContext } from '../../context/UserContext';
import { useState, useRef, useMemo } from 'react';
import { formats } from './editorConfig';

const categoryOptions = ['스토리', '개발스토리'];

export default function AddBlog() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [blogTags, setBlogTags] = useState<Tag[]>([]);
  const [content, setContent] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const { user } = useUserContext() || {};
  const quillRef = useRef<ReactQuill>(null);

  //에디터에 이미지 등록시 파이어베이스 저장
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      const editor = quillRef?.current?.getEditor();
      const file = input.files?.[0];
      const range = editor?.getSelection(true);
      try {
        await uploadImage(file).then((url) => {
          if (editor && range && file) {
            editor?.insertEmbed(range?.index, 'image', url);
            const nextIndex = range.index + 1;
            editor?.setSelection(nextIndex, nextIndex);
            setUploadedImages((prevImages) => [...prevImages, url] as string[]);
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, 'link', 'image'],
        ],
        handlers: { image: imageHandler },
      },
    }),
    []
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTitle('');
    setBlogTags([]);
    setContent('');
    const blogData: IBlog = {
      title,
      blogTags,
      category,
      content,
      createdAt: Date.now(),
      thumbnail:
        uploadedImages.filter((image) => content.includes(image))[0] || '',
      writer: {
        uid: user?.uid!,
        displayName: user?.displayName!,
        photoURL: user?.photoURL!,
        email: user?.email!,
      },
    };

    try {
      await addBlog(blogData)
        .then(() => {
          alert('등록되었습니다');
        })
        .then(() => {
          const editorImageUrls = imageUrlsFromContent(content);
          const imagesToDelete = uploadedImages.filter(
            (image) => !editorImageUrls.includes(image)
          );
          Promise.all(imagesToDelete.map((image) => deleteImage(image)));
        });
    } catch {}
  };

  return (
    <SubLayout subTitle='blog' className='blog_add_container'>
      <>
        <h3 className='common_h3'>블로그 작성</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <span>제목</span>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <span>태그</span>
            <Tags tags={blogTags} setTags={setBlogTags} />
          </label>
          <label>
            <span>카테고리</span>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value=''>Please select category</option>
              {categoryOptions.map((category, index) => (
                <option value={category} key={index}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <div className='blog_editor'>
            <ReactQuill
              theme='snow'
              modules={modules}
              formats={formats}
              value={content}
              onChange={(content) => setContent(content)}
              ref={quillRef}
            />
          </div>
          <div className='blog_add_btns'>
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

//에디터에 있는 이미지 URL
const imageUrlsFromContent = (content: any) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = content;
  const imgElements = tempElement.getElementsByTagName('img');
  const imageUrls = Array.from(imgElements).map((img) => img.src);
  return imageUrls;
};
