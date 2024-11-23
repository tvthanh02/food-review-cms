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
    header: '#',
    renderCell: (_, index) => <p>{index + 1}</p>,
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
    header: 'User',
    renderCell: (item) => (
      <div className='w-auto h-fit flex items-center gap-3'>
        <div className='w-[3.8rem] h-[3.8rem] overflow-hidden rounded-full border border-secondary'>
          <img
            className='w-full h-full object-cover'
            src={item.user_id?.avatar ?? 'https://github.com/shadcn.png'}
            alt='ADMIN_AVATAR'
          />
        </div>
        <p className='text-sm'>{item.user_id.user_name ?? 'Trieu Thanh'}</p>
      </div>
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
    header: 'Update At',
    renderCell: (item) => <p>{item.updated_at}</p>,
  },
  {
    header: 'Status',
    renderCell: (item) => (
      <Badge variant={item.status === 'Closed' ? 'destructive' : 'default'}>
        {item.status}
      </Badge>
    ),
  },
];
