interface Category {
  _id: string;
  category_name: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface CategoryWithAction {
  _id: string;
  category_name: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleteFn: (id: string) => void;
}

interface SearchParamsCategory {
  page: number;
  limit: number;
  name?: string;
}

interface CreateCategory {
  category_name: string;
  description: string;
  status: 'Active' | 'Inactive';
}

interface UpdateCategory {
  _id: string;
  category_name: string;
  description: string;
  status: 'Active' | 'Inactive';
}
