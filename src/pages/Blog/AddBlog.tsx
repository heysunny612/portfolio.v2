import SubLayout from '../../components/UI/SubLayout';
import Button from '../../components/Button/Button';
import Tags from '../../components/Tags/Tags';
import { useState } from 'react';
import { Tag } from 'react-tag-input';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addBlog, deleteFile, uploadImage } from '../../api/firebase/blog';
import { IBlog } from '../../interfaces/Blog';
import { useUserContext } from '../../context/UserContext';
import { useRef, useMemo } from 'react';
import { formats } from './editorConfig';

const categoryOptions = ['스토리', '개발스토리'];

export default function AddBlog() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [blogTags, setBlogTags] = useState<Tag[]>([]);
  const [contents, setContents] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const { user } = useUserContext() || {};
  const quillRef = useRef(null);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      const editor = quillRef?.current?.getEditor();
      const file = input.files?.[0];
      const range = editor.getSelection(true);
      try {
        await uploadImage(file).then((url) => {
          editor.insertEmbed(range.index, 'image', url);
          editor.setSelection(range.index + 1);
          setUploadedImages((prevImages) => [...prevImages, url]);
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
    const blogData: IBlog = {
      title,
      blogTags,
      category,
      contents,
      createdAt: Date.now(),
      writer: {
        uid: user?.uid!,
        displayName: user?.displayName!,
        photoURL: user?.photoURL!,
        email: user?.email!,
      },
    };

    try {
      addBlog(blogData).then(() => alert('등록되었습니다'));
    } catch {}
  };

  return (
    <SubLayout subTitle='blog' className='blog_add_container'>
      <>
        <h3 className='common_h3'>블로그 작성</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <span>제목</span>
            <input type='text' onChange={(e) => setTitle(e.target.value)} />
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
              value={contents}
              onChange={(contents) => setContents(contents)}
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
