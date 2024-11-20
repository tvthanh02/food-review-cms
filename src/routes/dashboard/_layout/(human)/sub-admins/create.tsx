import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getUrlImageFromFile } from '@/utils/helper';
import { createFileRoute } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { useMemo, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
export const Route = createFileRoute(
  '/dashboard/_layout/(human)/sub-admins/create'
)({
  component: SubAdminCreatePage,
});

export const CreateSubAdminSchema = z.object({
  avatar: z
    .custom<File>((file) => file instanceof File, {
      message: 'Avatar is required and must be a file',
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'File size must be less than or equal to 5MB',
    }),
  email: z
    .string({
      message: 'Email is required',
    })
    .email('Invalid email address'),
  username: z.string({
    message: 'Username is required',
  }),
});

export type CreateSubAmin = z.infer<typeof CreateSubAdminSchema>;

function SubAdminCreatePage() {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateSubAmin>({
    resolver: zodResolver(CreateSubAdminSchema),
  });

  const watchAvatar = watch('avatar');

  const urlAvatar = useMemo(() => {
    return getUrlImageFromFile(watchAvatar);
  }, [watchAvatar]);

  const onSubmit: SubmitHandler<CreateSubAmin> = (data) => {
    console.log('🚀 ~ SubAdminCreatePage ~ data:', data);

    // use formData to send file and receive url image
    // use axios to send data
  };

  return (
    <div className='w-full h-auto '>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
        <div className='cus-container'>
          <div className='w-full h-fit flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
              <h1 className='text-2xl font-bold'>Create Sub Admin</h1>
              <span className='text-sm'>Sub Admin Generate Infomations</span>
              {errors.avatar && (
                <span className='text-[1.3rem] text-red-600'>
                  {errors.avatar.message}
                </span>
              )}
            </div>
            <div className='flex items-center gap-3'>
              <Avatar className='w-16 h-16 rounded-full border overflow-hidden'>
                <AvatarImage
                  className='w-full h-full object-cover'
                  src={urlAvatar}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <Controller
                control={control}
                name='avatar'
                render={({ field }) => (
                  <>
                    <input
                      ref={inputFileRef}
                      type='file'
                      accept='image/*'
                      className='hidden'
                      onChange={(e) => {
                        if (urlAvatar) URL.revokeObjectURL(urlAvatar);
                        field.onChange(e.target.files?.[0]);
                      }}
                    />
                    <Button
                      type='button'
                      onClick={() => inputFileRef.current?.click()}
                      variant='outline'
                      size='sm'
                    >
                      <Plus size={16} />
                      Upload
                    </Button>
                  </>
                )}
              />
            </div>
          </div>
        </div>
        <div className='cus-container'>
          <div className='w-full h-fit grid grid-cols-2 gap-5'>
            <div className='flex flex-col gap-2'>
              <label className='font-bold' htmlFor='email'>
                Email
              </label>
              <Controller
                control={control}
                name='email'
                render={({ field }) => (
                  <Input
                    id='email'
                    placeholder='subadmin.foodreview@gmail.com'
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.email && (
                <span className='text-[1.3rem] text-red-600'>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-bold' htmlFor='name'>
                Name
              </label>
              <Controller
                control={control}
                name='username'
                render={({ field }) => (
                  <Input
                    id='name'
                    placeholder='Truong Binh An'
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.username && (
                <span className='text-[1.3rem] text-red-600'>
                  {errors.username.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className='w-full h-fit flex justify-end gap-5'>
          <Button type='button' variant='outline'>
            Cancel
          </Button>
          <Button type='submit'>Save</Button>
        </div>
      </form>
    </div>
  );
}
