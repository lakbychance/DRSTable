import faker from "faker";
const initialRows: any = [];
for (let i = 0; i < 30; i++) {
  initialRows.push({
    col1: faker.random.alphaNumeric(8),
    col2: faker.name.lastName(),
    col3: faker.address.city(),
    col4: faker.name.jobTitle(),
    col5: faker.finance.account(),
    col6: faker.internet.email(),
    col7: faker.company.companyName()
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
