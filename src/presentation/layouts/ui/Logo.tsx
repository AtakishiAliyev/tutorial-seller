import { memo } from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold text-red-600 tracking-tight">YouTube</h1>
      </div>
    </div>
  );
};

const MemoizedLogo = memo(Logo);

export default MemoizedLogo;
