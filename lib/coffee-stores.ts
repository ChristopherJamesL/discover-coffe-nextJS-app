import type { CoffeeStoreType, MapboxType, UnsplashPhotoType } from "@/types";

const transformCoffeeData = (
  data: MapboxType,
  index: number,
  images: string[]
) => {
  const {
    properties: { name, mapbox_id, address },
  } = data;

  const imageFallback =
    "https://plus.unsplash.com/premium_photo-1705091308398-42be44086a79?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29mZmVlJTIwdHJvbGx8ZW58MHx8MHx8fDA%3D";

  return {
    name,
    mapbox_id,
    address,
    imgUrl: images?.[index] || imageFallback,
  };
};

export const fetchCoffeeStores = async (longLat: string, limit: number) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/forward?q=coffee+shop&limit=${limit}&proximity=${longLat}&types=poi&poi_category=coffee_shop&access_token=${process.env.MAPBOX_API_TOKEN}`
    );
    const data = await response.json();
    console.log("data: ", data);

    const images = await fetchUnsplashImages();

    if (!data?.features) {
      console.warn("No features returned from Mapbox API");
      return [];
    }
    return data.features.map((feature: MapboxType, index: number) =>
      transformCoffeeData(feature, index, images)
    );
  } catch (e) {
    console.error("Error while fetching coffee stores", e);
    return [];
  }
};

export const fetchCoffeeStore = async (
  id: string,
  longLat: string,
  limit: number
) => {
  try {
    const coffeeStores = await fetchCoffeeStores(longLat, limit);

    const coffeeStore = coffeeStores.find(
      (store: CoffeeStoreType) => store.mapbox_id === id
    );

    return coffeeStore || null;
  } catch (e) {
    console.error("Error while fetching coffee stores", e);
    return null;
  }
};

// export const fetchCoffeeStore = async (id: string) => {
//   try {
//     const response = await fetch(
//       `https://api.mapbox.com/search/searchbox/v1/forward?q=coffee+shop&limit=${limit}&proximity=${longLat}&types=poi&poi_category=coffee_shop&access_token=${process.env.MAPBOX_API_TOKEN}`
//     );
//     const data = await response.json();

//     const images = await fetchUnsplashImages();

//     const coffeeStores = data.features.map(
//       (feature: MapboxType, index: number) =>
//         transformCoffeeData(feature, index, images)
//     );

//     const coffeeStore = coffeeStores.find(
//       (store: CoffeeStoreType) => store.mapbox_id === id
//     );

//     return coffeeStore || null;
//   } catch (e) {
//     console.error("Error while fetching coffee stores", e);
//     return null;
//   }
// };

const fetchUnsplashImages = async () => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=coffee%20shop&per_page=10&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Unsplash images");
    }

    const data = await response.json();

    return data.results.map((result: UnsplashPhotoType) => result.urls.small);
  } catch (e) {
    console.error("Error fetching Unsplash images", e);
    return [];
  }
};
