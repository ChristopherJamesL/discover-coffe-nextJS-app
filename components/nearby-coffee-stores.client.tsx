"use client";

import React, { useEffect, useState } from "react";
import Banner from "./banner.client";
import useTrackLocation from "@/hooks/use-track-location";
import Card from "./card.server";
import { CoffeeStoreType } from "@/types";

export default function NearbyCoffeeStores() {
  const [coffeeStores, setCoffeeStores] = useState([]);

  const { handleTrackLocation, isFindingLocation, longLat, locationErrorMsg } =
    useTrackLocation();

  const positionLocator = () => handleTrackLocation();

  useEffect(() => {
    async function coffeeStoresByLocation() {
      if (longLat) {
        try {
          const limit = 10;
          const response = await fetch(
            `/api/getCoffeeStoresByLocation?longLat=${longLat}&limit=${limit}`
          );
          const coffeeStores = await response.json();
          setCoffeeStores(coffeeStores);
        } catch (e) {
          console.error("error fetching route: ", e);
        }
      }
    }
    coffeeStoresByLocation();
  }, [longLat]);

  return (
    <div>
      <Banner
        positionLocator={positionLocator}
        buttonText={isFindingLocation ? "Locating..." : "View Stores nearby"}
      />
      {locationErrorMsg && <p>Error: {locationErrorMsg}</p>}

      {coffeeStores.length > 0 && (
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Stores near me
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
            {coffeeStores.map((store: CoffeeStoreType) => {
              console.log("store: ", store);
              const { name, imgUrl, mapbox_id } = store;
              return (
                <Card
                  key={`${name}-${mapbox_id}`}
                  name={name}
                  imgUrl={imgUrl}
                  href={`/coffee-store/${mapbox_id}?longLat=${longLat}&limit=10`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
