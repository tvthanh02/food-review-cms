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
import useFilter from '@/hooks/useFilter';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Controller } from 'react-hook-form';
import { Input } from '../ui/input';

const ReportFilter = () => {
  const [isOpen, setOpen] = useState(false);

  const navigate = useNavigate({
    from: '/dashboard/reports',
  });

  const searchParams: SearchParamsReport = useSearch({
    from: '/dashboard/_layout/(report)/reports/',
  });

  const navigateFn = (values: SearchParamsReport) => {
    Object.entries(values).forEach(([key, value]) => {
      if (value === '' || value === undefined) {
        delete values[key as keyof SearchParamsReport];
      }
    });

    navigate({
      search: (preSearch: SearchParamsReport) => ({
        ...preSearch,
        page: values.page,
        limit: values.limit,
        status: values.status,
        report_type: values.report_type,
      }),
    });
  };

  const { handleSubmit, control } = useFilter<
    SearchParamsReport,
    SearchParamsReport
  >(searchParams, navigateFn);

  return (
    <DropdownMenu open={isOpen}>
      <DropdownMenuTrigger onClick={() => setOpen(!isOpen)} asChild>
        <Button variant='default'>
          <Filter size={16} />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-[24rem] max-h-[50rem] overflow-y-auto'
        align='end'
      >
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {['Pending', 'Resolved', 'Closed'].map((status) => (
          <DropdownMenuItem key={status}>
            <div className='flex items-center space-x-2'>
              <Controller
                control={control}
                name='status'
                render={({ field }) => {
                  return (
                    <Checkbox
                      id={status}
                      value={status}
                      checked={field.value?.includes(status) ?? false}
                      onCheckedChange={(value: boolean) => {
                        const currentValue = Array.isArray(field.value)
                          ? field.value
                          : [];
                        const updatedValue = value
                          ? [...currentValue, status]
                          : currentValue.filter((item) => item !== status);

                        field.onChange(updatedValue);
                      }}
                    />
                  );
                }}
              />
              <label
                htmlFor={status}
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                <Badge variant='default'>{status}</Badge>
              </label>
            </div>
          </DropdownMenuItem>
        ))}

        <DropdownMenuLabel>Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Controller
            control={control}
            name='report_type'
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

export default ReportFilter;
