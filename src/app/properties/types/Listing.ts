interface Room {
  id: string;
  level: string;
  type: string;
  width: string;
  length: string;
  listingId: string;
}

interface Bathroom {
  id: string;
  level: string;
  ensuite: boolean;
  pieces: number;
  listingId: string;
}

interface Image {
  id: string;
  downloadUrl: string;
  savedPath: string;
  listingId: string;
}

interface ListingDetails {
  otherDetails: Record<string, string>;
  listingInfo: Record<string, string>;
}

interface WideInfo extends Record<string, string> {}

interface Listing {
  id: string;
  title: string;
  description: string;
  mainSummary: {
    status: string;
    propertyType: string;
    MLS: string;
    bedrooms: number;
    bathrooms: number;
    yearBuilt: number;
  };
  photos: Image[];
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
  urlId: string;
}

export type { Listing, ListingDetails, Room, Bathroom, WideInfo, Image };
