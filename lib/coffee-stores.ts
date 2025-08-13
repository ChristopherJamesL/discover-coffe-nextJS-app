import type { MapboxType } from "@/types";

const transformCoffeeData = (data: MapboxType) => {
  const {
    properties: { name, mapbox_id, address },
  } = data;
  return {
    name,
    mapbox_id,
    address,
    imgUrl:
      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
  };
};

export const fetchCoffeeStores = async () => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/forward?q=coffee+shop&limit=6&proximity=-79.3832%2C43.6532&types=poi&poi_category=coffee_shop&access_token=${process.env.MAPBOX_API_TOKEN}`
    );
    const data = await response.json();
    return data.features.map((feature: MapboxType) =>
      transformCoffeeData(feature)
    );

    // return await response.json();
  } catch (e) {
    console.error("Error while fetching coffee stores", e);
  }
};
