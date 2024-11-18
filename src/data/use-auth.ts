import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios-instance';
import QUERY_KEY from '@/constants/key';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUser = async () => {
  const { data } = await axiosInstance.get<{ data: User }>(
    `${API_URL}/auth/profile`
  );
  return data.data;
};

export default function useAuth() {
  return useQuery({
    queryKey: [QUERY_KEY.PROFILE],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 20,
    refetchOnWindowFocus: false,
  });
}
