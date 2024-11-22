import { EllipsisVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Link } from '@tanstack/react-router';
import { Badge } from '../ui/badge';

export const reportTypeColumns: TableColumn<ReportTypeWithAction>[] = [
  {
    header: '',
    renderCell(item) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='hover:cursor-pointer'>
              <EllipsisVertical size={16} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='min-w-[20rem]' align='start'>
            <DropdownMenuItem
              className='px-3 gap-x-2 hover:cursor-pointer text-[1.3rem]'
              asChild
            >
              <Link
                to='/dashboard/report-types/$reportTypeId/edit'
                params={{
                  reportTypeId: item._id,
                }}
              >
                Update
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className='px-3 gap-x-2 hover:cursor-pointer text-[1.3rem]'
              asChild
            >
              <div onClick={() => item.deleteFn(item._id)}>Delete</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  {
    header: 'Type Name',
    renderCell: (item) => (
      <div className='h-10 flex items-center'>{item.name}</div>
    ),
  },
  {
    header: 'Status',
    renderCell: (item) => <Badge>{item.status}</Badge>,
  },
];
