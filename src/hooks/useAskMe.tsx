import { useQuery, useMutation, useQueryClient } from 'react-query';
import { addQuestion, getQuestion } from '../api/firebase/askMe';

export default function useAskMe() {
  const queryClient = useQueryClient();

  const questionsQuery = useQuery(['questions'], getQuestion);

  const addQuestionMutation = useMutation(addQuestion, {
    onSuccess: () => queryClient.invalidateQueries(['questions']),
  });

  return { questionsQuery, addQuestionMutation };
}
