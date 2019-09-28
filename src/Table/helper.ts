//The helper for dragging logic
const sortingHelper = (rows: any, sortColumn: string, isAsc: boolean) => {
  let sortedRows = sortRows(rows, sortColumn, isAsc ? "ASC" : "DESC");
  let isAscFlag = !isAsc;
  return { sortedRows, sortColumn, isAscFlag };
};
const sortRows = (rows: any, sortColumn: any, sortDirection: string) => {
  const comparer: any = (a: any, b: any) => {
    if (sortDirection === "ASC") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else if (sortDirection === "DESC") {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  };
  return sortDirection === "NONE" ? rows : [...rows].sort(comparer);
};
//The helper for dragging logic
const draggingHelper = (columns: any, rows: any, result: any) => {
  //removes column from starting index and puts it into the ending index of the columns array
  const reorderColumns = (
    tableColumns: any,
    startIndex: number,
    endIndex: number
  ) => {
    const result = [...tableColumns];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  /*iterates over all the rows of the table and removes ith row's draggedColumn key:value pair from starting index and puts it 
    into the ending index of the row object*/
  const reorderRows = (
    tableRows: any,
    startIndex: number,
    endIndex: number
  ) => {
    let updatedRows = tableRows.map((row: any) => {
      let rowKeys = Object.keys(row);
      let rowValues = Object.values(row);
      let [removedKey] = rowKeys.splice(startIndex, 1);
      rowKeys.splice(endIndex, 0, removedKey);
      let [removedValue] = rowValues.splice(startIndex, 1);
      rowValues.splice(endIndex, 0, removedValue);
      let updatedRow: any = {};
      rowKeys.map((rowKey, index) => {
        updatedRow[rowKey] = rowValues[index];
      });
      return updatedRow;
    });
    return updatedRows;
  };
  //if dragged column is dropped out of list

  if (!result.destination) {
    return { updatedColumns: columns, updatedRows: rows };
  }
  const updatedColumns: any = reorderColumns(
    columns,
    result.source.index,
    result.destination.index
  );
  const updatedRows: any = reorderRows(
    rows,
    result.source.index,
    result.destination.index
  );
  return { updatedColumns, updatedRows };
};
//The helper for resizing logic
const resizingHelper = (
  fixedWidth: number,
  parentWidth: number,
  minWidth: number,
  columns: any,
  setParentWidth: any,
  setColums: any
) => {
  return (event: any, column: any, index: number) => {
    /*The logic for calculating new column header width on resizing. 
      No state updates here.*/
    const resize = (e: any) => {
      e.clientX - targetDiv.getBoundingClientRect().left >= minWidth
        ? (targetDiv.style.width = `${e.clientX -
            targetDiv.getBoundingClientRect().left}px`)
        : (targetDiv.style.width = `${minWidth}px`);
    };
    /*The logic for calculating new column header width when resizing stops. 
      State updates here.*/
    const stopResize = (e: any) => {
      let width: number =
        e.clientX - targetDiv.getBoundingClientRect().left >= minWidth
          ? e.clientX - targetDiv.getBoundingClientRect().left
          : minWidth;
      let updatedColumns = [...columns];
      updatedColumns[index] = { ...column, width };
      let updatedParentWidth = parentWidth;
      updatedParentWidth -= column.width;
      updatedParentWidth += width;
      if (updatedParentWidth < fixedWidth) {
        updatedColumns.map((col: any) => {
          if (col.key !== column.key)
            col.width +=
              (fixedWidth - updatedParentWidth) / (columns.length - 1);
        });
        updatedParentWidth = fixedWidth;
      }
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResize);
      setParentWidth(updatedParentWidth);
      setColums(updatedColumns);
    };
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
    let resizeHandle = event.target;
    let targetDiv = resizeHandle.parentNode;
  };
};
export { sortingHelper, draggingHelper, resizingHelper };
