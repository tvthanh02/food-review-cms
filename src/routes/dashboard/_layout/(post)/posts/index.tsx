import BreadcrumbCustom from '@/components/common/breadcrumb';
import TableDemo from '@/components/common/table';
import { postColumns } from '@/components/post/columns';
import PostAction from '@/components/post/post-actions';
import Loader from '@/components/ui/loader';
import usePosts from '@/data/post/usePosts';
import { Table } from '@medusajs/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createFileRoute('/dashboard/_layout/(post)/posts/')({
  validateSearch: (search: SearchParamsPost) => {
    return {
      page: search.page ?? 1,
      limit: search.limit ?? 20,
    };
  },
  component: PostPage,
});

function PostPage() {
  const searchParams = Route.useSearch();

  const { data, isLoading, error } = usePosts(searchParams);

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

  const listposts: PostWithAction[] = useMemo(() => {
    return (
      data?.data.map((report) => ({
        ...report,
        acceptFn: () => {},
        rejectFn: () => {},
      })) ?? []
    );
  }, [data]);

  if (isLoading) return <Loader />;
  if (error) return <div>lỗi: {error.message}</div>;

  const handlePreviosPage = () => {};

  const handleNextPage = () => {};

  return (
    <div className='w-full h-auto flex flex-col gap-5'>
      <BreadcrumbCustom title='Posts' path='/dashboard/posts' />
      <PostAction />
      <div className='cus-container'>
        <TableDemo<PostWithAction> columns={postColumns} data={listposts} />
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
