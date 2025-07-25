import { Button as HeadlessButton } from '@headlessui/react';
import { cn } from '@presentation/shared/utils/cn.ts';
import { ComponentPropsWithoutRef, ElementType, memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

// Базовые пропсы для всех вариантов
interface BaseButtonProps {
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  as?: ElementType;
  /** реальный HTML-атрибут type */
  htmlType?: 'button' | 'submit' | 'reset';
}

// Пропсы для нативной кнопки
interface ButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'type'>, BaseButtonProps {
  to?: never;
}

// Пропсы для Link-кнопки
interface LinkButtonProps extends Omit<LinkProps, 'type'>, BaseButtonProps {
  to: string;
}

// Объединённый тип
type CombinedButtonProps = ButtonProps | LinkButtonProps;

const isLink = (props: CombinedButtonProps): props is LinkButtonProps => {
  return 'to' in props && typeof props.to === 'string';
};

const Button = (props: CombinedButtonProps) => {
  const {
    variant = 'primary',
    className = '',
    disabled = false,
    htmlType = 'button',
    as,
    ...restProps
  } = props;

  // Общие стили
  const baseClasses = cn(
    'inline-flex items-center justify-center py-3 px-4 rounded-lg shadow-sm',
    'text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
    'transition-colors duration-200',
    disabled && 'opacity-70 cursor-not-allowed',
  );

  // Стили по вариантам
  const variantClasses = cn(
    variant === 'primary' && [
      'text-white bg-red-500 hover:bg-red-700 focus:ring-red-500',
      disabled && 'hover:bg-red-500',
    ],
    variant === 'secondary' && [
      'text-white bg-blue-500 hover:bg-blue-700 focus:ring-blue-500',
      disabled && 'hover:bg-blue-500',
    ],
    variant === 'outline' && [
      'border border-gray-300 bg-transparent text-gray-700',
      'hover:bg-gray-50 focus:ring-gray-500',
      disabled && 'hover:bg-transparent',
    ],
    variant === 'ghost' && [
      'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
      disabled && 'hover:bg-transparent',
    ],
  );

  const combinedClasses = cn(baseClasses, variantClasses, className);

  if (isLink(props)) {
    const { to, ...linkProps } = props;

    const { htmlType: _htmlType, className: _className, ...cleanLinkProps } = linkProps;

    return (
      <Link to={to} className={combinedClasses} aria-disabled={disabled} {...cleanLinkProps} />
    );
  }

  // Для кнопки — Headless Button
  const { ...buttonProps } = restProps as ButtonProps;

  return (
    <HeadlessButton
      as={as ?? 'button'}
      type={htmlType}
      className={combinedClasses}
      disabled={disabled}
      {...buttonProps}
    />
  );
};

const MemoizedButton = memo(Button);

export default MemoizedButton;
