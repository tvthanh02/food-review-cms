interface Report {
  _id: string;
  note: string;
  post_id: {
    _id: string;
  };
  user_id: {
    _id: string;
    user_name: string;
    avatar: string;
  };
  report_type_id: {
    _id: string;
    name: string;
  }[];
  status: 'Pending' | 'Resolved' | 'Closed';
  created_at: string;
  updated_at: string;
}

interface ReportWithAction {
  _id: string;
  note: string;
  post_id: {
    _id: string;
  };
  user_id: {
    _id: string;
    user_name: string;
    avatar: string;
  };
  report_type_id: {
    _id: string;
    name: string;
  }[];
  status: 'Pending' | 'Resolved' | 'Closed';
  created_at: string;
  updated_at: string;

  approveFn: (id: string) => void;
  closeFn: (id: string) => void;
}

interface SearchParamsReport {
  page: number;
  limit: number;
  status?: string[];
  report_type?: string;
  user?: string;
}

interface UpdateStatusReport {
  id: string;
  status: 'Pending' | 'Resolved' | 'Closed';
}
