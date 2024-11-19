import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/_layout/users/')({
  component: UserPage,
});

function UserPage() {
  return <>user page</>;
}
