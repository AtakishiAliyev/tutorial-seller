import {
  cloneElement,
  createContext,
  FC,
  isValidElement,
  MouseEvent,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from 'react';

type VisibilityState = Record<string, boolean>;

type VisibilityAction =
  | { type: 'TOGGLE'; key: string }
  | { type: 'SET'; key: string; value: boolean }
  | { type: 'RESET'; initial: VisibilityState };

interface VisibilityContextValue {
  state: VisibilityState;
  toggle: (key: string) => void;
  set: (key: string, value: boolean) => void;
  reset: (initial: VisibilityState) => void;
}

const VisibilityContext = createContext<VisibilityContextValue | undefined>(undefined);

function visibilityReducer(state: VisibilityState, action: VisibilityAction): VisibilityState {
  switch (action.type) {
    case 'TOGGLE':
      return { ...state, [action.key]: !state[action.key] };
    case 'SET':
      return { ...state, [action.key]: action.value };
    case 'RESET':
      return { ...action.initial };
    default:
      return state;
  }
}

interface VisibilityProviderProps {
  children: ReactNode;
  initialState?: VisibilityState;
}

export const VisibilityProvider: FC<VisibilityProviderProps> = ({
  children,
  initialState = {},
}) => {
  const [state, dispatch] = useReducer(visibilityReducer, initialState);

  const toggle = useCallback((key: string) => dispatch({ type: 'TOGGLE', key }), []);
  const set = useCallback(
    (key: string, value: boolean) => dispatch({ type: 'SET', key, value }),
    [],
  );
  const reset = useCallback((initial: VisibilityState) => dispatch({ type: 'RESET', initial }), []);

  return (
    <VisibilityContext.Provider value={{ state, toggle, set, reset }}>
      {children}
    </VisibilityContext.Provider>
  );
};

export function useVisibility(): VisibilityContextValue {
  const context = useContext(VisibilityContext);
  if (!context) {
    throw new Error('useVisibility must be used within a VisibilityProvider');
  }
  return context;
}

interface VisibilityTargetProps {
  children: ReactElement;
  targetKey: string;
  // …любой дополнительный пропс, например onClick
  [prop: string]: any;
}

export const VisibilityTarget: FC<VisibilityTargetProps> = ({
  children,
  targetKey,
  ...restProps
}) => {
  const { state } = useVisibility();
  const isOpen = Boolean(state[targetKey]);

  const newProps: Record<string, unknown> = {
    // сначала сохраняем все исходные пропсы дочернего элемента
    ...((children.props as Record<string, unknown>) || {}),
    // затем добавляем пропсы из <VisibilityTarget>
    ...restProps,
    // и в конце наш isOpen
    isOpen,
  };

  return cloneElement(children, newProps);
};

interface VisibilityTriggerProps {
  children: ReactElement;
  triggerKey: string;
}

export const VisibilityTrigger: FC<VisibilityTriggerProps> = ({ children, triggerKey }) => {
  const { toggle } = useVisibility();

  if (!children) {
    throw new Error('VisibilityTrigger requires a child element');
  }

  if (!isValidElement(children)) {
    throw new Error('VisibilityTrigger child must be a valid React element');
  }

  // @ts-expect-error Children first approach has bad TS support
  const existingOnClick = children?.props?.onClick as ((e: MouseEvent) => void) | undefined;

  const handleClick = (e: MouseEvent) => {
    existingOnClick?.(e);
    toggle(triggerKey);
  };

  // @ts-expect-error Children first approach has bad TS support
  return cloneElement(children, { onClick: handleClick, ...children?.props });
};
