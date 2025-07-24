import { cn } from '@presentation/shared/utils/cn.ts';
import { ClipboardEvent, KeyboardEvent, memo, useEffect, useRef, useState } from 'react';

const variantClasses = {
  default: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
  error: 'border-red-300 focus:ring-red-500 focus:border-red-500 text-red-900',
  success: 'border-green-300 focus:ring-green-500 focus:border-green-500 text-green-900',
};

type InputVariant = 'default' | 'error' | 'success';

interface OTPInputProps {
  length: 4 | 5 | 6;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  variant?: InputVariant;
}

const OTPInputComponent = ({
  length,
  value,
  onChange,
  onComplete,
  variant = 'default',
}: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Синхронизируем внутреннее состояние с внешним значением из react-hook-form
  useEffect(() => {
    const valueArray = value?.split('') || [];
    const newOtp = new Array(length).fill('').map((_, i) => valueArray[i] || '');
    setOtp(newOtp);
  }, [value, length]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const enteredValue = element.value;
    if (Number.isNaN(Number(enteredValue))) return; // Разрешаем только цифры

    const newOtp = [...otp];
    newOtp[index] = enteredValue.slice(-1); // Берем только последний введенный символ
    setOtp(newOtp);

    const combinedOtp = newOtp.join('');
    onChange(combinedOtp);

    // Если поле заполнено, переводим фокус на следующее
    if (enteredValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Если все поля заполнены, вызываем onComplete
    if (combinedOtp.length === length) {
      onComplete?.(combinedOtp);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // При нажатии Backspace на пустом поле, переводим фокус на предыдущее
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().slice(0, length);

    // Вставляем, только если данные являются строкой из цифр
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = new Array(length).fill('');
    pastedData.split('').forEach((char, index) => {
      newOtp[index] = char;
    });

    setOtp(newOtp);
    const combinedOtp = newOtp.join('');
    onChange(combinedOtp);

    // Устанавливаем фокус после вставленных данных
    const nextFocusIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextFocusIndex]?.focus();

    if (combinedOtp.length === length) {
      onComplete?.(combinedOtp);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2" onPaste={handlePaste}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={el => {
            if (el) {
              inputRefs.current[index] = el;
            }
          }}
          type="text"
          inputMode="numeric"
          pattern="\d{1}"
          maxLength={1}
          value={otp[index]}
          onChange={e => handleChange(e.target, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          onFocus={e => e.target.select()}
          className={cn(
            'flex h-14 w-14 items-center justify-center text-center text-2xl font-bold',
            'rounded-lg border shadow-sm transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            variantClasses[variant],
          )}
        />
      ))}
    </div>
  );
};

const MemoizedOTPInputComponent = memo(OTPInputComponent);

export default MemoizedOTPInputComponent;
