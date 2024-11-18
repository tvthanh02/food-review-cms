import { BarChartDemo } from '@/components/charts/bar-chart';
import { BarChartInteractive } from '@/components/charts/bar-chart-interactive';
import ChartContainer from '@/components/charts/container-chart';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/_layout/')({
  component: DashBoardPage,
});

function DashBoardPage() {
  return (
    <div className='w-full flex items-start gap-3'>
      <div className='flex-1'>
        <ChartContainer>
          <BarChartInteractive />
        </ChartContainer>
      </div>
      <div className='w-[40rem] h-fit'>
        <ChartContainer>
          <BarChartDemo />
        </ChartContainer>
      </div>
    </div>
  );
}
