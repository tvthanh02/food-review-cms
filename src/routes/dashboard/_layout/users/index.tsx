import PaginationDemo from '@/components/user/pagination';
import TableDemo from '@/components/user/table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/_layout/users/')({
  component: UserPage,
});

function UserPage() {
  return (
    <>
      <TableDemo />
      <div className='my-6'>
        <PaginationDemo />
      </div>
    </>
  );
}
