import Text from '@presentation/shared/ui/Typography.tsx';
import { cn } from '@presentation/shared/utils/cn.ts';
import { memo, ReactNode } from 'react';

interface FormCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const FormCard = ({ title, subtitle, children, className }: FormCardProps) => {
  return (
    <div
      className={cn('bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-8', className)}
    >
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && (
            <Text color="secondary" weight="bold" size="h1" className="mb-2">
              <p>{title}</p>
            </Text>
          )}
          {subtitle && (
            <Text size="p" color="muted">
              <span>{subtitle}</span>
            </Text>
          )}
        </div>
      )}

      {children}
    </div>
  );
};

const MemoizedFormCard = memo(FormCard);

export default MemoizedFormCard;
