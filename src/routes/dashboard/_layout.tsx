import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/_layout')({
  component: DashBoardLayout,
});

function DashBoardLayout() {
  return (
    <div className='w-screen h-screen flex items-center gap-2'>
      <aside className='w-1/4 h-full border border-black px-2 py-3'>
        Sidebar
        <Link
          className='w-full h-[30px] flex items-center justify-start px-3 py-2'
          to='/dashboard/users'
        >
          User
        </Link>
      </aside>
      <main className='w-3/4 h-full border border-black px-2 py-3 flex flex-col'>
        <header className='h-20 p-2 border-b border-black'>Header</header>
        <div className='flex-1 shrink-0 p-2'>
          Content
          <Outlet />
        </div>
        <footer className='h-20 p-2 border-t border-black'>Footer</footer>
      </main>
    </div>
  );
}
