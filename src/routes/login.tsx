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
import useAuth from '@/data/useAuthMutation';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login.mutate({ email, password });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900'>
      <Card className='mx-auto h-fit w-full lg:w-[54rem] lg:shadow rounded-sm'>
        <CardHeader>
          <CardTitle className='text-3xl text-primary'>Welcome Back!</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-10'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <div className='relative'>
                  <Input
                    id='email'
                    type='email'
                    placeholder='admin@foodreview.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='pl-10 h-[4rem] '
                    required
                  />
                  <MailIcon
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 '
                    size={18}
                  />
                </div>
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='password'>Password</Label>

                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='pl-10 h-[4rem] pr-10'
                    required
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
                <Link
                  href='#'
                  className='ml-auto inline-block text-sm underline text-primary font-bold'
                >
                  Forgot your password?
                </Link>
              </div>
              <Button type='submit' className='w-full h-[4rem]'>
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
