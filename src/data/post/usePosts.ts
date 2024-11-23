import axiosInstance from '@/lib/axios-instance';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/key';
const API_URL = import.meta.env.VITE_API_URL;

const fetchPosts = async (searchQuery: SearchParamsPost) => {
  try {
    const { data } = await axiosInstance.get<{
      data: Post[];
      meta: Meta;
    }>(`${API_URL}/post`, {
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

const usePosts = (searchQuery: SearchParamsPost) => {
  return useQuery({
    queryKey: [QUERY_KEY.POSTS, searchQuery],
    queryFn: () => fetchPosts(searchQuery),
  });
};

export default usePosts;
