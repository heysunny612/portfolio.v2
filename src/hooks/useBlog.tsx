import { useQuery, useMutation, useQueryClient } from 'react-query';
import { IUpdateData } from '../interfaces/AskMe';
import {
  addBlog,
  deleteBlogItem,
  getblogItems,
  updateBlogItem,
} from '../api/firebase/blog';

const CACHE_NAME = 'blog';

export default function useBlog() {
  const queryClient = useQueryClient();

  const blogQuery = useQuery([CACHE_NAME], getblogItems, {
    staleTime: 1000 * 6 * 5,
  });

  const addBlogMutation = useMutation(addBlog, {
    onSuccess: () => queryClient.invalidateQueries([CACHE_NAME]),
  });

  const updateBlogMutation = useMutation(
    ({ id, updateData }: IUpdateData) => updateBlogItem(id, updateData),
    {
      onSuccess: () => queryClient.invalidateQueries([CACHE_NAME]),
    }
  );

  const deleteblogMutation = useMutation(deleteBlogItem, {
    onSuccess: () => queryClient.invalidateQueries([CACHE_NAME]),
  });

  return {
    blogQuery,
    addBlogMutation,
    updateBlogMutation,
    deleteblogMutation,
  };
}
