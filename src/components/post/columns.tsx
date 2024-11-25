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
import { format } from 'date-fns';

const getColorForBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return 'constructive';
    case 'Pending':
      return 'default';
    case 'Rejected':
      return 'destructive';
    case 'warn':
      return 'outline';
    default:
      return 'default';
  }
};

export const postColumns: TableColumn<PostWithAction>[] = [
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
                to='/dashboard/posts/$postId'
                params={{
                  postId: item._id,
                }}
              >
                View Detail
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className='px-3 gap-x-2 hover:cursor-pointer text-[1.3rem]'
              asChild
            >
              <div onClick={() => item.acceptFn(item._id)}>Accept</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className='px-3 gap-x-2 hover:cursor-pointer text-[1.3rem]'
              asChild
            >
              <div onClick={() => item.rejectFn(item._id)}>Reject</div>
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
    header: 'Food Name',
    renderCell: (item) => (
      <div className='max-w-[30rem] flex items-center'>{item.food_name}</div>
    ),
  },
  {
    header: 'address',
    renderCell: (item) => (
      <div className='flex items-center max-w-[30rem]'>{item.position}</div>
    ),
  },
  {
    header: 'User',
    renderCell: (item) => (
      <div className='w-auto h-fit flex items-center gap-3'>
        <div className='w-[3.8rem] h-[3.8rem] overflow-hidden rounded-full border border-muted'>
          <img
            className='w-full h-full object-cover'
            src={item.user_id.avatar ?? 'https://github.com/shadcn.png'}
            alt='ADMIN_AVATAR'
          />
        </div>
        <p className='text-sm'>{item.user_id.user_name}</p>
      </div>
    ),
  },
  {
    header: 'Province/City',
    renderCell: (item) => <p>{item.province}</p>,
  },
  {
    header: 'Categories',
    renderCell: (item) => (
      <ul>
        {item.categories.map((category, index) => (
          <li className='py-1' key={index}>
            <Badge variant='outline'>{category}</Badge>
          </li>
        ))}
      </ul>
    ),
  },
  {
    header: 'Created At',
    renderCell: (item) => (
      <p>
        {format(
          new Date(item.created_at ?? '2024-11-22T08:22:45.427Z'),
          'MMM dd, yyyy HH:mm'
        )}
      </p>
    ),
  },
  {
    header: 'Update At',
    renderCell: (item) => (
      <p>
        {format(
          new Date(item.updated_at ?? '2024-11-22T08:22:45.427Z'),
          'MMM dd, yyyy HH:mm'
        )}
      </p>
    ),
  },
  {
    header: 'Status',
    renderCell: (item) => (
      <Badge variant={getColorForBadge(item.status)}>{item.status}</Badge>
    ),
  },
];
