import { useNavigate } from '@tanstack/react-router';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios-instance';

const API_URL = import.meta.env.VITE_API_URL;

const fetchDataLogin = async ({ email, password }: Login) => {
  const { data } = await axios.post<{
    data: LoginResponse;
  }>(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return data.data;
};

export const useAuthMutation = () => {
  const navigate = useNavigate({
    from: '/login',
  });
  const { toast } = useToast();

  const login = useMutation({
    mutationFn: fetchDataLogin,
    onSuccess(data) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      navigate({
        to: '/dashboard',
      });

      toast({
        title: 'Success',
        description: 'Login successfully',
        type: 'background',
      });
    },

    onError(error) {
      toast({
        title: 'Error',
        description: 'Login failed ' + error.message,
        type: 'background',
      });
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      const [accessToken, refreshToken] = [
        localStorage.getItem('accessToken'),
        localStorage.getItem('refreshToken'),
      ];

      return await axiosInstance.post(`${API_URL}/auth/logout`, {
        accessToken,
        refreshToken,
      });
    },

    onSuccess() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate({
        to: '/login',
      });
      toast({
        title: 'Success',
        description: 'Logout successfully',
        type: 'background',
      });
    },

    onError(error) {
      toast({
        title: 'Error',
        description: 'Logout failed ' + error.message,
        type: 'background',
      });
    },
  });

  return { login, logout };
};
