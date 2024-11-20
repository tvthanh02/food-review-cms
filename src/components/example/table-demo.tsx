import TableDemo from '../layout/table';
import { Badge } from '../ui/badge';

interface ExampleTypeTable {
  UID: string;
  email: string;
  information: {
    avatar: string;
    name: string;
  };
  dateJoined: string;
  born: string;
  status: string;
}

const tableExampleColumns: TableColumn<ExampleTypeTable>[] = [
  {
    header: 'UID',
    renderCell: (item) => <p>{item.UID}</p>,
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
            src={item.information.avatar}
            alt='ADMIN_AVATAR'
          />
        </div>
        <p className='text-sm'>{item.information.name}</p>
      </div>
    ),
  },
  {
    header: 'Date Joined',
    renderCell: (item) => <p>{item.dateJoined}</p>,
  },
  {
    header: 'Born',
    renderCell: (item) => <p>{item.born}</p>,
  },
  {
    header: 'Status',
    renderCell: (item) => (
      <Badge className='rounded-xl' variant='outline'>
        {item.status}
      </Badge>
    ),
  },
];

const data: (ExampleTypeTable & { _id: string })[] = [
  {
    UID: '6732dadba5ae64f3febd82c3',
    _id: '6732dadba5ae64f3febd82c3',

    email: 'email.example@gmail.com',
    information: {
      avatar: 'https://github.com/shadcn.png',
      name: 'Example User',
    },
    dateJoined: 'Nov, 02 2024',
    born: 'Nov, 02 1998',
    status: 'Active',
  },
  {
    UID: 'bc94fd78a5b284edz7d93c3',
    _id: '6732dadba5ae64f3febd82c3',

    email: 'another.user@example.com',
    information: {
      avatar: 'https://github.com/exampleuser.png',
      name: 'Another User',
    },
    dateJoined: 'Oct, 15 2023',
    born: 'Jan, 11 2000',
    status: 'Inactive',
  },
  {
    UID: 'a23b1d85d3c524e9fcad81b6',
    _id: '6732dadba5ae64f3febd82c3',

    email: 'sample.user@example.com',
    information: {
      avatar: 'https://github.com/sampleuser.png',
      name: 'Sample User',
    },
    dateJoined: 'Sep, 05 2022',
    born: 'Mar, 20 1995',
    status: 'Active',
  },
  // Thêm dữ liệu mẫu khác nếu cần
];

const TableExample = () => {
  return <TableDemo columns={tableExampleColumns} data={data} />;
};

export default TableExample;
