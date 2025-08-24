export type CoffeeStoreType = {
  name: string | null;
  mapbox_id: string;
  address: string;
  imgUrl: string;
  voting: number;
};

export type MapboxType = {
  properties: {
    name: string;
    mapbox_id: string;
    address: string;
  };
};

export type UnsplashPhotoType = {
  urls: {
    small: string;
  };
};

export type AirTableRecordType = {
  recordId: string;
  fields: CoffeeStoreType;
};

export type ServerParamsType = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ longLat?: string; limit?: string }>;
};
