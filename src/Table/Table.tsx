import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Table.scss";
import { orderBy } from "lodash";
import { draggingHelper, resizingHelper } from "./helper";
import { Resizable } from "../Resizable/Resizable";
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
  const [rows, setRows] = useState(initialRows);
  const [parentWidth, setParentWidth] = useState(fixedWidth);
  const [isAsc, setAscFlag] = useState(true);
  const [isDragDisabled, setDragDisabled] = useState(false);
  const [activeColumn, setActiveColumn] = useState("");
  const resizingHelperForWidth = resizingHelper(fixedWidth);
  const handleSorting = (column: string) => {
    const sortedRows = orderBy(
      rows,
      row => row[column].content,
      isAsc ? "asc" : "desc"
    );
    setRows(sortedRows);
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
    <div className="drsTable" style={{ width: `${parentWidth}px` }}>
      <div className="thead">
        <DragDropContext onDragEnd={handleDragging}>
          <Droppable droppableId="droppable" direction="horizontal">
            {provided => (
              <div ref={provided.innerRef}>
                {columns.map((column: any, index: number) => (
                  <Draggable
                    key={column.key}
                    draggableId={column.key}
                    isDragDisabled={isDragDisabled}
                    index={index}
                  >
                    {provided => (
                      <Resizable
                        isActive={activeColumn === column.key}
                        isMouseEventDisabled={isDragDisabled}
                        setMouseEvents={setDragDisabled}
                        column={column}
                        minWidth={minWidth}
                        parentWrapperProps={provided}
                        index={index}
                        onResize={handleResizing}
                      >
                        <div
                          onClick={e =>
                            !isDragDisabled
                              ? handleSorting(column.key)
                              : e.preventDefault()
                          }
                          className="contentBox"
                        >
                          <div>
                            <span>{column.name}</span>
                            <div
                              className={
                                activeColumn === column.key
                                  ? isAsc
                                    ? "arrow-down"
                                    : "arrow-up"
                                  : "noarrow"
                              }
                            />
                          </div>
                        </div>
                      </Resizable>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="tbody">
        {rows.map((row: any, index: number) => (
          <div key={index}>
            {Object.keys(row).map((key: any, index: number) => (
              <div
                key={index}
                style={{ width: `${columns[index].width}px` }}
                className={activeColumn === key ? "rowData active" : "rowData"}
              >
                <div style={row[key].style}>{row[key].content}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
