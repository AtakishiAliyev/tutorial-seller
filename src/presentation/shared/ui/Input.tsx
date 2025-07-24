import { Input as HeadlessInput } from '@headlessui/react';
import Text from '@presentation/shared/ui/Typography.tsx';
import { cn } from '@presentation/shared/utils/cn.ts';
import { createContext, InputHTMLAttributes, memo, ReactNode, useContext } from 'react';

type InputSize = 'sm' | 'md' | 'lg';
type InputVariant = 'default' | 'error' | 'success';

// Контекст для передачи состояния между компонентами
interface InputContextValue {
  size: InputSize;
  variant: InputVariant;
  id?: string;
}

const InputContext = createContext<InputContextValue>({
  size: 'md',
  variant: 'default',
});

const useInputContext = () => useContext(InputContext);

// Input.Group
interface InputGroupProps {
  children: ReactNode;
  size?: InputSize;
  variant?: InputVariant;
  className?: string;
  id?: string;
}

const InputGroup = ({
  children,
  size = 'md',
  variant = 'default',
  className,
  id,
}: InputGroupProps) => {
  return (
    <InputContext.Provider value={{ size, variant, id }}>
      <div className={cn('w-full', className)}>{children}</div>
    </InputContext.Provider>
  );
};

const MemoizedInputGroup = memo(InputGroup);

interface InputRowProps {
  children: ReactNode;
  className?: string;
}

const InputRow = ({ children, className }: InputRowProps) => {
  // Используем fieldset для семантической группировки полей
  return <fieldset className={cn('flex w-full items-start gap-4', className)}>{children}</fieldset>;
};

const MemoizedInputRow = memo(InputRow);

// Input.Label
interface InputLabelProps {
  children: ReactNode;
  className?: string;
  htmlFor?: string;
}

const InputLabel = ({ children, className, htmlFor }: InputLabelProps) => {
  const { id } = useInputContext();

  return (
    <Text size="subtitle" weight="medium" color="secondary" className={cn('mb-2 block', className)}>
      <label htmlFor={htmlFor || id || ''}>{children}</label>
    </Text>
  );
};

const MemoizedInputLabel = memo(InputLabel);

// Input.ErrorMessage
interface InputErrorMessageProps {
  children: ReactNode;
  className?: string;
}

const InputErrorMessage = ({ children, className }: InputErrorMessageProps) => {
  return (
    <Text size="caption" color="error" className={cn('mt-1', className)}>
      {children}
    </Text>
  );
};

const MemoizedInputErrorMessage = memo(InputErrorMessage);

// Input.HelperMessage
interface InputHelperMessageProps {
  children: ReactNode;
  className?: string;
}

const InputHelperMessage = ({ children, className }: InputHelperMessageProps) => {
  return (
    <Text size="caption" color="muted" className={cn('mt-1', className)}>
      {children}
    </Text>
  );
};

const MemoizedInputHelperMessage = memo(InputHelperMessage);

// Основной Input компонент
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'py-2 px-3 text-sm',
  md: 'py-2.5 px-4 text-base',
  lg: 'py-3 px-4 text-lg',
};

const variantClasses: Record<InputVariant, string> = {
  default: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
  error: 'border-red-300 focus:ring-red-500 focus:border-red-500 text-red-900',
  success: 'border-green-300 focus:ring-green-500 focus:border-green-500 text-green-900',
};

const InputComponent = ({ leftIcon, rightIcon, className, ...props }: InputProps) => {
  const { size, variant, id } = useInputContext();

  return (
    <div className="relative rounded-md">
      {leftIcon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {leftIcon}
        </div>
      )}

      <HeadlessInput
        id={id}
        className={cn(
          'block w-full rounded-lg border shadow-sm focus:outline-none focus:ring-1 transition-colors duration-200',
          sizeClasses[size],
          variantClasses[variant],
          leftIcon ? 'pl-10' : 'pl-3',
          rightIcon ? 'pr-10' : 'pr-3',
          className,
        )}
        {...props}
      />

      {rightIcon && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">{rightIcon}</div>
      )}
    </div>
  );
};

const MemoizedInputComponent = memo(InputComponent);

export const Input = Object.assign(MemoizedInputComponent, {
  Group: MemoizedInputGroup,
  Row: MemoizedInputRow,
  Label: MemoizedInputLabel,
  ErrorMessage: MemoizedInputErrorMessage,
  HelperMessage: MemoizedInputHelperMessage,
});

export type {
  InputErrorMessageProps,
  InputGroupProps,
  InputHelperMessageProps,
  InputLabelProps,
  InputRowProps,
};
