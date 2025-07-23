import { cn } from '@presentation/shared/utils/cn';
import { FC, memo } from 'react';

interface DividerWithTextProps {
  text: string;
  className?: string;
  paddingY?: string;
  textSize?: string;
}

const DividerWithText: FC<DividerWithTextProps> = ({
  text,
  className = '',
  paddingY = 'py-2',
  textSize = 'text-sm',
}) => {
  return (
    <div className={cn('flex items-center text-gray-500', paddingY, className)}>
      <div className="flex-grow border-t border-gray-300" />
      <span className={cn('mx-4', textSize)}>{text}</span>
      <div className="flex-grow border-t border-gray-300" />
    </div>
  );
};

const MemoizedDividerWithText = memo(DividerWithText);

export default MemoizedDividerWithText;
