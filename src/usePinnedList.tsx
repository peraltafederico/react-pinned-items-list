import { get } from "lodash";
import { useState } from "react";
import useCheckList from "./useCheckList";

type Props<T> = {
  initialList: T;
  idPath?: string;
};

const usePinnedList = <T extends Array<any>>({
  initialList,
  idPath
}: Props<T>) => {
  const [pinnedList, setPinnedList] = useState(initialList);

  const getId = (item: any) => {
    if (idPath) {
      return get(item, idPath);
    }
    return item;
  };

  const findInitialIndex = (item: any) =>
    initialList.findIndex((i) => getId(i) === getId(item));

  const handleReorder = (id: string, pin: boolean, pinned: any[]) => {
    const newList = [...pinnedList] as T;

    const index = newList.findIndex((i) => getId(i) === id);
    const item = newList[index];

    if (pin) {
      newList.splice(index, 1);

      newList.unshift(item);
    } else {
      const initialIndex = findInitialIndex(item);
      const currentChecked = pinned.length - 1;

      newList.splice(index, 1);
      newList.splice(initialIndex, 0, item);

      if (initialIndex < currentChecked) {
        const newItems = newList.splice(
          initialIndex + 1,
          currentChecked - initialIndex
        );

        newList.splice(initialIndex, 0, ...newItems);
      }

      const itemsToSort = [...newList].splice(currentChecked);

      const orderedItems = itemsToSort.sort(
        (a, b) => findInitialIndex(a) - findInitialIndex(b)
      );

      newList.splice(
        currentChecked,
        newList.length - currentChecked,
        ...orderedItems
      );
    }

    setPinnedList(newList);
  };

  const { isChecked, handleChange, checked } = useCheckList({
    defaultChecked: [],
    onChecked: (id) => handleReorder(id, true, checked),
    onUnchecked: (id) => handleReorder(id, false, checked)
  });

  return {
    pinnedList,
    handleChange,
    isPinned: isChecked
  };
};

export default usePinnedList;
