interface ChartContainerProps {
  children: React.ReactNode;
}

const ChartContainer = ({ children }: ChartContainerProps) => {
  return (
    <div className='w-full h-fit flex flex-col gap-3 p-5 border rounded-lg'>
      <div className='flex items-center justify-between'>
        <p className='text-xl text-primary font-bold'>BarCharts</p>
        <p className='text-sm text-secondary font-bold'>January - June 2024</p>
      </div>
      <div className='w-auto h-fit'>{children}</div>
    </div>
  );
};

export default ChartContainer;
