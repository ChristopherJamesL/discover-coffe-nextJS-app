import Card from "../components/card.server";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import type { CoffeeStoreType } from "@/types";
import NearbyCoffeeStores from "@/components/nearby-coffee-stores.client";
import { Metadata } from "next";
import { getDomain } from "@/utils";

async function getData() {
  if (
    !process.env.MAPBOX_API_TOKEN ||
    !process.env.UNSPLASH_ACCESS_KEY ||
    !process.env.AIRTABLE_TOKEN
  ) {
    throw new Error("One of the API keys is not configured");
  }
  const TORONTO_LONG_LAT = "-79.3832%2C43.6532";
  return await fetchCoffeeStores(TORONTO_LONG_LAT, 6);
}

export const metadata: Metadata = {
  title: "Coffee Connoisseur",
  description: "Allows you to discover coffee stores near you",
  metadataBase: getDomain(),
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const coffeeStores = await getData();

  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <NearbyCoffeeStores />
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Toronto Stores
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
            {coffeeStores.map((store: CoffeeStoreType) => {
              const { name, imgUrl, mapbox_id } = store;
              return (
                <Card
                  key={`${name}-${mapbox_id}`}
                  name={name}
                  imgUrl={imgUrl}
                  href={`/coffee-store/${mapbox_id}`}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
