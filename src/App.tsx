import React from "react";
import { DRSTable } from "./Table/Table";
import { initialRows, initialColumns } from "./data";
const App = () => (
  <DRSTable
    initialRows={initialRows}
    initialColumns={initialColumns}
    fixedWidth={window.screen.width}
    minWidth={50}
  />
);
export default App;
