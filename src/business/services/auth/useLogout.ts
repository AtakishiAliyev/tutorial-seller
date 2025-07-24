import { showToasts } from '@business/shared/utils/showToasts.ts';
import { deleteAccessToken } from '@infra/utils/deleteAccessToken.ts';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

const useLogout = () => {
  const queryClient = useQueryClient();

  const handleLogout = useCallback(async () => {
    deleteAccessToken();
    showToasts('Siz hesabınızdan uğurla çıxdınız', 'success');
    await queryClient.refetchQueries({
      queryKey: ['users', 'me'],
      exact: false,
    });
  }, [queryClient]);

  return {
    logout: handleLogout,
  };
};

export default useLogout;
