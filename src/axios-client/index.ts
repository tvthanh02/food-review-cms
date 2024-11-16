import axios from 'axios';

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

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axios.interceptors.response.use(
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
        const {
          data: { accessToken, refreshToken },
        } = await axios.post<{ accessToken: string; refreshToken: string }>(
          '/auth/refresh-token',
          {
            refreshToken: localStorage.getItem('refreshToken'),
          }
        );

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
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
