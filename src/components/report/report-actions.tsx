import { Input } from '../ui/input';
import ReportFilter from './report-filter';

const ReportActions = () => {
  return (
    <div className='w-full h-fit flex items-center justify-between'>
      <div className='w-[35rem]'>
        <Input type='search' placeholder='Search...' />
      </div>
      <div className='w-fit flex justify-end items-center gap-3'>
        <ReportFilter />
      </div>
    </div>
  );
};

export default ReportActions;
