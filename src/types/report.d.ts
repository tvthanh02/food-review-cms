interface Report {
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

interface SearchParamsReport {
  page: string;
  limit: string;
}
