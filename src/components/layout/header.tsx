import useAuth from '@/data/auth/useAuth';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useLocation } from '@tanstack/react-router';
import { CapitalizeFirstLetter } from '@/utils/helper';

const Header = () => {
  const { data: profile } = useAuth();

  const { pathname } = useLocation();

  const title = CapitalizeFirstLetter(pathname.split('/').pop() ?? '');

  return (
    <header className='w-full h-fit py-2 px-4 border-b flex justify-between items-center'>
      <p className='font-bold text-2xl text-primary'>{title}</p>
      <div className='flex items-center gap-4'>
        <Bell />
        <div className='flex items-center gap-3'>
          <div className='flex flex-col'>
            <p className='text-[1.4rem] font-bold'>
              {profile?.email ?? 'Admin'}
            </p>
            <p className='text-[1.2rem]'>
              {CapitalizeFirstLetter(profile?.role ?? '')}
            </p>
          </div>
          <Avatar>
            <AvatarImage
              src={profile?.avatar ?? 'https://github.com/shadcn.png'}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
