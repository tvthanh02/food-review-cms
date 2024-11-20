import SubAdminActions from '@/components/sub-admin/sub-admin-actions';
import { createFileRoute } from '@tanstack/react-router';
import useSubAdmin from '@/data/sub-admin/use-sub-admin';
import { subAdminColumns } from '@/components/sub-admin/columns';
import TableDemo from '@/components/layout/table';
import { Table } from '@medusajs/ui';
import useSubAdminLogic from '@/hooks/use-sub-admin-logic';
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

  const { pagination } = useSubAdminLogic(data?.meta);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>lỗi: {error.message}</div>;

  return (
    <div className='w-full h-auto flex flex-col gap-7'>
      <SubAdminActions />
      <div className='cus-container'>
        <TableDemo<User> columns={subAdminColumns} data={data?.data ?? []} />
        <Table.Pagination
          className='text-[1.3rem] [&_button]:text-[1.2rem] space-y-3'
          count={pagination?.count ?? 0}
          pageSize={pagination?.pageSize ?? 0}
          pageIndex={pagination?.pageIndex ?? 0}
          pageCount={pagination?.pageCount ?? 0}
          canPreviousPage={pagination?.canPreviousPage ?? false}
          canNextPage={pagination?.canNextPage ?? false}
          previousPage={pagination?.previousPage}
          nextPage={pagination?.nextPage}
        />
      </div>
    </div>
  );
}
