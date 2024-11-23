interface SearchParamsSubadmin {
  page: number;
  limit: number;
  name?: string;
  email?: string;
}

interface Meta {
  total: number;
  currentPage: number;
  totalPages: number;
  limit: number;
}
