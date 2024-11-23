import axiosInstance from '@/lib/axios-instance';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/key';
const API_URL = import.meta.env.VITE_API_URL;

const fetchCategories = async (searchQuery: SearchParamsCategory) => {
  try {
    const { data } = await axiosInstance.get<{
      data: Category[];
      meta: Meta;
    }>(`${API_URL}/category`, {
      params: {
        ...searchQuery,
      },
    });

    return {
      data: data.data,
      meta: data.meta,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useCategories = (searchQuery: SearchParamsCategory) => {
  return useQuery({
    queryKey: [QUERY_KEY.CATEGORIES, searchQuery],
    queryFn: () => fetchCategories(searchQuery),
  });
};

export default useCategories;
