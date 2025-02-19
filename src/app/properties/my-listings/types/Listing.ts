interface Room {
  level: string;
  type: string;
  size: {
    width: string;
    length: string;
  };
}

interface Bathroom {
  level: string;
  ensuite: boolean;
  pieces: number;
}

interface ListingDetails {
  otherDetails: Record<string, string>;
  listingInfo: Record<string, string>;
}

interface WideInfo extends Record<string, string> {}

interface Listing {
  title: string; // <title>
  description: string; // <div class="mrp-listing-description">
  mainSummary: {
    status: string;
    propertyType: string;
    MLS: string;
    bedrooms: number;
    bathrooms: number;
    yearBuilt: number;
  }; //divs inside of <section class="mrp-details-main-summary"> that contain dl and dt and dd
  photos: {
    downloadUrl: string;
    savedPath: string;
    listingId: string;
  }[]; //full-data-src attribute inside of <img class="mrp-photo-thumb">
  generalInfo?: Record<string, string>;
  coordinates: {
    lat: number;
    lng: number;
  };
  rooms?: Room[];
  bathrooms?: Bathroom[];
  listingDetails?: ListingDetails;
  wideInfo?: WideInfo;
  price?: number;
  id: string;
}

export type { Listing, ListingDetails, Room, Bathroom, WideInfo };
