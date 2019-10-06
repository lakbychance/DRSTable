import React, { useState } from "react";
interface ISortableProps {
  children: any;
  isSortingEnabled: boolean;
  isActive?: boolean;
  sortSelector: string;
  isAsc: boolean;
  onSorting: (sorter: () => number, column: string) => void;
}
export const Sortable: React.FunctionComponent<ISortableProps> = (
  props: ISortableProps
) => {
  const {
    children,
    isSortingEnabled,
    isActive,
    sortSelector,
    isAsc,
    onSorting
  } = props;
  const comparer: any = (a: any, b: any) => {
    if (isAsc) {
      return a[sortSelector] > b[sortSelector] ? 1 : -1;
    } else {
      return a[sortSelector] < b[sortSelector] ? 1 : -1;
    }
  };
  const handleSorting = (sortSelector: string) => {
    onSorting(comparer, sortSelector);
  };
  return (
    <div
      onClick={e =>
        isSortingEnabled ? handleSorting(sortSelector) : e.preventDefault()
      }
      className="contentBox"
    >
      <div>
        {children}
        <div className={isActive ? (isAsc ? "arrow-down" : "arrow-up") : ""} />
      </div>
    </div>
  );
};
