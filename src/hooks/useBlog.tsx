import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  addQuestion,
  deleteQuestion,
  updateQuestion,
} from '../api/firebase/askMe';
import { IUpdateData } from '../interfaces/AskMe';
import { getblogItems } from '../api/firebase/blog';

const CACHE_NAME = 'blog';

export default function useBlog() {
  const queryClient = useQueryClient();

  const blogQuery = useQuery([CACHE_NAME], getblogItems, {
    staleTime: 1000,
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
    blogQuery,
    addQuestionMutation,
    updateQuestionMutation,
    deleteQuestionMutation,
  };
}
