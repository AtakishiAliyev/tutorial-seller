import { Input, InputProps } from '@presentation/shared/ui/Input.tsx';
import { Eye, EyeOff } from 'lucide-react';
import { memo, useState } from 'react';

const PasswordInput = (props: Omit<InputProps, 'type' | 'rightIcon'>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      rightIcon={
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      }
      {...props}
    />
  );
};

const MemoizedPasswordInput = memo(PasswordInput);

export default MemoizedPasswordInput;
