import Text from '@presentation/shared/ui/Typography.tsx';
import { cn } from '@presentation/shared/utils/cn.ts';
import { memo } from 'react';

interface DividerProps {
  text?: string;
  className?: string;
}

const Divider = ({ text, className }: DividerProps) => {
  return (
    <div className={cn('relative my-6', className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      {text && (
        <div className="relative flex justify-center">
          <span className="px-2 bg-white">
            <Text color="muted">{text}</Text>
          </span>
        </div>
      )}
    </div>
  );
};

const MemoizedDivider = memo(Divider);

export default MemoizedDivider;
