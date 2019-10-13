A Table component created using TypeScript with resizable ,draggable and sortable columns. The Draggable feature is possible due to use of react-beautiful-dnd library which can be found here https://github.com/atlassian/react-beautiful-dnd. A Resizable wrapper componenet has been created to give its children resizing capabilities and lodash's orderBy is used for achieving sorting by column keys. The Table has been created using CSS grid and flexbox instead of standard table tags.

CodeSanbox url:-
https://codesandbox.io/s/github/lapstjup/DRSTable/tree/master/?fontsize=14

Running:
Clone the repo and run npm install to install the required node modules. Then run npm start.

Usage:
The DRSTable componenet takes 4 props namely initialRows,initialColumns,fixedWidth and minWidth.
Suppose you have 3 columns namely id,name and age.
Then initialRows will be an array of objects like [{id:1,name:'Richard',age:49},{id:2,name:'Chandler',age:29},{id:3,name:'Joey',age:28}].
And initialColumns will be an array of objects like [{key:'id',name:'Id'},{key:'name',name:'Name'},{key:'age',name:'Age'}].
The fixedWidth is the minimum width of the table that should be maintained while resizing columns.
The minWidth is the minimum width for all columns.

For the ease of demonstration, data.ts file has been provided which is used to generate random data for the table using faker module.
