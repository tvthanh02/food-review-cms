interface Post {
  _id: string;
  position: string;
  food_name: string;
  user_id: {
    _id: string;
    user_name: string;
    avatar: string;
  };
  province: string;
  maps: {
    latitude: 0;
    longitude: 0;
  };
  description: string;
  thumbnail: string;
  images: string[];
  videos: string[];
  hashtags: string;
  status: string;
  categories: string[];
  created_at: string;
  updated_at: string;
}

interface PostWithAction {
  _id: string;
  position: string;
  food_name: string;
  user_id: {
    _id: string;
    user_name: string;
    avatar: string;
  };
  province: string;
  maps: {
    latitude: 0;
    longitude: 0;
  };
  description: string;
  thumbnail: string;
  images: string[];
  videos: string[];
  hashtags: string;
  status: string;
  categories: string[];
  acceptFn: (id: string) => void;
  rejectFn: (id: string) => void;
  created_at: string;
  updated_at: string;
}

interface SearchParamsPost {
  page: number;
  limit: number;
  status?: string[];
  category?: string;
}
