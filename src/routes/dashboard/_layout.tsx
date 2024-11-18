import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarCustom from '@/components/layout/sidebar';
import Header from '@/components/layout/header';
import BreadcrumbCustom from '@/components/layout/breadcrumb';

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
      <main className='w-full flex flex-col'>
        <Header />
        <div className='flex-1 px-4'>
          <BreadcrumbCustom />
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
