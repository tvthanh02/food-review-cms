import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import clsx from 'clsx';

function TableDemo<T>({
  columns,
  data,
  rowStyles,
  columnStyles,
}: TableProps<T>) {
  return (
    <Table>
      {data?.length === 0 && <TableCaption>No records found</TableCaption>}
      <TableHeader>
        <TableRow className='bg-gray-100'>
          {columns.map((column) => (
            <TableHead className='font-medium text-black' key={column.header}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow
            className={clsx({
              [rowStyles || '']: rowStyles,
            })}
            key={item._id}
          >
            {columns.map((column) => (
              <TableCell
                className={clsx({
                  [columnStyles || '']: columnStyles,
                })}
                key={column.header}
              >
                {column.renderCell(item)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className='text-right'>$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}

export default TableDemo;
