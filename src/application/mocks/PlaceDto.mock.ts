import { PlaceDto } from "../modules/places/dtos/PlaceDto";

const basePlace = {
  business_status: "OPERATIONAL",
  formatted_address: "Cl. 10 ##38-38, Medellín, Antioquia, Colombia",
  geometry: {
    location: {
      lat: 6.209705599999999,
      lng: -75.5677602,
    },
    viewport: {
      northeast: {
        lat: 6.21099787989272,
        lng: -75.56643337010728,
      },
      southwest: {
        lat: 6.208298220107276,
        lng: -75.56913302989273,
      },
    },
  },
  icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
  name: "Restaurante Mondongo's El Poblado",
  opening_hours: {
    open_now: false,
  },
  photos: [
    {
      height: 2268,
      html_attributions: [
        `'<a href="https://maps.google.com/maps/contrib/105404809896421304197">Frank Pineda</a>'`,
      ],
      photo_reference:
        "CmRaAAAAOqkbGjPp6NR4FIuakH0HsujOBsx5_IQimRTBSng8qiPB1GmcVZdOWF9iMXJ2KmrjeVgf7EUPJNgKkyBnEzA_L7TId-SXLt6_mPH_xEYCTqeTj30ZcCUi5K3Ew3hv-N2HEhB83t9CMABK6kN-JvVyCJWsGhRSXCMuBA_8mm9FGO590So20UXzUg",
      width: 4032,
    },
  ],
  place_id: "ChIJJTEMeCkoRI4RUrz-xjhNnxw",
  plus_code: {
    compound_code: "6C5J+VV Medellin, Antioquia, Colombia",
    global_code: "67R66C5J+VV",
  },
  price_level: 2,
  rating: 4.6,
  reference: "ChIJJTEMeCkoRI4RUrz-xjhNnxw",
  types: ["restaurant", "food", "point_of_interest", "establishment"],
  user_ratings_total: 6124,
};

const resultPlaces: PlaceDto[] = [];
resultPlaces.push((<unknown>basePlace) as PlaceDto);

export { resultPlaces };
