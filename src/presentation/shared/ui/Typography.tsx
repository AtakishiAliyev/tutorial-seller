import { cn } from '@presentation/shared/utils/cn';
import React, { memo, ReactElement, ReactNode } from 'react';

type TextSize = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'subtitle' | 'caption';
type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
type TextColor = 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'warning';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  className?: string;
  children: ReactNode;
}

const sizeClasses: Record<TextSize, string> = {
  h1: 'text-3xl',
  h2: 'text-2xl',
  h3: 'text-xl',
  h4: 'text-lg',
  p: 'text-base',
  subtitle: 'text-sm',
  caption: 'text-xs',
};

const weightClasses: Record<TextWeight, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorClasses: Record<TextColor, string> = {
  primary: 'text-red-500 hover:text-red-600',
  secondary: 'text-gray-700',
  muted: 'text-gray-500',
  error: 'text-red-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
};

const Text = ({
  size = 'p',
  weight = 'normal',
  color = 'primary',
  className,
  children,
  ...props
}: TextProps) => {
  const classes = cn(sizeClasses[size], weightClasses[weight], colorClasses[color], className);

  if (React.isValidElement(children)) {
    const child = children as ReactElement;
    return React.cloneElement(child, {
      ...props,
      // @ts-expect-error Children first approach has bad TS support
      className: cn(child.props.className, classes),
      // @ts-expect-error Children first approach has bad TS support
      style: { ...child.props.style, ...props.style },
    });
  }

  return (
    <span {...props} className={classes}>
      {children}
    </span>
  );
};

const MemoizedText = memo(Text);

export default MemoizedText;
