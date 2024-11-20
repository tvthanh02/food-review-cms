import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CreateReportTypeSchema, CreateReportTypeZod } from '../create';
import useReportTypeMutation from '@/data/report-type/useReportTypeMutation';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import useReportTypeDetail from '@/data/report-type/useReportTypeDetail';

export const Route = createFileRoute(
  '/dashboard/_layout/(report)/report-types/$reportTypeId/edit'
)({
  component: UpdateReportTypePage,
});

function UpdateReportTypePage() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<CreateReportTypeZod>({
    resolver: zodResolver(CreateReportTypeSchema),
  });

  const { reportTypeId } = Route.useParams();

  const { updateMutation } = useReportTypeMutation();

  const { data: reportType } = useReportTypeDetail(reportTypeId);

  useEffect(() => {
    setValue('name', reportType?.name ?? '');
    setValue('status', reportType?.status === 'Active' ? true : false);
  }, [setValue, reportType]);

  const onSubmit: SubmitHandler<CreateReportTypeZod> = (data) => {
    const status = data.status ? 'Active' : 'Inactive';

    updateMutation.mutate({ _id: reportTypeId, name: data.name, status });
  };

  if (!reportTypeId) return null;

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
