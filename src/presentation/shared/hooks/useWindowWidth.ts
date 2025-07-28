import { useLayoutEffect, useState } from 'react';

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useLayoutEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Инициализация и подписка на изменения
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};

export default useWindowWidth;
