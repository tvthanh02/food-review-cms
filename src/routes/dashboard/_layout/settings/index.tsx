import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/_layout/settings/')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /dashboard/_layout/settings/!';
}
