import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { NumbersItem } from '@app/types';
import type { TTableProps } from './types';
import { TableUi } from './table-ui';

export const Table: FC<TTableProps> = ({ items, updateItems, ...rest }) => {
  // положение курсора для перетаскивания
  const [yPos, setYPos] = useState(0);
  // индекс элемента, на который мы перемещаем
  const [newIndex, setNewIndex] = useState(0);
  // элемент, который мы перетаскиваем
  const [drugIndex, setDrugIndex] = useState(0);
  // флаг, что мы перетаскиваем элемент
  const [isDrug, setIsDrug] = useState(false);
  // флаг, для обновления итоговых перестроений (ref - во избежание ререндига)
  const doUpdate = useRef<boolean>(false);
  const refLi = useRef<HTMLLIElement>(null);
  const refUl = useRef<HTMLUListElement>(null);
  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!refUl.current || !refUl.current?.contains(e.target as Node)) {
        return;
      }
      setYPos(e.clientY);
      setIsDrug(true);
      if (e.target instanceof HTMLLIElement) {
        refLi.current = e.target;
      } else {
        const element = (e.target as HTMLElement).closest('li');
        if (element) {
          refLi.current = element;
        }
      }
      if (refLi.current) {
        const index = parseInt(refLi.current.dataset.index as string, 10);
        setDrugIndex(index);
        setNewIndex(index);
        refLi.current.classList.add('active');
      }
    },
    [isDrug]
  );
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (refLi.current && refUl.current && isDrug) {
        refLi.current.style.pointerEvents = 'none';
        const height = refLi.current.offsetHeight;
        const x = e.clientX;
        const y = e.clientY;
        // Получаем элемент под курсором по координатам
        const el = document.elementFromPoint(x, y);
        const delta = y - yPos;
        refLi.current.style.transform = `translateY(${delta}px)`;
        if (el instanceof HTMLLIElement) {
          const hoverIndex = parseInt(el.dataset.index as string, 10);
          setNewIndex(hoverIndex);
          const oldTransform =
            parseInt(el.dataset.transform as string, 10) || 0;
          const shift =
            drugIndex > hoverIndex
              ? height - oldTransform
              : -height - oldTransform;
          el.dataset.transform = shift.toString();
          el.style.transform = `translateY(${shift}px)`;
        }
      }
    },
    [isDrug]
  );
  const onMouseUp = useCallback(() => {
    if (!isDrug) {
      return;
    }
    setIsDrug(false);
    if (refLi.current) {
      refLi.current.style.pointerEvents = 'auto';
      refLi.current.classList.remove('active');
      refLi.current = null;
    }
  }, [isDrug]);
  useEffect(() => {
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    if (!isDrug && items && items.length && newIndex !== drugIndex) {
      const newItems = [...items];
      const [removed] = newItems.splice(drugIndex, 1);
      newItems.splice(newIndex, 0, removed);
      updateItems(newItems as NumbersItem[]);
      doUpdate.current = true;
      refUl.current?.querySelectorAll('li[style]').forEach((el) => {
        el.removeAttribute('style');
        el.removeAttribute('data-transform');
      });
    }
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDrug]);
  return <TableUi ref={refUl} items={items} {...rest} />;
};
