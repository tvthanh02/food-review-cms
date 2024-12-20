import BreadcrumbCustom from '@/components/common/breadcrumb';
import TableDemo from '@/components/common/table';
import { reportColumns } from '@/components/report/columns';
import ReportActions from '@/components/report/report-actions';
import Loader from '@/components/ui/loader';
import useReportMutation from '@/data/report/useReportMutation';
import useReports from '@/data/report/useReports';
import { Table } from '@medusajs/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createFileRoute('/dashboard/_layout/(report)/reports/')({
  validateSearch: (search: SearchParamsReport) => {
    return {
      page: search.page ?? 1,
      limit: search.limit ?? 20,
    };
  },
  component: ReportPage,
});

function ReportPage() {
  const searchParams = Route.useSearch();

  const { data, isLoading, error } = useReports(searchParams);

  const { updateStatusMutation } = useReportMutation();

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

  if (isLoading) return <Loader />;
  if (error) return <div>lỗi: {error.message}</div>;

  const handlePreviosPage = () => {};

  const handleNextPage = () => {};

  const handleApprove = (id: string) => {
    updateStatusMutation.mutate({ id, status: 'Resolved' });
  };

  const handleClose = (id: string) => {
    updateStatusMutation.mutate({ id, status: 'Closed' });
  };

  const dataReportsWithAction = data?.data.map((report) => ({
    ...report,
    approveFn: handleApprove,
    closeFn: handleClose,
  }));

  return (
    <div className='w-full h-auto flex flex-col gap-5'>
      <BreadcrumbCustom title='Reports' path='/dashboard/reports' />
      <ReportActions />
      <div className='cus-container'>
        <TableDemo<ReportWithAction>
          columns={reportColumns}
          data={dataReportsWithAction ?? []}
        />
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
