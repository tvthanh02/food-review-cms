import BreadcrumbCustom from '@/components/common/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import useCategoryMutation from '@/data/category/useCategoryMutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export const Route = createFileRoute(
  '/dashboard/_layout/(post)/categories/create'
)({
  component: CreateCategoryPage,
});

export const CreateCategorySchema = z.object({
  name: z.string({
    message: 'Name is required',
  }),
  desciption: z.string().optional(),
  status: z.boolean().default(false),
});

export type CreateCategoryZod = z.infer<typeof CreateCategorySchema>;

function CreateCategoryPage() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateCategoryZod>({
    resolver: zodResolver(CreateCategorySchema),
  });

  const { createMutation } = useCategoryMutation();

  const onSubmit: SubmitHandler<CreateCategoryZod> = (data) => {
    const status = data.status ? 'Active' : 'Inactive';

    createMutation.mutate({
      category_name: data.name,
      status,
      description: data.desciption ?? '',
    });
  };

  return (
    <div className='w-full h-auto flex flex-col gap-5'>
      <BreadcrumbCustom
        title='Create Category'
        path='/dashboard/categories/create'
      />
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
                    placeholder='Type name here...'
                    onChange={field.onChange}
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
                    onCheckedChange={(value: boolean) => field.onChange(value)}
                  />
                )}
              />
            </div>
            <div className='w-full flex justify-end items-center gap-5'>
              <Link
                to='/dashboard/categories'
                search={{
                  page: 1,
                  limit: 20,
                }}
              >
                <Button type='button' variant='outline'>
                  Cancel
                </Button>
              </Link>
              <Button type='submit'>Save</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
