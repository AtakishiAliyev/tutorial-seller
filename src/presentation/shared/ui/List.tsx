import { FC, HTMLAttributes, isValidElement, memo } from 'react';
import { Children } from 'react';

type ListProps = HTMLAttributes<HTMLUListElement>;

const List: FC<ListProps> = props => {
  const { children, ...rest } = props;

  const childrenWithLi = Children.toArray(children).map((child, i) => {
    const key = isValidElement(child) && child.key ? child.key : i;

    return <li key={key}>{child}</li>;
  });

  return <ul {...rest}>{childrenWithLi}</ul>;
};

const MemoizedList = memo(List);

export default MemoizedList;
