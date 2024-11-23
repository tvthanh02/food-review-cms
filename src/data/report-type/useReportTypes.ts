import axiosInstance from '@/lib/axios-instance';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/key';
const API_URL = import.meta.env.VITE_API_URL;

const fetchReportTypes = async (searchQuery: SearchParamsReportType) => {
  try {
    const { data } = await axiosInstance.get<{
      data: ReportType[];
      meta: Meta;
    }>(`${API_URL}/report-type`, {
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
  }
};

const useReportTypes = (searchQuery: SearchParamsReportType) => {
  return useQuery({
    queryKey: [QUERY_KEY.REPORT_TYPES, searchQuery],
    queryFn: () => fetchReportTypes(searchQuery),
  });
};

export default useReportTypes;
