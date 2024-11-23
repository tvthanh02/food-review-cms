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

export const userColumns: TableColumn<User>[] = [
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
                to='/dashboard/sub-admins/$subAdminId'
                params={{ subAdminId: item._id }}
              >
                View Detail
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='px-3 gap-x-2 hover:cursor-pointer text-[1.3rem]'
              asChild
            >
              <Link
                to='/dashboard/users'
                search={{
                  page: 1,
                  limit: 20,
                }}
              >
                Ban
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='px-3 gap-x-2 hover:cursor-pointer text-[1.3rem]'
              asChild
            >
              <Link
                to='/dashboard/users'
                search={{
                  page: 1,
                  limit: 20,
                }}
              >
                Promote to Admin
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    header: '#',
    renderCell: (_, index) => <p>{index + 1}</p>,
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
        <div className='w-[3.8rem] h-[3.8rem] overflow-hidden rounded-full border border-muted'>
          <img
            className='w-full h-full object-cover'
            src={item.avatar ?? 'https://github.com/shadcn.png'}
            alt='ADMIN_AVATAR'
          />
        </div>
        <p className='text-sm'>{item.user_name}</p>
      </div>
    ),
  },
  {
    header: 'Date Joined',
    renderCell: (item) => <p>{item.created_at}</p>,
  },
  {
    header: 'Status',
    renderCell: (item) => (
      <Badge
        className='rounded-xl'
        variant={item.isLock ? 'destructive' : 'default'}
      >
        {item.isLock ? 'Locked' : 'Nomal'}
      </Badge>
    ),
  },
];
