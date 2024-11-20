import SubAdminActions from '@/components/sub-admin/sub-admin-actions';
import { createFileRoute } from '@tanstack/react-router';
import useSubAdmin from '@/data/sub-admin/useSubAmin';
import { subAdminColumns } from '@/components/sub-admin/columns';
import TableDemo from '@/components/common/table';
import { Table } from '@medusajs/ui';
import { useMemo } from 'react';
export const Route = createFileRoute('/dashboard/_layout/(human)/sub-admins/')({
  validateSearch: (search: SearchParamsSubadmin) => {
    return {
      page: search.page ?? 1,
      limit: search.limit ?? 20,
    };
  },
  component: SubAdminPage,
});

function SubAdminPage() {
  const searchParams = Route.useSearch();

  const { data, isLoading, error } = useSubAdmin(searchParams);

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>lỗi: {error.message}</div>;

  return (
    <div className='w-full h-auto flex flex-col gap-7'>
      <SubAdminActions />
      <div className='cus-container'>
        <TableDemo<User> columns={subAdminColumns} data={data?.data ?? []} />
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
