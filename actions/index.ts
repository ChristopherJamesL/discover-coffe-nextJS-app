"use server";

import { updateCoffeeStore } from "@/lib/airtable";

type State = {
  id: string;
};

export const upvoteAction = async (prevState: State, formData: FormData) => {
  const { id } = prevState;
  const data = await updateCoffeeStore(id);
  console.log("data: ", { data });
  if (data) {
    return {
      voting: data.length > 0 ? data[0].voting : 0,
      id,
    };
  }
};
