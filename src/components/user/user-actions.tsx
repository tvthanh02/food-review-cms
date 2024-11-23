import { Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const UserActions = () => {
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
      </div>
    </div>
  );
};

export default UserActions;
