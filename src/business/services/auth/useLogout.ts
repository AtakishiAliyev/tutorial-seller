import { showToasts } from '@business/shared/utils/showToasts.ts';
import { deleteAccessToken } from '@infra/shared/utils/deleteAccessToken.ts';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

const useLogout = () => {
  const queryClient = useQueryClient();

  const handleLogout = useCallback(async () => {
    deleteAccessToken();
    showToasts('Siz hesabınızdan uğurla çıxdınız', 'success');
    await queryClient.invalidateQueries({
      queryKey: ['users'],
      exact: false,
    });
    await queryClient.refetchQueries({
      queryKey: ['users'],
      exact: false,
    });
    queryClient.clear();
  }, [queryClient]);

  return {
    logout: handleLogout,
  };
};

export default useLogout;
