import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isFreshing = false;
const blockedRequestsQueue: {
  resolve: (value: string) => void;
  reject: (reason: unknown) => void;
}[] = [];

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (reponse) => reponse,
  async (error) => {
    const requestOriginal = error.config;
    if (error?.response.status === 401) {
      if (isFreshing) {
        try {
          const accessToken = await new Promise<string>((resolve, reject) => {
            blockedRequestsQueue.push({ resolve, reject });
          });

          requestOriginal.headers.Authorization = `Bearer ${accessToken}`;

          return axios(requestOriginal);
        } catch (error) {
          return Promise.reject(error);
        }
      }

      isFreshing = true;

      try {
        const { data } = await axios.post<{ data: { accessToken: string } }>(
          `${API_URL}/auth/refresh-token`,
          {
            refreshToken: localStorage.getItem('refreshToken'),
          }
        );

        const accessToken = data.data.accessToken;

        localStorage.setItem('accessToken', accessToken);
        requestOriginal.headers.Authorization = `Bearer ${accessToken}`;
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        blockedRequestsQueue.forEach((request) => {
          request.resolve(accessToken);
        });
        blockedRequestsQueue.length = 0;

        return axios(requestOriginal);
      } catch (error) {
        blockedRequestsQueue.forEach((request) => {
          request.reject(error);
        });
        blockedRequestsQueue.length = 0;
        return Promise.reject(error);
      } finally {
        isFreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
