interface SearchParamsSubadmin {
  page: string;
  limit: string;
  name?: string;
  email?: string;
}

interface Meta {
  total: number;
  currentPage: number;
  totalPages: number;
  limit: number;
}
