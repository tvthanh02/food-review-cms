import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LockIcon, MailIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { useAuthMutation } from '@/data/auth/use-auth-mutation';
import { SubmitHandler, useForm } from 'react-hook-form';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Login>();

  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthMutation();

  const onSubmit: SubmitHandler<Login> = (data) => {
    login.mutate(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900'>
      <Card className='mx-auto h-fit w-full lg:w-[54rem] lg:shadow rounded-md'>
        <CardHeader>
          <CardTitle className='text-3xl text-primary'>Welcome Back!</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-10'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <div className='relative'>
                  <Input
                    id='email'
                    placeholder='admin@foodreview.com'
                    {...register('email', {
                      required: { value: true, message: 'Email is required' },
                    })}
                    className='pl-10 h-[4rem] '
                  />
                  <MailIcon
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 '
                    size={18}
                  />
                </div>
                {errors.email && (
                  <span className='text-[1.3rem] text-red-500'>
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='password'>Password</Label>

                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    {...register('password', {
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    })}
                    className='pl-10 h-[4rem] pr-10'
                  />
                  <LockIcon
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 '
                    size={18}
                  />
                  <button
                    type='button'
                    onClick={togglePasswordVisibility}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 '
                  >
                    {showPassword ? (
                      <EyeOffIcon size={18} aria-label='Hide password' />
                    ) : (
                      <EyeIcon size={18} aria-label='Show password' />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className='text-[1.3rem] text-red-500'>
                    {errors.password.message}
                  </span>
                )}
                <Link
                  href='#'
                  className='ml-auto inline-block text-sm underline text-primary font-bold'
                >
                  Forgot your password?
                </Link>
              </div>
              <Button type='submit' className='w-full h-[4rem]'>
                {login.isPending ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
