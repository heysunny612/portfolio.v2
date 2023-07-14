import { useForm } from 'react-hook-form';
import Button from '../../components/Button/Button';
import Projects from '../../components/Projects/Projects';
import SubLayout from '../../components/UI/SubLayout';
import { useNavigate } from 'react-router-dom';
import usePortfolio from '../../hooks/usePortfolio';
import { skillIcons } from './skillIcons';
import { useUserContext } from '../../context/UserContext';

export default function Portfolio() {
  const navigate = useNavigate();
  const { register, watch, handleSubmit } = useForm();
  const { isLoading, error, data: projectList } = usePortfolio().portfolioQuery;
  const { user } = useUserContext() || {};

  const onSearch = (data: any) => {
    console.log(data);
  };
  return (
    <SubLayout className='portfolio_container' subTitle='portfolio'>
      <>
        <h3 className='common_h3'>Tech Tags</h3>
        <form className='tech_tags' onSubmit={handleSubmit(onSearch)}>
          <div className='tags'>
            {skillIcons.map(({ name, icon }, index) => {
              const skills = watch('skills') || [];
              const isChecked = skills.includes(name);
              return (
                <label key={index} className={isChecked ? 'checked' : ''}>
                  <input type='checkbox' {...register(`skills`)} value={name} />
                  <div>
                    {icon}
                    {name}
                  </div>
                </label>
              );
            })}
          </div>
          <div className='filter_btn'>
            <Button large filled type='submit'>
              Filter
            </Button>
          </div>
        </form>
        <h3 className='common_h3'>Projects</h3>
        {isLoading && <p>로딩중입니다</p>}
        {error && <p>Something is wrong 😥 Try Again</p>}
        {projectList && <Projects projectList={projectList} />}
        {user && user?.isAdmin && (
          <div className='btn_write'>
            <Button filled onClick={() => navigate('/portfolio/write')}>
              Write
            </Button>
          </div>
        )}
      </>
    </SubLayout>
  );
}
