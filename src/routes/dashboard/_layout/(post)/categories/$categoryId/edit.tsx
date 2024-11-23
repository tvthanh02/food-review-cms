import { createFileRoute } from '@tanstack/react-router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CreateCategorySchema, CreateCategoryZod } from '../create';
import { zodResolver } from '@hookform/resolvers/zod';
import useCategoryMutation from '@/data/category/useCategoryMutation';
import { useEffect } from 'react';
import useCategory from '@/data/category/useCategory';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const Route = createFileRoute(
  '/dashboard/_layout/(post)/categories/$categoryId/edit'
)({
  component: UpdateCategoryPage,
});

function UpdateCategoryPage() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<CreateCategoryZod>({
    resolver: zodResolver(CreateCategorySchema),
  });

  const { categoryId } = Route.useParams();

  const { updateMutation } = useCategoryMutation();

  const { data: category } = useCategory(categoryId);

  useEffect(() => {
    setValue('name', category?.category_name ?? '');
    setValue('desciption', category?.description ?? '');

    setValue('status', category?.status === 'Active' ? true : false);
  }, [setValue, category]);

  const onSubmit: SubmitHandler<CreateCategoryZod> = (data) => {
    const status = data.status ? 'Active' : 'Inactive';

    updateMutation.mutate({
      _id: categoryId,
      category_name: data.name,
      status,
      description: data.desciption ?? '',
    });
  };

  if (!categoryId) return null;

  return (
    <div className='cus-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='w-[50rem] h-fit flex flex-col gap-5'>
          <div className='w-full flex flex-col gap-2'>
            <label className='font-bold' htmlFor='name'>
              Type Name
            </label>
            <Controller
              control={control}
              name='name'
              render={({ field }) => (
                <Input
                  id='name'
                  placeholder='Enter category name...'
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            {errors.name && (
              <span className='text-[1.3rem] text-red-600'>
                {errors.name.message}
              </span>
            )}
          </div>
          <div className='w-full flex flex-col gap-2'>
            <label className='font-bold' htmlFor='description'>
              Type Description
            </label>
            <Controller
              control={control}
              name='desciption'
              render={({ field }) => (
                <Textarea
                  value={field.value}
                  className='min-h-[15rem] resize-none'
                  id='desciption'
                  placeholder='Type desciption here...'
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className='w-full flex flex-col gap-2'>
            <label className='font-bold' htmlFor='status'>
              Status
            </label>
            <Controller
              control={control}
              name='status'
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={(value: boolean) => field.onChange(value)}
                />
              )}
            />
          </div>
          <div className='w-full flex justify-end items-center gap-5'>
            <Button type='button' variant='outline'>
              Cancel
            </Button>
            <Button type='submit'>Save</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
