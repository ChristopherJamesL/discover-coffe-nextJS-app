export type CoffeeStoreType = {
  name: string;
  mapbox_id: string;
  address: string;
  imgUrl: string;
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
