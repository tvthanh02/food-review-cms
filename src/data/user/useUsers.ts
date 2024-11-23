import axiosInstance from '@/lib/axios-instance';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/key';
const API_URL = import.meta.env.VITE_API_URL;

const fetchUsers = async (searchQuery: SearchParamsUser) => {
  try {
    const { data } = await axiosInstance.get<{
      data: User[];
      meta: Meta;
    }>(`${API_URL}/user`, {
      params: {
        page: searchQuery.page,
        limit: searchQuery.limit,
        ...(searchQuery.email && { email: searchQuery.email }),
        ...(searchQuery.name && { user_name: searchQuery.name }),
        role: 'user',
      },
    });

    return {
      data: data.data,
      meta: data.meta,
    };
  } catch (error) {
    console.log(error);
  }
};

const useUsers = (searchQuery: SearchParamsUser) => {
  return useQuery({
    queryKey: [QUERY_KEY.USERS, searchQuery],
    queryFn: () => fetchUsers(searchQuery),
  });
};

export default useUsers;
