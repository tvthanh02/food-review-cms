interface ReportType {
  _id: string;
  name: string;
  status: string;
}

interface ReportTypeWithAction {
  _id: string;
  name: string;
  status: string;
  deleteFn: (id: string) => void;
}

interface SearchParamsReportType {
  page: string;
  limit: string;
  status?: 'active' | 'inactive';
}

interface CreateReportType {
  name: string;
  status?: string;
}
