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

export const subAdminColumns: TableColumn<User>[] = [
  {
    header: '',
    renderCell() {
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
              <Link to='/dashboard/users'>View Detail</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='px-3 gap-x-2 hover:cursor-pointer text-[1.3rem]'
              asChild
            >
              <Link to='/dashboard/users'>Suspense</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    header: 'UID',
    renderCell: (item) => <p>{item._id}</p>,
  },
  {
    header: 'Email',
    renderCell: (item) => <p>{item.email}</p>,
  },
  {
    header: 'Information',
    renderCell: (item) => (
      <div className='w-auto h-fit flex items-center gap-3'>
        <div className='w-[3.8rem] h-[3.8rem] overflow-hidden rounded-full border border-secondary'>
          <img
            className='w-full h-full object-cover'
            src={item.avatar}
            alt='ADMIN_AVATAR'
          />
        </div>
        <p className='text-sm'>{item.user_name}</p>
      </div>
    ),
  },
  {
    header: 'Date Joined',
    renderCell: () => <p>Nov, 02 2024</p>,
  },
  {
    header: 'Status',
    renderCell: () => (
      <Badge className='rounded-xl' variant='outline'>
        Active
      </Badge>
    ),
  },
];
