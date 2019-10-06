import React, { useEffect, ReactChildren } from "react";
import { resizingHelper } from "Table/helper";
interface IResizableProps {
  children: any;
  isActive?: boolean;
  parentWrapperProps?: any;
  column: any;
  index: number;
  minWidth: number;
  isMouseEventDisabled: boolean;
  setMouseEvents: (isMouseEventDisabled: boolean) => void;
  onResize: (event: any, column: any, index: number) => void;
}
export const Resizable: React.FunctionComponent<IResizableProps> = (
  props: IResizableProps
) => {
  const {
    children,
    isActive,
    parentWrapperProps,
    column,
    index,
    minWidth,
    isMouseEventDisabled,
    setMouseEvents,
    onResize
  } = props;
  const handleResizing = (event: any, column: any, index: number) => {
    /*The logic for calculating new column header width on resizing. 
        No state updates here.*/
    const resize = (e: any) => {
      e.clientX - targetDiv.getBoundingClientRect().left >= minWidth
        ? (targetDiv.style.width = `${e.clientX -
            targetDiv.getBoundingClientRect().left}px`)
        : (targetDiv.style.width = `${minWidth}px`);
    };
    /*The logic for calculating new column header width when resizing stops. */
    const stopResize = (e: any) => {
      let width: number =
        e.clientX - targetDiv.getBoundingClientRect().left >= minWidth
          ? e.clientX - targetDiv.getBoundingClientRect().left
          : minWidth;
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResize);
      onResize(width, column, index);
    };
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
    let resizeHandle = event.target;
    let targetDiv = resizeHandle.parentNode;
  };
  return (
    <div
      className={isActive ? "resizableBox active" : "resizableBox"}
      ref={parentWrapperProps ? parentWrapperProps.innerRef : null}
      {...(parentWrapperProps
        ? { ...parentWrapperProps.draggableProps }
        : null)}
      {...(parentWrapperProps
        ? { ...parentWrapperProps.dragHandleProps }
        : null)}
      style={{
        width: column.width,
        minWidth: minWidth,
        ...(parentWrapperProps
          ? { ...parentWrapperProps.draggableProps.style }
          : null)
      }}
    >
      {children}
      <div
        className="resizeHandle"
        onMouseDown={e => handleResizing(e, column, index)}
        onMouseOver={e =>
          isMouseEventDisabled !== true
            ? setMouseEvents(true)
            : e.preventDefault()
        }
        onMouseLeave={e =>
          isMouseEventDisabled !== false
            ? setMouseEvents(false)
            : e.preventDefault()
        }
      />
    </div>
  );
};
