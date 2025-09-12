import { memo } from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <Link to="/">
          <img src="./aga-logo.jpeg" alt="Logo" className="w-[48px] h-[48px] rounded-full" />
        </Link>
      </div>
    </div>
  );
};

const MemoizedLogo = memo(Logo);

export default MemoizedLogo;
