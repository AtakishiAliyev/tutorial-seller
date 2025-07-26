import { Input, InputProps } from '@presentation/shared/ui/Input';
import debounce from 'debounce';
import { ChangeEvent, memo, ReactNode, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SearchInputProps extends Omit<InputProps, 'onChange' | 'value'> {
  onChange?: (value: string) => void;
  currentValue?: string;
  queryKey?: string;
  debounceTimeout?: number;
  leftIcon?: ReactNode;
}

const SearchInput = ({
  onChange,
  currentValue,
  queryKey,
  debounceTimeout = 500,
  leftIcon,
  ...rest
}: SearchInputProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Determine the external value from props or URL
  const externalValue = useMemo(() => {
    if (currentValue !== undefined) return currentValue;
    if (queryKey) return searchParams.get(queryKey) || '';
    return '';
  }, [currentValue, queryKey, searchParams]);

  const [internalValue, setInternalValue] = useState<string>(externalValue);

  // Sync internal state when externalValue changes
  useEffect(() => {
    setInternalValue(externalValue);
  }, [externalValue]);

  // Debounced updater for onChange or URL param
  const debouncedUpdate = useMemo(
    () =>
      debounce((newValue: string) => {
        if (onChange) {
          onChange(newValue);
        } else if (queryKey) {
          setSearchParams(
            prev => {
              const newParams = new URLSearchParams(prev);
              if (newValue) {
                newParams.set(queryKey, newValue);
              } else {
                newParams.delete(queryKey);
              }
              return newParams;
            },
            { replace: true },
          );
        }
      }, debounceTimeout),
    [onChange, queryKey, debounceTimeout, setSearchParams],
  );

  useEffect(() => {
    return () => {
      if (debouncedUpdate.clear) debouncedUpdate.clear();
    };
  }, [debouncedUpdate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    debouncedUpdate(newValue);
  };

  return (
    <Input.Group>
      <Input
        type="search"
        value={internalValue}
        onChange={handleChange}
        leftIcon={leftIcon}
        {...rest}
      />
    </Input.Group>
  );
};

const MemoizedSearchInput = memo(SearchInput);

export default MemoizedSearchInput;
