import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/dashboard/_layout/(report)/report-types/'
)({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /dashboard/_layout/(reporting)/report-types/!';
}
