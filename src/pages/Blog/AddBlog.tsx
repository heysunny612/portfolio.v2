import SubLayout from '../../components/UI/SubLayout';
import Button from '../../components/Button/Button';
import Tags from '../../components/Tags/Tags';
import ReactQuill from 'react-quill';
import useBlog from '../../hooks/useBlog';
import 'react-quill/dist/quill.snow.css';
import './QuillCustom.scss';
import { deleteImage, uploadImage } from '../../api/firebase/blog';
import { IBlog } from '../../interfaces/Blog';
import { useUserContext } from '../../context/UserContext';
import { useState, useRef, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const categoryOptions = ['나의 스토리', '개발 스토리'];

export default function AddBlog() {
  const { blog } = useLocation()?.state || {};
  const { id } = useParams();
  const { user } = useUserContext() || {};
  const initialState = {
    title: (id && blog && blog.title) || '',
    category: (id && blog && blog.category) || '',
    blogTags: (id && blog && blog.blogTags) || [],
    content: (id && blog && blog.content) || '',
  };
  const [state, setState] = useState(initialState);
  const { title, category, blogTags, content } = state;
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    blog?.thumbnail || []
  );
  const quillRef = useRef<ReactQuill>(null);
  const { addBlogMutation, updateBlogMutation } = useBlog();
  const navigate = useNavigate();

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

  //에디터 설정
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: [] }],
          [{ font: [] }],
          [{ align: ['right', 'center', 'justify'] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          [{ color: ['red', '#785412'] }],
          [{ background: ['red', '#785412'] }],
        ],
        handlers: { image: imageHandler },
      },
    }),
    []
  );
  //에디터 설정
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'color',
    'image',
    'background',
    'align',
    'size',
    'font',
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState(initialState);

    //만약 파이어베이스에 업로드된 이미지가 에디터에서 삭제되었다면,
    //파이어베이스에서도 함께 삭제될 수 있도록 처리
    const editorImageUrls = imageUrlsFromContent(state.content);
    const imagesToDelete = uploadedImages.filter(
      (image) => !editorImageUrls.includes(image)
    );
    Promise.all(imagesToDelete.map((image) => deleteImage(image)));

    //새로 등록되는 블로그 데이터
    const blogData: IBlog = {
      title,
      blogTags,
      category,
      content,
      createdAt: Date.now(),
      thumbnail: uploadedImages,
      writer: {
        uid: user?.uid!,
        displayName: user?.displayName!,
        photoURL: user?.photoURL!,
        email: user?.email!,
      },
    };

    //업데이트되는 블로그 데이터
    //최초 등록된 날짜는 수정한다고 해도 업데이트 되지 않음
    const updateBlogData = {
      id: id || '',
      updateData: {
        title,
        blogTags,
        category,
        content,
        thumbnail: uploadedImages,
      },
    };

    if (id) {
      // 아이디가 존재한다면 등록이 아닌 업데이트
      updateBlogMutation.mutate(updateBlogData, {
        onSuccess: () => {
          alert('수정 되었습니다');
          navigate('/blog');
        },
      });
      return;
    }

    //아이디가 존재하지 않는다면 새 블로그 등록
    addBlogMutation.mutate(blogData, {
      onSuccess: () => {
        alert('등록 되었습니다');
        navigate('/blog');
      },
    });
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
              onChange={(e) => setState({ ...state, title: e.target.value })}
            />
          </label>
          <label>
            <span>태그</span>
            <Tags
              tags={blogTags}
              setTags={(tags) => setState({ ...state, blogTags: tags })}
              placeholder='태그를 입력하세요(스페이스,엔터로 입력가능)'
            />
          </label>
          <label>
            <span>카테고리</span>
            <select
              onChange={(e) => setState({ ...state, category: e.target.value })}
              value={category}
            >
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
              onChange={(content) => setState({ ...state, content })}
              ref={quillRef}
            />
          </div>
          <div className='blog_add_btns'>
            <Button filled type='submit'>
              {id ? '수정' : '등록'}
            </Button>
            <Button type='button'>취소</Button>
          </div>
        </form>
      </>
    </SubLayout>
  );
}

//에디터에 있는 이미지 URL 추출
const imageUrlsFromContent = (content: any) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = content;
  const imgElements = tempElement.getElementsByTagName('img');
  const imageUrls = Array.from(imgElements).map((img) => img.src);
  return imageUrls;
};
