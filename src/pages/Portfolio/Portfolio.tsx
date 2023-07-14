import { useForm } from 'react-hook-form';
import Button from '../../components/Button/Button';
import Projects from '../../components/Projects/Projects';
import SubLayout from '../../components/UI/SubLayout';
import { useNavigate } from 'react-router-dom';
import usePortfolio from '../../hooks/usePortfolio';

const tags = [
  'Firebase',
  'React',
  'React-query',
  'SCSS',
  'Test1',
  'Test2',
  'Test3',
  'Test4',
  'Test5',
  'Test6',
  'Test7',
];

export default function Portfolio() {
  const navigate = useNavigate();
  const { register, watch, setValue } = useForm();
  const handleChange = (tag: string) => {
    const currentValue = watch(tag);
    setValue(tag, !currentValue);
  };
  const { isLoading, error, data: projectList } = usePortfolio().portfolioQuery;

  return (
    <SubLayout className='portfolio_container' subTitle='portfolio'>
      <>
        <h3 className='common_h3'>Tech Tags</h3>
        <form className='tech_tags'>
          <div className='tags'>
            {tags.map((tag, idx) => (
              <label key={idx} className={watch(tag) ? 'checked' : ''}>
                <input
                  type='checkbox'
                  {...register(tag)}
                  onChange={() => handleChange(tag)}
                />
                #{tag}
              </label>
            ))}
          </div>
          <div className='filter_btn'>
            <Button large filled>
              Filter
            </Button>
          </div>
        </form>
        <h3 className='common_h3'>Projects</h3>
        {isLoading && <p>로딩중입니다</p>}
        {error && <p>Something is wrong 😥 Try Again</p>}
        {projectList && <Projects projectList={projectList} />}
        <div className='btn_write'>
          <Button filled onClick={() => navigate('/portfolio/write')}>
            Write
          </Button>
        </div>
      </>
    </SubLayout>
  );
}
