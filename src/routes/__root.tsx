import { Toaster } from '@/components/ui/toaster';

import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
}
