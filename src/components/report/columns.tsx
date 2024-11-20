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

/**
 * interface Report {
  _id: string;
  note: string;
  post: {
    _id: string;
  };
  user: {
    _id: string;
    user_name: string;
    avatar: string;
  };
  report_content: string[];
  created_at: string;
}

 */

export const reportColumns: TableColumn<Report>[] = [
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
              <Link to='/dashboard/users'>Suspense</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    header: 'ID',
    renderCell: (item) => <p>{item._id}</p>,
  },
  {
    header: 'User Report',
    renderCell: (item) => (
      <div className='w-auto h-fit flex items-center gap-3'>
        <div className='w-[3.8rem] h-[3.8rem] overflow-hidden rounded-full border border-secondary'>
          <img
            className='w-full h-full object-cover'
            src={item.user.avatar}
            alt='ADMIN_AVATAR'
          />
        </div>
        <p className='text-sm'>{item.user.user_name}</p>
      </div>
    ),
  },
  {
    header: 'Post ID',
    renderCell: (item) => <p>{item.post._id}</p>,
  },
  {
    header: 'Report Content',
    renderCell: (item) => (
      <ul>
        {item.report_content.map((content, index) => (
          <li key={index}>{content}</li>
        ))}
      </ul>
    ),
  },
  {
    header: 'Created At',
    renderCell: (item) => <p>{item.created_at}</p>,
  },
  {
    header: 'Status',
    renderCell: () => <Badge>Pending</Badge>,
  },
];
