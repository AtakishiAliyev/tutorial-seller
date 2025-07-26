import { Listbox, Transition } from '@headlessui/react';
import { cn } from '@presentation/shared/utils/cn.ts';
import { Check, ChevronsUpDown } from 'lucide-react';
import { createContext, Fragment, memo, ReactNode, useContext } from 'react';

// --- Контекст для стилизации вариантов ---
type SelectVariant = 'default' | 'error' | 'success';

interface SelectContextValue {
  variant: SelectVariant;
}

const SelectContext = createContext<SelectContextValue>({
  variant: 'default',
});

const useSelectContext = () => useContext(SelectContext);

// --- Компоненты Select ---

// 1. Root - Корневой компонент, обертка над Listbox
interface SelectRootProps<T> {
  children: ReactNode;
  value: T;
  onChange: (value: T) => void;
  className?: string;
  variant?: SelectVariant;
}

// Делаем Root дженериком, чтобы принимать любой тип value
function SelectRoot<T>({
  children,
  value,
  onChange,
  className,
  variant = 'default',
}: SelectRootProps<T>) {
  return (
    <Listbox value={value} onChange={onChange}>
      <SelectContext.Provider value={{ variant }}>
        <div className={cn('w-full relative', className)}>{children}</div>
      </SelectContext.Provider>
    </Listbox>
  );
}

// 2. Label - Заголовок для селекта
interface SelectLabelProps {
  children: ReactNode;
  className?: string;
}

const SelectLabel = ({ children, className }: SelectLabelProps) => (
  // Используем Listbox.Label для доступности
  <Listbox.Label className={cn('mb-2 block text-sm font-medium text-gray-700', className)}>
    {children}
  </Listbox.Label>
);

// 3. Button - Кнопка, которая открывает список
const variantClasses: Record<SelectVariant, string> = {
  default: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
  error: 'border-red-300 focus:ring-red-500 focus:border-red-500 text-red-900',
  success: 'border-green-300 focus:ring-green-500 focus:border-green-500 text-green-900',
};

interface SelectButtonProps {
  children: ReactNode;
  className?: string;
  placeholder?: string;
}

const SelectButton = ({ children, className, placeholder }: SelectButtonProps) => {
  const { variant } = useSelectContext();
  return (
    // Используем Listbox.Button
    <Listbox.Button
      className={cn(
        'relative w-full cursor-default rounded-lg border bg-white py-2.5 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 sm:text-sm transition-colors duration-200',
        variantClasses[variant],
        className,
      )}
    >
      <span className="block truncate">{children || placeholder}</span>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
    </Listbox.Button>
  );
};

// 4. Options - Выпадающий контейнер для опций
interface SelectOptionsProps {
  children: ReactNode;
  className?: string;
}

const SelectOptions = ({ children, className }: SelectOptionsProps) => (
  <Transition
    as={Fragment}
    leave="transition ease-in duration-100"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    {/* Используем Listbox.Options */}
    <Listbox.Options
      className={cn(
        'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
        className,
      )}
    >
      {children}
    </Listbox.Options>
  </Transition>
);

// 5. Option - Отдельная опция в списке
interface SelectOptionProps<T> {
  children: ReactNode;
  value: T;
  className?: string;
}

function SelectOption<T>({ children, className, value }: SelectOptionProps<T>) {
  return (
    // Используем Listbox.Option
    <Listbox.Option
      className={({ active }) =>
        cn(
          'relative cursor-default select-none py-2 pl-10 pr-4',
          active ? 'bg-blue-100 text-blue-900' : 'text-gray-900',
          className,
        )
      }
      value={value}
    >
      {({ selected }) => (
        <>
          <span className={cn('block truncate', selected ? 'font-medium' : 'font-normal')}>
            {children}
          </span>
          {selected ? (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
              <Check className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  );
}

// --- Финальный экспорт ---
// Экспортируем все компоненты в одном объекте для удобного использования
export const Select = {
  Root: SelectRoot,
  Label: memo(SelectLabel),
  Button: memo(SelectButton),
  Options: memo(SelectOptions),
  Option: SelectOption, // Дженерики не очень дружат с memo, оставляем так
};
