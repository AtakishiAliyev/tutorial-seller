import { Transition } from '@headlessui/react';
import { cn } from '@presentation/shared/utils/cn';
import { FC, Fragment, memo } from 'react';

interface ErrorBoxProps {
  messages?: string | string[];
  className?: string;
}

const ErrorBox: FC<ErrorBoxProps> = ({ messages, className }) => {
  if (!messages) return null;

  // Нормализуем в массив строк
  const msgs = Array.isArray(messages) ? messages : [messages];

  return (
    <Transition
      show={msgs.length > 0}
      as={Fragment}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        role="alert"
        className={cn(
          'mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg',
          className,
        )}
      >
        {msgs.length > 1 ? (
          <ul className="list-disc list-inside space-y-1 text-sm">
            {msgs.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm">{msgs[0]}</p>
        )}
      </div>
    </Transition>
  );
};

const MemoizedErrorBox = memo(ErrorBox);

export default MemoizedErrorBox;
