import { useQuery, useMutation, useQueryClient } from 'react-query';
import { IComment } from '../interfaces/Comments';
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from '../api/firebase/comments';

const CACHE_NAME = 'comment';

export default function useComment() {
  const queryClient = useQueryClient();

  const commentsQuery = useQuery<IComment[]>([CACHE_NAME], getComments, {
    staleTime: 1000 * 6 * 1,
  });

  const addCommentMutation = useMutation(addComment, {
    onSuccess: () => queryClient.invalidateQueries([CACHE_NAME]),
  });

  const updateCommentMutation = useMutation(
    ({ id, comment }: { id: string; comment: string }) =>
      updateComment(id, comment),
    {
      onSuccess: () => queryClient.invalidateQueries([CACHE_NAME]),
    }
  );

  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess: () => queryClient.invalidateQueries([CACHE_NAME]),
  });

  return {
    commentsQuery,
    addCommentMutation,
    updateCommentMutation,
    deleteCommentMutation,
  };
}
