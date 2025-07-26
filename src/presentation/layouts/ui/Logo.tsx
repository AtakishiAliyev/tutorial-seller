import { memo } from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <Link to="/">
          <h1 className="text-2xl font-bold text-red-600 tracking-tight">YouTube</h1>
        </Link>
      </div>
    </div>
  );
};

const MemoizedLogo = memo(Logo);

export default MemoizedLogo;
