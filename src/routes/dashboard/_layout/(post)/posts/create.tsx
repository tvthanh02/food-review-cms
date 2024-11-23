import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/_layout/(post)/posts/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /dashboard/_layout/(post)/posts/create!';
}
