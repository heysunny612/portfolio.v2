import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  addPortfolio,
  deletePortfolio,
  getPortfolios,
  updatePortfolio,
} from '../api/firebase/portfolio';
import { IPortfolio } from '../interfaces/Portfolio';

const CACHE_NAME = 'portfolio';

export default function usePortfolio() {
  const queryClient = useQueryClient();

  const portfolioQuery = useQuery<IPortfolio[]>([CACHE_NAME], getPortfolios, {
    staleTime: 1000 * 6 * 15, //빈번한 업데이트 발생하지 않아 15분설정
  });

  const addPortfolioMutation = useMutation(addPortfolio, {
    onSuccess: () => queryClient.invalidateQueries([CACHE_NAME]),
  });

  const updateBlogMutation = useMutation(
    ({ id, updateData }: { id: string; updateData: IPortfolio }) =>
      updatePortfolio(id, updateData),
    {
      onSuccess: () => queryClient.invalidateQueries([CACHE_NAME]),
    }
  );

  const deletePortfolioMutation = useMutation(deletePortfolio, {
    onSuccess: () => queryClient.invalidateQueries([CACHE_NAME]),
  });

  return {
    portfolioQuery,
    addPortfolioMutation,
    updateBlogMutation,
    deletePortfolioMutation,
  };
}
