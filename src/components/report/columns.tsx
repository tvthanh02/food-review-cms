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

export const reportColumns: TableColumn<ReportWithAction>[] = [
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
                params={{ postId: item.post_id._id }}
              >
                Go to post
              </Link>
            </DropdownMenuItem>

            {item.status === 'Closed' && (
              <div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='px-3 gap-x-2 hover:cursor-pointer text-[1.3rem]'
                  asChild
                  onClick={() => item.approveFn(item._id)}
                >
                  <p>Resolved</p>
                </DropdownMenuItem>
              </div>
            )}
            {item.status === 'Resolved' && (
              <div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='px-3 gap-x-2 hover:cursor-pointer text-[1.3rem]'
                  asChild
                  onClick={() => item.closeFn(item._id)}
                >
                  <p>Close</p>
                </DropdownMenuItem>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    header: 'User Report',
    renderCell: (item) => (
      <div className='w-auto h-fit flex items-center gap-3'>
        <div className='w-[3.8rem] h-[3.8rem] overflow-hidden rounded-full border border-secondary'>
          <img
            className='w-full h-full object-cover'
            src={item.user_id?.avatar ?? 'https://github.com/shadcn.png'}
            alt='ADMIN_AVATAR'
          />
        </div>
        <p className='text-sm'>{item.user_id.user_name}</p>
      </div>
    ),
  },
  {
    header: 'Report Content',
    renderCell: (item) => (
      <ul>
        {item.report_type_id.map((content, index) => (
          <li className='py-1' key={index}>
            <Badge variant='outline'>{content.name}</Badge>
          </li>
        ))}
      </ul>
    ),
  },
  {
    header: 'Note',
    renderCell: (item) => (
      <p className='max-w-[15rem]'>{item?.note ?? 'No note'}</p>
    ),
  },
  {
    header: 'Created At',
    renderCell: (item) => <p>{item.created_at}</p>,
  },
  {
    header: 'Status',
    renderCell: (item) => <Badge>{item.status}</Badge>,
  },
];
