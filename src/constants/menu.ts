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
    title: 'Sub Admin',
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
    url: '#',
    icon: ClipboardMinus,
    group: 'Reporting',
  },
  {
    title: 'Posts',
    url: '#',
    icon: ListMinus,
    group: 'Post',
  },
  {
    title: 'Category',
    url: '#',
    icon: ChartBarStacked,
    group: 'Post',
  },
  {
    title: 'Report Type',
    url: '#',
    icon: ChartBarStacked,
    group: 'Post',
  },
  {
    title: 'Notification',
    url: '#',
    icon: Bell,
    group: 'Announce',
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
    group: 'others',
  },
  {
    title: 'Sign Out',
    url: '#',
    icon: LogOut,
    group: 'others',
  },
];
