import { Filter } from 'lucide-react';
import { Button } from '../ui/button';

const ReportActions = () => {
  return (
    <div className='w-full flex justify-end items-center gap-3'>
      <Button>
        <Filter size={16} />
        Filter
      </Button>
    </div>
  );
};

export default ReportActions;
