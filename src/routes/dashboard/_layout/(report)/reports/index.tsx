import TableExample from '@/components/example/table-demo';
import ReportActions from '@/components/report/report-actions';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/_layout/(report)/reports/')({
  component: ReportPage,
});

function ReportPage() {
  return (
    <div className='w-full h-auto flex flex-col gap-7'>
      <ReportActions />
      <div className='cus-container'>
        <TableExample />
        {/* <Table.Pagination
          className='text-[1.3rem] [&_button]:text-[1.2rem] space-y-3'
          count={pagination?.count ?? 0}
          pageSize={pagination?.pageSize ?? 0}
          pageIndex={pagination?.pageIndex ?? 0}
          pageCount={pagination?.pageCount ?? 0}
          canPreviousPage={pagination?.canPreviousPage ?? false}
          canNextPage={pagination?.canNextPage ?? false}
          previousPage={pagination?.previousPage}
          nextPage={pagination?.nextPage}
        /> */}
      </div>
    </div>
  );
}
