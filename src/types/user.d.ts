interface User {
  _id: string;
  email: string;
  avatar: string;
  user_name: string;
  social_links: string[];
  role: string;
  bio: string;
  isLock: boolean;
  created_at: string;
  subadmin_status: 'Pending' | 'Active' | 'Rejected' | 'Suspended';
}

interface SearchParamsUser {
  page: number;
  limit: number;
  name?: string;
  email?: string;
}
