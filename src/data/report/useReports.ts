import axiosInstance from '@/lib/axios-instance';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/key';
const API_URL = import.meta.env.VITE_API_URL;

const fetchReports = async (searchQuery: SearchParamsReport) => {
  try {
    const { data } = await axiosInstance.get<{
      data: { data: Report[] | null; meta: Meta };
    }>(`${API_URL}/report`, {
      params: {
        page: searchQuery.page,
        limit: searchQuery.limit,
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

const useReports = (searchQuery: SearchParamsSubadmin) => {
  return useQuery({
    queryKey: [QUERY_KEY.REPORTS, searchQuery],
    queryFn: () => fetchReports(searchQuery),
  });
};

export default useReports;
