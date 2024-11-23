import axiosInstance from '@/lib/axios-instance';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/key';

const API_URL = import.meta.env.VITE_API_URL;

const fetchReportTypeDetail = async (id: string) => {
  try {
    const { data } = await axiosInstance.get<{ data: ReportType }>(
      `${API_URL}/report-type/${id}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useReportTypeDetail = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.REPORT_TYPE_DETAIL, id],
    queryFn: () => fetchReportTypeDetail(id),
  });
};

export default useReportTypeDetail;
