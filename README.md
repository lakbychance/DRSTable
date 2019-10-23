### A Table component created using TypeScript with resizable ,draggable and sortable columns. The Draggable feature is possible due to use of react-beautiful-dnd library which can be found here https://github.com/atlassian/react-beautiful-dnd. A Resizable wrapper component has been created to give its children resizing capabilities and lodash's orderBy is used for achieving sorting by column keys. The Table has been created using CSS grid and flexbox instead of standard table tags.**

<hr/>

### CodeSanbox url:-
**https://codesandbox.io/s/github/lapstjup/DRSTable/tree/master/?fontsize=14**

<hr/>

### Running:
**Clone the repo and run npm install to install the required node modules. Then run npm start**.

<hr/>

### Usage:
**The DRSTable component takes 4 props namely initialRows, initialColumns, fixedWidth and minWidth.<br/>
Suppose you have 3 columns namely id,name and age and respective rows with the following structure :**
```javascript
 const rows = [
 {id : {content : 1}, name : {content : 'Richard'}, age : {content : 49}},
 {id : {content : 2}, name : {content : 'Chandler', style : {color:'green'}}, age : {content : 29}}
 ]

 const columns = [
 {key : 'id', name : 'Id'},
 {key : 'name', name : 'Name'},
 {key : 'age' ,name : 'Age'}
 ]
 ```
**The fixedWidth is the minimum width of the table that should be maintained while resizing columns. The unit of this value is px.**

```javascript 
const chosenWidth = 1000
```

**The minWidth is the minimum width for all columns.**

```javascript 
const minimumWidth = 40
```

**So the usage of component will look like:**

```javascript
<DRSTable 
  initialRows={rows} 
  initialColumns={columns} 
  fixedWidth={chosenWidth}
  minWidth={minimumWidth}
  />
```
<hr/>

### For the ease of demonstration, data.ts file has been provided which is used to generate random data for the table using faker module.

