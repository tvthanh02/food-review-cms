import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/_layout/')({
  component: DashBoardPage,
});

function DashBoardPage() {
  return <p>"Hello /dashboard/!"</p>;
}
