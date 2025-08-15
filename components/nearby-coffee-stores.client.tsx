"use client";

import React from "react";
import Banner from "./banner.client";
import useTrackLocation from "@/hooks/use-track-location";

export default function NearbyCoffeeStores() {
  const { handleTrackLocation, isFindingLocation, longLat, locationErrorMsg } =
    useTrackLocation();

  const positionLocator = () => handleTrackLocation();

  return (
    <div>
      <Banner
        positionLocator={positionLocator}
        buttonText={isFindingLocation ? "Locating..." : "View Stores nearby"}
      />
      {locationErrorMsg && <p>Error: {locationErrorMsg}</p>}
    </div>
  );
}
