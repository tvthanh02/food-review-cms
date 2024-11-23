import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarCustom from '@/components/layout/sidebar';
import Header from '@/components/layout/header';

export const Route = createFileRoute('/dashboard/_layout')({
  beforeLoad: () => {
    if (!localStorage.getItem('accessToken')) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: DashBoardLayout,
});

function DashBoardLayout() {
  return (
    <SidebarProvider>
      <SidebarCustom />
      <main className='w-full flex flex-col h-screen'>
        <Header />
        <div className='flex-1 flex flex-col px-4 overflow-y-auto py-5'>
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
