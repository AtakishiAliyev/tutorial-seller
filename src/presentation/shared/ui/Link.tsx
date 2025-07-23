import { cn } from '@presentation/shared/utils/cn.ts';
import { memo } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

type LinkVariant = 'primary' | 'secondary' | 'muted' | 'danger';

interface LinkProps extends Omit<RouterLinkProps, 'to'> {
  to?: string;
  href?: string;
  variant?: LinkVariant;
  className?: string;
}

const variantClasses: Record<LinkVariant, string> = {
  primary: 'text-red-600 hover:text-red-500',
  secondary: 'text-blue-600 hover:text-blue-800',
  muted: 'text-gray-500 hover:text-gray-700',
  danger: 'text-red-700 hover:text-red-900',
};

const Link = ({ to, href, variant = 'primary', className, children, ...props }: LinkProps) => {
  const url = to || href || '#';
  const isExternal = url.startsWith('http') || url.startsWith('mailto') || url.startsWith('tel');

  const classes = cn(
    'font-medium transition-colors duration-200',
    variantClasses[variant],
    className,
  );

  if (isExternal) {
    return (
      <a href={url} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={url} className={classes} {...props}>
      {children}
    </RouterLink>
  );
};

const MemoizedLink = memo(Link);

export default MemoizedLink;
