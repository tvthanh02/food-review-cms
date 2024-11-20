import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/_layout/notifications/')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /dashboard/notifications/!';
}
