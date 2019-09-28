import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Table.scss";
import { sortingHelper, draggingHelper, resizingHelper } from "./helper";
export const DRSTable = (props: any) => {
  const { initialRows, initialColumns, fixedWidth, minWidth } = props;
  const [columns, setColumns] = useState(
    initialColumns.map((column: any) => ({
      ...column,
      width: fixedWidth / initialColumns.length
    }))
  );
  const [parentWidth, setParentWidth] = useState(fixedWidth);
  const [rows, setRows] = useState(initialRows);
  const [isAsc, setAscFlag] = useState(true);
  const [isDragDisabled, setDragDisabled] = useState(false);
  const [activeColumnn, setActiveColumn] = useState("");
  const handleSorting = (sortingColumn: string) => {
    let { isAscFlag, sortColumn, sortedRows } = sortingHelper(
      rows,
      sortingColumn,
      isAsc
    );
    setRows(sortedRows);
    setActiveColumn(sortColumn);
    setAscFlag(isAscFlag);
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
  const handleResizing = (event: any, column: any, index: number) => {
    resizingHelper(
      fixedWidth,
      parentWidth,
      minWidth,
      columns,
      setParentWidth,
      setColumns
    )(event, column, index);
  };
  return (
    <DragDropContext onDragEnd={handleDragging}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <table className="customTable">
            <thead
              ref={provided.innerRef}
              style={
                snapshot.isDraggingOver
                  ? { width: `${parentWidth}px`, background: "white" }
                  : { width: `${parentWidth}px` }
              }
            >
              <tr>
                {columns.map((column: any, index: any) => (
                  <th className={activeColumnn === column.key ? "active" : ""}>
                    <Draggable
                      key={column.key}
                      draggableId={column.key}
                      isDragDisabled={isDragDisabled}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className={
                            activeColumnn === column.key
                              ? "resizableBox active"
                              : "resizableBox"
                          }
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            width: column.width,
                            minWidth: minWidth,
                            ...provided.draggableProps.style
                          }}
                        >
                          <div
                            onClick={e =>
                              !snapshot.isDragging
                                ? handleSorting(column.key)
                                : e.preventDefault()
                            }
                            className="contentBox"
                          >
                            <div>
                              <span>{column.name}</span>
                              <div
                                className={
                                  activeColumnn === column.key
                                    ? isAsc
                                      ? "arrow-down"
                                      : "arrow-up"
                                    : ""
                                }
                              />
                            </div>
                          </div>
                          <div
                            className="resizeHandle"
                            onMouseDown={e => handleResizing(e, column, index)}
                            onMouseOver={e =>
                              isDragDisabled !== true
                                ? setDragDisabled(true)
                                : e.preventDefault()
                            }
                            onMouseLeave={e =>
                              isDragDisabled !== false
                                ? setDragDisabled(false)
                                : e.preventDefault()
                            }
                          />
                        </div>
                      )}
                    </Draggable>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row: any) => (
                <tr>
                  {Object.keys(row).map((key: any, index: number) => (
                    <td
                      className={activeColumnn === key ? "selectedColumn" : ""}
                    >
                      <div
                        style={{ width: `${columns[index].width}px` }}
                        className={
                          activeColumnn === key ? "selectedColumn" : ""
                        }
                      >
                        <span>{row[key]}</span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Droppable>
    </DragDropContext>
  );
};
