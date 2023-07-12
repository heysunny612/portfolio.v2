import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  addBlog,
  deleteBlogItem,
  getblogItems,
  updateBlogItem,
} from '../api/firebase/blog';
import { IUpdateBlog } from '../interfaces/Blog';

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
    ({ id, updateData }: IUpdateBlog) => updateBlogItem(id, updateData),
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
