import { CoffeeStoreType } from "@/types";
import Airtable from "airtable";
import type { Record as AirtableRecord } from "airtable";
const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  "appM7K6QkbqjkkizD"
);

const table = base("coffee-stores");

const getMinifiedRecords = (
  records: ReadonlyArray<AirtableRecord<CoffeeStoreType>>
) => {
  return records.map((record) => {
    return {
      recordId: record.id,
      ...record.fields,
    };
  });
};

const findRecordByFilter = async (id: string) => {
  const findRecords = await table
    .select({
      filterByFormula: `{id} = '${id}'`,
    })
    .firstPage();

  return getMinifiedRecords(
    findRecords as unknown as AirtableRecord<CoffeeStoreType>[]
  );
};

export const createCoffeeStore = async (
  coffeeStore: CoffeeStoreType,
  id: string
) => {
  const { name, address, voting = 0, imgUrl } = coffeeStore;

  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length === 0) {
        const createRecords = await table.create([
          {
            fields: {
              id,
              name,
              address,
              voting,
              imgUrl,
            },
          },
        ]);
        if (createRecords.length > 0) {
          console.log("Created a store with id", id);
          return getMinifiedRecords(
            createRecords as unknown as AirtableRecord<CoffeeStoreType>[]
          );
        }
      } else {
        console.log("Coffee Store Exists");
        return records;
      }
    } else {
      console.error("Store id is missing");
    }
  } catch (e) {
    console.error("Error creating or finding a store", e);
  }
  return [];
};

export const updateCoffeeStore = async (id: string) => {
  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length !== 0) {
        const record = records[0];
        // console.log("record: ", record);
        const updatedVoting = record.voting + 1;
        const updatedRecords = await table.update([
          {
            id: record.recordId,
            fields: {
              voting: updatedVoting,
            },
          },
        ]);
        if (updatedRecords.length > 0) {
          console.log("Updated a store with id", id);
          return getMinifiedRecords(
            updatedRecords as unknown as AirtableRecord<CoffeeStoreType>[]
          );
        }
      } else {
        console.log("Coffee Store Does Not Exists");
      }
    } else {
      console.error("Store id is missing");
    }
  } catch (e) {
    console.error("Error upvoting a store", e);
  }
  return [];
};
