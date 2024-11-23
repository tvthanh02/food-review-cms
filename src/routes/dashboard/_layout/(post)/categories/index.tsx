import CategoryAction from '@/components/category/category-actions';
import { categoryColumns } from '@/components/category/columns';
import BreadcrumbCustom from '@/components/common/breadcrumb';
import TableDemo from '@/components/common/table';
import Loader from '@/components/ui/loader';
import useCategories from '@/data/category/useCategories';
import useCategoryMutation from '@/data/category/useCategoryMutation';
import useDialog from '@/hooks/useDialog';
import { Table } from '@medusajs/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createFileRoute('/dashboard/_layout/(post)/categories/')({
  validateSearch: (search: SearchParamsCategory) => {
    return {
      page: search.page ?? 1,
      limit: search.limit ?? 20,
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { RootDialog, setDialog, toggleDialog } = useDialog();

  const { deleteMutation } = useCategoryMutation();

  const searchParams = Route.useSearch();

  const { data, isLoading, error } = useCategories(searchParams);

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

  const handleDelete = (id: string) => {
    setDialog({
      title: 'Are you sure?',
      description:
        'This action cannot be undone. Do you want to delete this item?',
      onCancel: toggleDialog,
      onConfirm: () => {
        deleteMutation.mutate(id);
      },
    });
  };

  const listCategories: CategoryWithAction[] =
    data?.data.map((report) => ({
      ...report,
      deleteFn: (id: string) => handleDelete(id),
    })) ?? [];

  return (
    <div className='w-full h-auto flex flex-col gap-5'>
      <RootDialog />
      <BreadcrumbCustom title='Categories' path='/dashboard/categories' />
      <CategoryAction />
      <div className='cus-container'>
        <TableDemo<CategoryWithAction>
          columns={categoryColumns}
          data={listCategories}
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
