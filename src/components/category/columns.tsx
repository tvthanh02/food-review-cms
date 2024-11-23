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

export const categoryColumns: TableColumn<CategoryWithAction>[] = [
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
                to='/dashboard/categories/$categoryId/edit'
                params={{
                  categoryId: item._id,
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
    header: '#',
    renderCell: (_, index) => <p>{index + 1}</p>,
  },
  {
    header: 'Category Name',
    renderCell: (item) => (
      <div className='h-10 flex items-center'>{item.category_name}</div>
    ),
  },
  {
    header: 'Description',
    renderCell: (item) => (
      <div className='flex items-center max-w-[30rem]'>{item.description}</div>
    ),
  },
  {
    header: 'Created At',
    renderCell: (item) => (
      <p>{item.created_at ?? '2024-11-22T08:22:45.427Z'}</p>
    ),
  },
  {
    header: 'Update At',
    renderCell: (item) => (
      <p>{item.updated_at ?? '2024-11-22T08:22:45.427Z'}</p>
    ),
  },
  {
    header: 'Status',
    renderCell: (item) => (
      <Badge variant={item.status === 'Active' ? 'default' : 'destructive'}>
        {item.status}
      </Badge>
    ),
  },
];
