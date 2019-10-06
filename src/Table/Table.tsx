import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Table.scss";
import "../Sortable/Sortable";
import { draggingHelper, resizingHelper } from "./helper";
import { Resizable } from "../Resizable/Resizable";
import { Sortable } from "../Sortable/Sortable";
interface IDRSTableProps {
  initialRows: any[];
  initialColumns: any[];
  fixedWidth: number;
  minWidth: number;
}
export const DRSTable: React.FunctionComponent<IDRSTableProps> = (
  props: IDRSTableProps
) => {
  const { initialRows, initialColumns, fixedWidth, minWidth } = props;
  const [columns, setColumns] = useState(
    initialColumns.map((column: any) => ({
      ...column,
      width: fixedWidth / initialColumns.length
    }))
  );
  const resizingHelperForWidth = resizingHelper(fixedWidth);
  const [parentWidth, setParentWidth] = useState(fixedWidth);
  const [rows, setRows] = useState(initialRows);
  const [isAsc, setAscFlag] = useState(true);
  const [isDragDisabled, setDragDisabled] = useState(false);
  const [activeColumnn, setActiveColumn] = useState("");

  const handleSorting = (sorter: any, column: any) => {
    setRows([...rows].sort(sorter));
    setAscFlag(!isAsc);
    setActiveColumn(column);
  };
  const handleDragging = (result: any) => {
    let { updatedColumns, updatedRows }: any = draggingHelper(
      columns,
      rows,
      result
    );
    setColumns(updatedColumns);
    setRows(updatedRows);
  };
  const handleResizing = (width: number, column: any, index: number) => {
    let { updatedColumns, updatedParentWidth } = resizingHelperForWidth(
      columns,
      width,
      column,
      index,
      parentWidth
    );
    setColumns(updatedColumns);
    setParentWidth(updatedParentWidth);
  };
  return (
    <DragDropContext onDragEnd={handleDragging}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <div className="customTable" style={{ width: `${parentWidth}px` }}>
            <div className="thead" ref={provided.innerRef}>
              {columns.map((column: any, index: any) => (
                <Draggable
                  key={column.key}
                  draggableId={column.key}
                  isDragDisabled={isDragDisabled}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Resizable
                      isActive={activeColumnn === column.key}
                      isMouseEventDisabled={isDragDisabled}
                      setMouseEvents={setDragDisabled}
                      column={column}
                      minWidth={minWidth}
                      parentWrapperProps={provided}
                      index={index}
                      onResize={handleResizing}
                    >
                      <Sortable
                        isSortingEnabled={!snapshot.isDragging}
                        isActive={activeColumnn === column.key}
                        sortSelector={column.key}
                        isAsc={isAsc}
                        onSorting={handleSorting}
                      >
                        <span>{column.name}</span>
                      </Sortable>
                    </Resizable>
                  )}
                </Draggable>
              ))}
            </div>
            <div className="tbody">
              {rows.map((row: any) => (
                <div>
                  {Object.keys(row).map((key: any, index: number) => (
                    <div
                      style={{ width: `${columns[index].width}px` }}
                      className={activeColumnn === key ? "selectedColumn" : ""}
                    >
                      <span>{row[key]}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
