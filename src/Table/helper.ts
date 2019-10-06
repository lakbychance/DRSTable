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
const resizingHelper = (fixedWidth: number) => {
  return (
    columns: any,
    width: number,
    column: any,
    index: number,
    parentWidth: number
  ) => {
    let updatedColumns = [...columns];
    updatedColumns[index] = { ...column, width };
    let updatedParentWidth = parentWidth;
    updatedParentWidth -= column.width;
    updatedParentWidth += width;
    if (updatedParentWidth < fixedWidth) {
      updatedColumns.map((col: any) => {
        if (col.key !== column.key)
          col.width += (fixedWidth - updatedParentWidth) / (columns.length - 1);
      });
      updatedParentWidth = fixedWidth;
    }
    return { updatedParentWidth, updatedColumns };
  };
};
export { draggingHelper, resizingHelper };
