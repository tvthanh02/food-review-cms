import { House, Slash } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { Link, useLocation } from '@tanstack/react-router';
import { CapitalizeFirstLetter } from '@/utils/helper';
import { Fragment } from 'react/jsx-runtime';

const BreadcrumbCustom = () => {
  const { pathname } = useLocation();

  const breadcrumbItems: Breadcrumb[] = [];

  pathname.split('/').forEach((item, index) => {
    if (item) {
      breadcrumbItems.push({
        name: item,
        href: `/dashboard/${item}`,
        current: index === pathname.split('/').length - 1,
        icon: index === 1 ? <House size={16} /> : undefined,
      });
    }
  });

  return (
    <div className='py-4'>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item) => {
            if (item.current) {
              return (
                <BreadcrumbItem key={item.name}>
                  {item.icon && item.icon}
                  {CapitalizeFirstLetter(item.name.toString())}
                </BreadcrumbItem>
              );
            }

            return (
              <Fragment key={item.name}>
                <BreadcrumbItem className='flex items-center text-primary font-medium'>
                  {item.icon}
                  <Link
                    className='underline hover:text-secondary'
                    href={item.href}
                  >
                    {CapitalizeFirstLetter(item.name.toString())}
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbCustom;
