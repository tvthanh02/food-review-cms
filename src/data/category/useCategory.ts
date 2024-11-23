import axiosInstance from '@/lib/axios-instance';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/key';

const API_URL = import.meta.env.VITE_API_URL;

const fetchCategoryDetail = async (id: string) => {
  try {
    const { data } = await axiosInstance.get<{ data: Category }>(
      `${API_URL}/category/${id}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useCategory = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CATEGORY_DETAIL, id],
    queryFn: () => fetchCategoryDetail(id),
  });
};

export default useCategory;
