import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

const API_URL = import.meta.env.VITE_API_URL;

const useAuthMutation = () => {
  const navigate = useNavigate({
    from: '/login',
  });

  const { toast } = useToast();

  const getProfile = () => {
    console.log('get profile user');
  };

  const login = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await axios.post<{
        data: { accessToken: string; refreshToken: string };
      }>(`${API_URL}/auth/login`, {
        email,
        password,
      });
    },
    onSuccess(data, variables, context) {
      console.log('🚀 ~ onSuccess ~ context:', context);
      console.log('🚀 ~ onSuccess ~ variables:', variables);
      localStorage.setItem('accessToken', data.data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.data.refreshToken);
      navigate({
        to: '/dashboard',
      });

      toast({
        title: 'Success',
        description: 'Login successfully',
        type: 'background',
      });
    },

    onError(error, variables, context) {
      console.log('🚀 ~ onError ~ context:', context);
      console.log('🚀 ~ onError ~ variables:', variables);
      console.log('🚀 ~ onError ~ error:', error);

      toast({
        title: 'Error',
        description: 'Login failed',
        type: 'background',
      });
    },
  });

  const logout = () => {
    console.log('logout user');
  };

  return { getProfile, login, logout };
};

export default useAuthMutation;
