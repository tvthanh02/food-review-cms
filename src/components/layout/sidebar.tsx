import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import useSidebar from '@/hooks/use-sidebar';
import { Link, useLocation } from '@tanstack/react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { groups, items } from '@/constants/menu';
import clsx from 'clsx';
import useDialog from '@/hooks/use-dialog';
import { useAuthMutation } from '@/data/auth/use-auth-mutation';

const SidebarCustom = () => {
  const { pathname } = useLocation();

  const { logout } = useAuthMutation();

  const { RootDialog, setDialog, toggleDialog } = useDialog();

  const handleLogout = () => {
    logout.mutate();
  };

  const handleSetDialog = () => {
    setDialog({
      title: 'Logout',
      description: 'Are you sure want to logout ?',
      onCancel: toggleDialog,
      onConfirm: handleLogout,
    });
  };

  const checkActiveLink = (itemPath: string): boolean => {
    if (pathname === '/dashboard' && itemPath === pathname) return true;
    if (itemPath !== '/dashboard' && pathname.includes(itemPath)) return true;
    return false;
  };

  const { state } = useSidebar();
  if (state === 'collapsed') return null;

  return (
    <>
      <RootDialog />
      <Sidebar side='left' variant='sidebar' collapsible='icon'>
        <SidebarHeader>
          <SidebarMenu className='border bg-primary text-white rounded-md'>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    Select Workspace
                    <ChevronDown className='ml-auto' />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-[--radix-popper-anchor-width]'>
                  <DropdownMenuItem>
                    <span>Acme Inc</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Acme Corp.</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className='overflow-y-auto'>
          <SidebarMenu>
            {groups.map((group) => (
              <SidebarGroup key={group}>
                <SidebarGroupLabel>{group}</SidebarGroupLabel>
                <SidebarGroupContent>
                  {items.map((item) => {
                    if (item.group !== group) return null;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          className={clsx({
                            'text-primary font-bold': checkActiveLink(item.url),
                          })}
                          asChild
                        >
                          {item.url === '#logout' ? (
                            <div
                              className='hover:cursor-pointer'
                              onClick={handleSetDialog}
                            >
                              <item.icon />
                              <span>{item.title}</span>
                            </div>
                          ) : (
                            <Link to={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className='flex items-start border-t '>
          <SidebarTrigger className='w-auto text-primary font-semibold' />
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default SidebarCustom;
