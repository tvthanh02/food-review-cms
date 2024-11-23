import axiosInstance from '@/lib/axios-instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/key';
const API_URL = import.meta.env.VITE_API_URL;
import { useToast } from '@/hooks/useToast';
import { useNavigate } from '@tanstack/react-router';

const createReportType = async ({ name, status }: CreateReportType) => {
  try {
    await axiosInstance.post(`${API_URL}/report-type/create`, {
      name,
      status,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateReportType = async ({ _id, name, status }: ReportType) => {
  const dataUpdate = {
    name,
    status,
  };

  Object.entries(dataUpdate).forEach(([key, value]) => {
    if (!value)
      delete dataUpdate[key as keyof { name: string; status: string }];
  });

  try {
    await axiosInstance.patch(`${API_URL}/report-type/${_id}/update`, {
      ...dataUpdate,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteReportType = async (reportTypeId: string) => {
  try {
    await axiosInstance.delete(`${API_URL}/report-type/${reportTypeId}/delete`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useReportTypeMutation = () => {
  const { toast } = useToast();
  const navigate = useNavigate({
    from: '/dashboard/report-types/create',
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createReportType,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.REPORT_TYPES],
      });

      await navigate({
        to: '/dashboard/report-types',
        search: {
          page: 1,
          limit: 20,
        },
      });
      toast({
        title: 'Success',
        description: 'Create Successfully!',
        type: 'background',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failure',
        description: error.message,
        type: 'background',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateReportType,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.REPORT_TYPES],
      });

      toast({
        title: 'Success',
        description: 'Update Successfully!',
        type: 'background',
      });
    },
    onError: () => {
      toast({
        title: 'Failure',
        description: 'Update failure!',
        type: 'background',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteReportType,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.REPORT_TYPES],
      });

      toast({
        title: 'Success',
        description: 'Delete Successfully!',
        type: 'background',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failure',
        description: error.message,
        type: 'background',
      });
    },
  });

  return { createMutation, updateMutation, deleteMutation };
};

export default useReportTypeMutation;
