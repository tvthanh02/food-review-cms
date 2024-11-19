import { getRouteApi } from '@tanstack/react-router';

interface Pagination {
  count: number;
  pageSize: number;
  pageIndex: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => Promise<void>;
  nextPage: () => Promise<void>;
}

const useSubAdminLogic = (meta: Meta | undefined) => {
  const Route = getRouteApi('/dashboard/_layout/sub-admins/');

  const navigate = Route.useNavigate();

  const pagination: Pagination = {
    count: 0,
    pageSize: 10,
    pageIndex: 0,
    pageCount: 0,
    canPreviousPage: false,
    canNextPage: false,
    previousPage: async () => {
      console.log('Previous page');
    },
    nextPage: async () => {
      console.log('Next page');
    },
  };

  if (meta) {
    const { total, currentPage, totalPages, limit = 20 } = meta;
    pagination.count = total;
    pagination.pageSize = limit;
    pagination.pageIndex = currentPage - 1;
    pagination.pageCount = totalPages;
    pagination.canPreviousPage = 1 < currentPage && currentPage <= totalPages;
    pagination.canNextPage = currentPage < totalPages;
    pagination.previousPage = async () => {
      await navigate({
        search: (preSearch) => ({
          ...preSearch,
          page: currentPage - 1 + '',
        }),
      });
    };
    pagination.nextPage = async () => {
      await navigate({
        search: (preSearch) => ({
          ...preSearch,
          page: currentPage + 1 + '',
        }),
      });
    };
  }

  return { pagination };
};

export default useSubAdminLogic;
