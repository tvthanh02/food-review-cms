import {
  LayoutDashboard,
  ListMinus,
  User,
  Users,
  ClipboardMinus,
  Settings,
  ChartBarStacked,
  Bell,
  LogOut,
} from 'lucide-react';

export const groups = [
  'Analytics',
  'Reporting',
  'Human',
  'Post',
  'Announce',
  'others',
];

export const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    group: 'Analytics',
  },
  {
    title: 'Sub Admins',
    url: '/dashboard/sub-admins',
    icon: User,
    group: 'Human',
  },
  {
    title: 'Users',
    url: '/dashboard/users',
    icon: Users,
    group: 'Human',
  },
  {
    title: 'Reports',
    url: '/dashboard/reports',
    icon: ClipboardMinus,
    group: 'Reporting',
  },
  {
    title: 'Posts',
    url: '/dashboard/posts',
    icon: ListMinus,
    group: 'Post',
  },
  {
    title: 'Categories',
    url: '/dashboard/categories',
    icon: ChartBarStacked,
    group: 'Post',
  },
  {
    title: 'Report Types',
    url: '/dashboard/report-types',
    icon: ChartBarStacked,
    group: 'Reporting',
  },
  {
    title: 'Notifications',
    url: '/dashboard/notifications',
    icon: Bell,
    group: 'Announce',
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings,
    group: 'others',
  },
  {
    title: 'Sign Out',
    url: '#logout',
    icon: LogOut,
    group: 'others',
  },
];
