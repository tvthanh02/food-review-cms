import { Download, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import SubAdminFilter from './sub-admin-filter';
import { Link } from '@tanstack/react-router';
import { Input } from '../ui/input';

const SubAdminActions = () => {
  return (
    <div className='w-full h-fit flex items-center justify-between'>
      <div className='w-[35rem]'>
        <Input type='search' placeholder='Search...' />
      </div>
      <div className='w-fit flex justify-end items-center gap-3'>
        <SubAdminFilter />

        <Button variant='outline'>
          <Download size={16} />
          Export
        </Button>

        <Button>
          <Link
            className='w-full h-full flex items-center'
            to='/dashboard/sub-admins/create'
          >
            <Plus size={16} />
            Create
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SubAdminActions;
