import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  addReply,
  deleteReply,
  getReply,
  updateReply,
} from '../api/firebase/reply';
import { IReply } from '../interfaces/Reply';

const CACHE_NAME = 'reply';

export default function useReply() {
  const queryClient = useQueryClient();

  const replyQuery = useQuery<IReply[]>([CACHE_NAME], getReply, {
    staleTime: 1000 * 6 * 1,
  });

  const addReplyMutation = useMutation(addReply, {
    onSuccess: () => queryClient.invalidateQueries([CACHE_NAME]),
  });

  const updateReplyMutation = useMutation(
    ({ id, reply }: { id: string; reply: string }) => updateReply(id, reply),
    {
      onSuccess: () => queryClient.invalidateQueries([CACHE_NAME]),
    }
  );

  const deleteReplyMutation = useMutation(deleteReply, {
    onSuccess: () => queryClient.invalidateQueries([CACHE_NAME]),
  });

  return {
    replyQuery,
    addReplyMutation,
    updateReplyMutation,
    deleteReplyMutation,
  };
}
