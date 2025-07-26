import Header from '@presentation/layouts/MainLayout/Header.tsx';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const MemoizedMainLayout = memo(MainLayout);

export default MemoizedMainLayout;
