import useAuth from '@/data/auth/useAuth';
import { Bell, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CapitalizeFirstLetter } from '@/utils/helper';
import { SidebarTrigger } from '../ui/sidebar';
import useSidebar from '@/hooks/useSidebar';

const Header = () => {
  const { data: profile } = useAuth();
  const { isMobile } = useSidebar();

  return (
    <header className='w-full h-fit py-2 px-4 border-b flex justify-between items-center'>
      {isMobile ? (
        <SidebarTrigger className='w-auto text-primary font-semibold'>
          <Menu size={32} />
        </SidebarTrigger>
      ) : (
        <h1 className='text-2xl font-bold text-primary'>Dashboard</h1>
      )}
      <div className='flex items-center gap-4'>
        <div className='relative'>
          <div className='absolute text-sm flex items-center justify-center h-5 w-5 text-primary-foreground rounded-full bg-destructive bottom-[65%] right-[60%]'>
            8
          </div>
          <Bell />
        </div>
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
