import Airtable from "airtable";
const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  "appM7K6QkbqjkkizD"
);

const table = base("coffee-stores");

// find record
export const findRecordByFilter = async (id: string) => {
  const findRecords = await table
    .select({
      filterByFormula: `{id} = '${id}'`,
    })
    .firstPage();

  return findRecords.map((record) => {
    console.log("RECORDS: ", record.fields);
    return {
      recordId: record.id,
      ...record.fields,
    };
  });
};

//create record if not found

const createCoffeeStore = async (id: string) => {
  const records = await findRecordByFilter(id);

  if (records.length === 0) {
    // create
  } else {
    // return;
  }
};
