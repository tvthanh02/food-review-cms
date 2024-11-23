import { House, Slash } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { Link, useLocation } from '@tanstack/react-router';
import clsx from 'clsx';

const BreadcrumbCustom = ({ title, path }: { title: string; path: string }) => {
  const { pathname } = useLocation();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className='flex items-center text-primary font-medium'>
          <House size={16} />
          <Link
            className={clsx('hover:text-secondary', {
              underline: pathname !== '/dashboard',
            })}
            to='/dashboard'
          >
            Dashboard
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <Link to={path}>{title}</Link>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbCustom;
