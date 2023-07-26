import { useForm } from 'react-hook-form';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { skillIcons } from '../../data/skillIcons';
import { useUserContext } from '../../context/UserContext';
import { useEffect, useRef } from 'react';
import { AiOutlineFolder } from 'react-icons/ai';
import { FiGithub } from 'react-icons/fi';
import Button from '../../components/Button/Button';
import SubLayout from '../../components/UI/SubLayout';
import { toyProjects } from '../../data/toyProjects';

const MAX_COUNT = 3;
interface IFormData {
  skills: string[];
}

export default function Portfolio() {
  const { user } = useUserContext() || {};
  const navigate = useNavigate();
  const { register, watch, handleSubmit, reset, setValue } = useForm<IFormData>(
    { defaultValues: { skills: [] } }
  );
  const [searchParams] = useSearchParams();
  const paramSkills = searchParams.get('skills');
  const skiilsArray = paramSkills?.split(',');
  const selectedSkills = watch('skills') || [];
  const skillsLength = selectedSkills.length;
  const isSkillsOutOfRange = skillsLength > MAX_COUNT || skillsLength === 0;
  const projectRef = useRef<HTMLDivElement>(null);

  const onSearch = (data: IFormData) => {
    if (isSkillsOutOfRange) return;
    const skillsQueryParam = data.skills.join(',');
    navigate(`/portfolio/search?skills=${skillsQueryParam}`);

    if (projectRef.current) {
      const yOffset = -50;
      const y =
        projectRef?.current?.getBoundingClientRect()?.top +
        window.scrollY +
        yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    navigate('/portfolio');
    reset({ skills: [] });
  };

  //뒤로가기 눌렀을때, 이전에 검색한 필터유지
  useEffect(() => {
    skiilsArray ? setValue('skills', skiilsArray) : reset({ skills: [] });
  }, [paramSkills]);

  return (
    <SubLayout className='portfolio_container' subTitle='portfolio'>
      <>
        <h3 className='common_h3'>
          Tech Tags
          <span>
            최대 {MAX_COUNT}개까지 Tech Tag를 선택하여 검색할 수 있습니다!☺️
          </span>
        </h3>
        <p className='portfolio_filter_alert'>
          Number of skills selected :
          <span className={isSkillsOutOfRange ? 'alert' : ''}>
            {skillsLength}
          </span>
          / {MAX_COUNT}
        </p>
        <form className='tech_tags' onSubmit={handleSubmit(onSearch)}>
          <div className='tags'>
            {skillIcons.map(({ name, icon }, index) => {
              const isChecked = selectedSkills.includes(name);
              return (
                <label key={index} className={isChecked ? 'checked' : ''}>
                  <input
                    type='checkbox'
                    {...register('skills')}
                    value={name}
                    defaultChecked={isChecked}
                  />
                  <div>
                    {icon}
                    {name}
                  </div>
                </label>
              );
            })}
          </div>
          <div className='filter_btn'>
            <Button large filled type='submit' disabled={isSkillsOutOfRange}>
              Filter
            </Button>
            {selectedSkills.length > 0 && paramSkills && (
              <Button large type='button' onClick={handleReset}>
                Reset
              </Button>
            )}
          </div>
        </form>
        <div ref={projectRef}></div>
        <Outlet />
        {user?.isAdmin && (
          <div className='btn_write'>
            <Button filled onClick={() => navigate('/portfolio/write')}>
              Write
            </Button>
          </div>
        )}

        <h3 className='common_h3 mt80'>Toy Projects</h3>
        <ul className='toy_projects'>
          {toyProjects.map(({ title, desc, link }, index) => (
            <li key={index}>
              <a href={link} rel='noopener noreferrer' target='_blank'>
                <div className='top'>
                  <span className='folder'>
                    <AiOutlineFolder />
                  </span>
                  <span>
                    <FiGithub />
                  </span>
                </div>
                <div className='text'>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </>
    </SubLayout>
  );
}
