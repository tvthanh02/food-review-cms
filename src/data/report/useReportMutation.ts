import axiosInstance from '@/lib/axios-instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/useToast';
import QUERY_KEY from '@/constants/key';
const API_URL = import.meta.env.VITE_API_URL;

const updateStatusReport = async ({ id, status }: UpdateStatusReport) => {
  try {
    await axiosInstance.patch(`${API_URL}/report/${id}/status`, { status });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useReportMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: updateStatusReport,
    onSuccess: async (_, variables) => {
      toast({
        title: 'Success',
        description: `${variables.status} Successfully!`,
        type: 'background',
      });

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.REPORTS],
      });
    },
    onError: (_, variables) => {
      toast({
        title: 'Error',
        description: `${variables.status} Failure!`,
        type: 'background',
      });
    },
  });

  return { updateStatusMutation };
};

export default useReportMutation;
