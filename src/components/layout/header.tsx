import useAuth from '@/data/auth/useAuth';
import { Bell, EllipsisVertical, Menu, Moon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CapitalizeFirstLetter } from '@/utils/helper';
import { SidebarTrigger } from '../ui/sidebar';
import useSidebar from '@/hooks/useSidebar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';

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
          <Popover>
            <PopoverTrigger asChild>
              <button
                type='button'
                className=' flex items-center justify-center'
              >
                <EllipsisVertical size={20} />
              </button>
            </PopoverTrigger>
            <PopoverContent align='end' className='w-80 mt-3'>
              <div className='w-full  text-sm flex items-center justify-between  rounded-sm hover:cursor-pointer p-2'>
                <div className='flex h-full items-center gap-2 '>
                  <Moon size={16} />
                  <p>Dark mode</p>
                </div>
                <Switch />
              </div>
              <Separator />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
