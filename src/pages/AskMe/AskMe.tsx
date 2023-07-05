import QnA from '../../components/QnA/QnA';
import SubLayout from '../../components/UI/SubLayout';

export default function AskMe() {
  return (
    <>
      <SubLayout className='qna_container' subTitle='ask me'>
        <h3 className='common_h3'>
          Ask me <span>무엇이든 편하게 질문주세요 ☺️</span>
        </h3>
        <QnA />
      </SubLayout>
    </>
  );
}
