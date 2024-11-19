import { Filter } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useState } from 'react';
import { Input } from '../ui/input';
import useFilter from '@/hooks/use-filter';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Controller } from 'react-hook-form';

const SubAdminFilter = () => {
  const [isOpen, setOpen] = useState(false);

  const navigate = useNavigate({
    from: '/dashboard/sub-admins',
  });

  const searchParams: SearchParamsSubadmin = useSearch({
    from: '/dashboard/_layout/sub-admins/',
  });

  const navigateFn = (values: SearchParamsSubadmin) => {
    Object.entries(values).forEach(([key, value]) => {
      if (value === '' || value === undefined) {
        delete values[key as keyof SearchParamsSubadmin];
      }
    });

    navigate({
      search: (preSearch) => ({
        ...preSearch,
        page: values.page,
        limit: values.limit,
        name: values.name,
        email: values.email,
      }),
    });
  };

  const { handleSubmit, control } = useFilter<
    SearchParamsSubadmin,
    SearchParamsSubadmin
  >(searchParams, navigateFn);

  return (
    <DropdownMenu open={isOpen}>
      <DropdownMenuTrigger onClick={() => setOpen(!isOpen)} asChild>
        <Button variant='outline'>
          <Filter size={16} />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-[24rem] max-h-[50rem] overflow-y-auto'
        align='start'
      >
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className='flex items-center space-x-2'>
            <Checkbox id='active' />
            <label
              htmlFor='active'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              <Badge variant='default'>Active</Badge>
            </label>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className='flex items-center space-x-2'>
            <Checkbox id='inactive' />
            <label
              htmlFor='inactive'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              <Badge variant='default'>Inactive</Badge>
            </label>
          </div>
        </DropdownMenuItem>
        <DropdownMenuLabel>Email</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Controller
            control={control}
            name='email'
            render={({ field }) => (
              <Input
                type='search'
                value={field.value ?? ''}
                onChange={field.onChange}
              />
            )}
          />
        </DropdownMenuItem>
        <DropdownMenuLabel>Name</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Controller
            control={control}
            name='name'
            render={({ field }) => (
              <Input
                type='search'
                value={field.value ?? ''}
                onChange={field.onChange}
              />
            )}
          />
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem className='flex justify-end items-center gap-3'>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant='default'
            onClick={() => {
              handleSubmit();
            }}
          >
            Apply
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SubAdminFilter;
