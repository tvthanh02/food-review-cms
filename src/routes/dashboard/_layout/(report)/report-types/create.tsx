import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import useReportTypeMutation from '@/data/report-type/useReportTypeMutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export const Route = createFileRoute(
  '/dashboard/_layout/(report)/report-types/create'
)({
  component: CreateReportTypePage,
});

export const CreateReportTypeSchema = z.object({
  name: z.string({
    message: 'Name is required',
  }),
  status: z.boolean().default(false),
});

export type CreateReportTypeZod = z.infer<typeof CreateReportTypeSchema>;

function CreateReportTypePage() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateReportTypeZod>({
    resolver: zodResolver(CreateReportTypeSchema),
  });

  const { createMutation } = useReportTypeMutation();

  const onSubmit: SubmitHandler<CreateReportTypeZod> = (data) => {
    const status = data.status ? 'Active' : 'Inactive';

    createMutation.mutate({ name: data.name, status });
  };

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
                  placeholder='Violence,...'
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
              to='/dashboard/report-types'
              search={{
                page: '1',
                limit: '20',
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
  );
}
