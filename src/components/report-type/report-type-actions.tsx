import { Filter, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from '@tanstack/react-router';

const ReportTypeActions = () => {
  return (
    <div className='w-full flex justify-end items-center gap-3'>
      <Button variant='outline'>
        <Filter size={16} />
        Filter
      </Button>
      <Link to='/dashboard/report-types/create'>
        <Button>
          <Plus size={16} />
          Create
        </Button>
      </Link>
    </div>
  );
};

export default ReportTypeActions;
