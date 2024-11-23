import { Filter, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from '@tanstack/react-router';
import { Input } from '../ui/input';

const CategoryAction = () => {
  return (
    <div className='w-full h-fit flex items-center justify-between'>
      <div className='w-[35rem]'>
        <Input type='search' placeholder='Search...' />
      </div>
      <div className='w-fit flex justify-end items-center gap-3'>
        <Button variant='outline'>
          <Filter size={16} />
          Filter
        </Button>
        <Link to='/dashboard/categories/create'>
          <Button>
            <Plus size={16} />
            Create
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CategoryAction;
