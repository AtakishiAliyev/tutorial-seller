import { cn } from '@presentation/shared/utils/cn.ts';
import { FC } from 'react';

type FallbackProps = {
  isFullScreen?: boolean;
  className?: string;
};

const Fallback: FC<FallbackProps> = ({ isFullScreen = true, className = '' }) => {
  return (
    <div
      className={cn({
        'h-[100dvh] w-[100vw] flex items-center justify-center': isFullScreen,
        [className]: className,
      })}
    >
      <span className="loader"></span>
    </div>
  );
};

export default Fallback;
