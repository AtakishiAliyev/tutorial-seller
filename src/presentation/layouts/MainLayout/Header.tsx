import Logo from '@presentation/layouts/ui/Logo.tsx';
import AccountBox from '@presentation/widgets/user/AccountBox.tsx';
import { memo } from 'react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm px-4 sm:px-6 lg:px-8">
      <div className="container w-full">
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="flex justify-between items-center h-16">
            <Logo />
          </div>
          <AccountBox />
        </div>
      </div>
    </header>
  );
};

const MemoizedHeader = memo(Header);

export default MemoizedHeader;
