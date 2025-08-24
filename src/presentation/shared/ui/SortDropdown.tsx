import { Select } from '@presentation/shared/ui/Select';
import { memo, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

type SortValue = 'ASC' | 'DESC';

const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: 'DESC', label: 'Azalan sırayla' },
  { value: 'ASC', label: 'Artan sırayla' },
];

interface SortDropdownProps {
  // "Kontrollü" komponent kimi işləmək üçün opsional props
  currentValue?: SortValue;
  onChange?: (value: SortValue) => void;
  // URL ilə işləmək üçün opsional açar
  queryKey?: string;
  // Ümumi props
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

  // 1. Cari dəyəri prioritetlərə görə təyin edirik:
  // controlledValue > URL-dən dəyər > default dəyər
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
    return 'DESC'; // Default dəyər
  }, [controlledValue, queryKey, searchParams]);

  // 2. Dəyişiklik handlerini təyin edirik:
  // Prioritet controlledOnChange-dədir, əks halda URL ilə işləyirik
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
    // Əgər nə `onChange`, nə də `queryKey` verilməyibsə, komponent read-only olacaq
  };

  // 3. Düymədə göstəriləcək etiketi tapırıq
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
