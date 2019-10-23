import faker from "faker";
const initialRows: any = [];
for (let i = 0; i < 30; i++) {
  initialRows.push({
    col1: {
      content: faker.random.alphaNumeric(8),
      style: {
        color: "brown",
        fontWeight: "bold"
      }
    },
    col2: {
      content: faker.name.lastName(),
      style: {
        color: "blue"
      }
    },
    col3: { content: faker.address.city() },
    col4: {
      content: faker.name.jobTitle()
    },
    col5: { content: faker.finance.account() },
    col6: { content: faker.internet.email() },
    col7: { content: faker.company.companyName() }
  });
}
const initialColumns = [
  { key: "col1", name: "Col1" },
  { key: "col2", name: "Col2" },
  { key: "col3", name: "Col3" },
  { key: "col4", name: "Col4" },
  { key: "col5", name: "Col5" },
  { key: "col6", name: "Col6" },
  { key: "col7", name: "Col7" }
];
export { initialColumns, initialRows };
