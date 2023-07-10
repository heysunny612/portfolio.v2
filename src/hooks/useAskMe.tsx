import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  addQuestion,
  deleteQuestion,
  getQuestion,
  updateQuestion,
} from '../api/firebase/askMe';
import { IUpdateData } from '../interfaces/AskMe';

const CACHE_NAME = 'questions';

export default function useAskMe() {
  const queryClient = useQueryClient();

  const questionsQuery = useQuery([CACHE_NAME], getQuestion, {
    staleTime: 1000 * 6 * 10,
  });

  const addQuestionMutation = useMutation(addQuestion, {
    onSuccess: () => queryClient.invalidateQueries([CACHE_NAME]),
  });

  const updateQuestionMutation = useMutation(
    ({ id, updateData }: IUpdateData) => updateQuestion(id, updateData),
    {
      onSuccess: () => queryClient.invalidateQueries([CACHE_NAME]),
    }
  );

  const deleteQuestionMutation = useMutation(deleteQuestion, {
    onSuccess: () => queryClient.invalidateQueries([CACHE_NAME]),
  });

  return {
    questionsQuery,
    addQuestionMutation,
    updateQuestionMutation,
    deleteQuestionMutation,
  };
}
