import { Select } from '@presentation/shared/ui/Select';
import { memo, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

type SortValue = 'ASC' | 'DESC';

const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: 'DESC', label: 'По убыванию' },
  { value: 'ASC', label: 'По возрастанию' },
];

interface SortDropdownProps {
  // Опциональные пропсы для работы как "контролируемый" компонент
  currentValue?: SortValue;
  onChange?: (value: SortValue) => void;
  // Опциональный ключ для работы с URL
  queryKey?: string;
  // Общие пропсы
  label?: string;
  className?: string;
}

const SortDropdown = ({
  currentValue: controlledValue,
  onChange: controlledOnChange,
  queryKey,
  label,
  className,
}: SortDropdownProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Определяем текущее значение с учетом приоритетов:
  // controlledValue > значение из URL > значение по умолчанию.
  const value = useMemo((): SortValue => {
    if (controlledValue) {
      return controlledValue;
    }
    if (queryKey) {
      const paramValue = searchParams.get(queryKey);
      if (paramValue === 'ASC' || paramValue === 'DESC') {
        return paramValue;
      }
    }
    return 'DESC'; // Значение по умолчанию
  }, [controlledValue, queryKey, searchParams]);

  // 2. Определяем обработчик изменений:
  // Приоритет у controlledOnChange, иначе работаем с URL.
  const handleChange = (newValue: SortValue) => {
    if (controlledOnChange) {
      controlledOnChange(newValue);
    } else if (queryKey) {
      setSearchParams(
        prev => {
          const newParams = new URLSearchParams(prev);
          newParams.set(queryKey, newValue);
          return newParams;
        },
        { replace: true },
      );
    }
    // Если не передан ни `onChange`, ни `queryKey`, компонент будет read-only.
  };

  // 3. Находим метку для отображения в кнопке.
  const selectedOptionLabel = SORT_OPTIONS.find(opt => opt.value === value)?.label;

  return (
    <Select.Root value={value} onChange={handleChange} className={className}>
      {label && <Select.Label>{label}</Select.Label>}
      <Select.Button>{selectedOptionLabel}</Select.Button>
      <Select.Options>
        {SORT_OPTIONS.map(option => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select.Options>
    </Select.Root>
  );
};

const MemoizedSortDropdown = memo(SortDropdown);

export default memo(MemoizedSortDropdown);
