import axiosInstance from '@/lib/axios-instance';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/key';
const API_URL = import.meta.env.VITE_API_URL;

const fetchSubAdmin = async (searchQuery: SearchParamsSubadmin) => {
  try {
    const { data } = await axiosInstance.get<{
      data: { data: User[] | null; meta: Meta };
    }>(`${API_URL}/user`, {
      params: {
        page: searchQuery.page,
        limit: searchQuery.limit,
        ...(searchQuery.email && { email: searchQuery.email }),
        ...(searchQuery.name && { user_name: searchQuery.name }),
        role: 'subadmin',
      },
    });

    return {
      data: data.data?.data ?? [],
      meta: data.data.meta,
    };
  } catch (error) {
    console.log(error);
  }
};

const useSubAdmin = (searchQuery: SearchParamsSubadmin) => {
  return useQuery({
    queryKey: [QUERY_KEY.SUBADMIN, searchQuery],
    queryFn: () => fetchSubAdmin(searchQuery),
  });
};

export default useSubAdmin;
