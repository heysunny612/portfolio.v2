import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  addQuestion,
  deleteQuestion,
  getQuestion,
  updateQuestion,
} from '../api/firebase/askMe';
import { IAnswer } from '../interfaces/AskMe';

export default function useAskMe() {
  const queryClient = useQueryClient();

  const questionsQuery = useQuery(['questions'], getQuestion, {
    staleTime: 1000 * 6 * 10,
  });

  const addQuestionMutation = useMutation(addQuestion, {
    onSuccess: () => queryClient.invalidateQueries(['questions']),
  });

  const updateQuestionMutation = useMutation(
    ({ id, answer }: { id: string; answer: IAnswer }) =>
      updateQuestion(id, answer),
    {
      onSuccess: () => queryClient.invalidateQueries(['questions']),
    }
  );

  const deleteQuestionMutation = useMutation(deleteQuestion, {
    onSuccess: () => queryClient.invalidateQueries(['questions']),
  });

  return {
    questionsQuery,
    addQuestionMutation,
    updateQuestionMutation,
    deleteQuestionMutation,
  };
}
