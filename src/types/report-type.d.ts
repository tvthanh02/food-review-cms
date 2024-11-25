interface ReportType {
  _id: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ReportTypeWithAction {
  _id: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleteFn: (id: string) => void;
}

interface SearchParamsReportType {
  page: number;
  limit: number;
  status?: 'active' | 'inactive';
}

interface CreateReportType {
  name: string;
  status?: string;
}

interface UpdateReportType {
  _id: string;
  name: string;
  status?: string;
}
