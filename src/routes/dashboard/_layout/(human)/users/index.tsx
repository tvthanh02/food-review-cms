import BreadcrumbCustom from '@/components/common/breadcrumb';
import TableDemo from '@/components/common/table';
import Loader from '@/components/ui/loader';
import { userColumns } from '@/components/user/columns';
import UserActions from '@/components/user/user-actions';
import useUsers from '@/data/user/useUsers';
import { Table } from '@medusajs/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createFileRoute('/dashboard/_layout/(human)/users/')({
  validateSearch: (search: SearchParamsUser) => {
    return {
      page: search.page ?? 1,
      limit: search.limit ?? 20,
    };
  },
  component: UserPage,
});

function UserPage() {
  const searchParams = Route.useSearch();

  const { data, isLoading, error } = useUsers(searchParams);

  const canPreviousPage = useMemo(() => {
    if (!data?.meta?.currentPage || !data?.meta?.totalPages) return false;
    return (
      1 < data?.meta?.currentPage &&
      data?.meta?.currentPage <= data?.meta?.totalPages
    );
  }, [data]);

  const canNextPage = useMemo(() => {
    if (!data?.meta?.currentPage || !data?.meta.totalPages) return false;
    return data?.meta.currentPage < data?.meta.totalPages;
  }, [data]);

  const handlePreviosPage = () => {};

  const handleNextPage = () => {};

  if (isLoading) return <Loader />;
  if (error) return <div>lỗi: {error.message}</div>;

  return (
    <div className='w-full h-auto flex flex-col gap-5'>
      <BreadcrumbCustom title='Users' path='/dashboard/users' />
      <UserActions />
      <div className='cus-container'>
        <TableDemo<User> columns={userColumns} data={data?.data ?? []} />
        <Table.Pagination
          className='text-[1.3rem] [&_button]:text-[1.2rem] space-y-3'
          count={data?.meta.total ?? 0}
          pageSize={Number(searchParams.limit ?? 0)}
          pageIndex={data?.meta.currentPage ? data.meta.currentPage - 1 : 0}
          pageCount={data?.meta.totalPages ?? 0}
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          previousPage={handlePreviosPage}
          nextPage={handleNextPage}
        />
      </div>
    </div>
  );
}
