interface TableColumn<T> {
  header: string;
  renderCell: (item: T & { _id: string }, index: number) => React.JSX.Element;
}

interface TableProps<T> {
  columns: TableColumn<T & { _id: string }>[];
  data: (T & { _id: string })[];
  rowStyles?: string;
  columnStyles?: string;
}
