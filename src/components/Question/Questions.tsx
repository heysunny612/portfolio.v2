import { IAskMe } from '../../interfaces/AskMe';
import QuestionCard from './QuestionCard';
interface IQuestionsProps {
  keyword?: string;
  questions: IAskMe[];
  filtered?: IAskMe[];
  loadCount?: number;
  animation?: boolean;
}

export default function Questions({
  keyword,
  questions,
  filtered,
  loadCount,
  animation,
}: IQuestionsProps) {
  console.log(loadCount);

  return (
    <ul className='qna_list'>
      {!keyword
        ? questions
            .slice(0, loadCount)
            .map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                animation={animation}
              />
            ))
        : filtered!.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
    </ul>
  );
}
