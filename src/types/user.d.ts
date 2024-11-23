interface User {
  _id: string;
  email: string;
  avatar: string;
  user_name: string;
  social_links: string[];
  role: string;
  bio: string;
  createdAt: string;
}

interface SearchParamsUser {
  page: number;
  limit: number;
  name?: string;
  email?: string;
}
