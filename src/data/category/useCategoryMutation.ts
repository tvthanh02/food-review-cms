import axiosInstance from '@/lib/axios-instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/key';
const API_URL = import.meta.env.VITE_API_URL;
import { useToast } from '@/hooks/useToast';
import { useNavigate } from '@tanstack/react-router';

const createCategory = async ({
  category_name,
  status,
  description = '',
}: CreateCategory) => {
  try {
    await axiosInstance.post(`${API_URL}/category/create`, {
      category_name,
      status,
      description,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateCategory = async ({
  _id,
  category_name,
  status,
  description,
}: UpdateCategory) => {
  const dataUpdate = {
    category_name,
    status,
    description,
  };

  Object.entries(dataUpdate).forEach(([key, value]) => {
    if (!value)
      delete dataUpdate[key as keyof { category_name: string; status: string }];
  });

  try {
    await axiosInstance.patch(`${API_URL}/category/${_id}/update`, {
      ...dataUpdate,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteCategory = async (CategoryId: string) => {
  try {
    await axiosInstance.delete(`${API_URL}/category/${CategoryId}/delete`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useCategoryMutation = () => {
  const { toast } = useToast();
  const navigate = useNavigate({
    from: '/dashboard/categories/create',
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CATEGORIES],
      });

      await navigate({
        to: '/dashboard/categories',
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
    mutationFn: updateCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CATEGORIES],
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
    mutationFn: deleteCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CATEGORIES],
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

export default useCategoryMutation;
