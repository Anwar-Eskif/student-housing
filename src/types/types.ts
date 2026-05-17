export interface User {
  name: string,
  email: string,
  password: string,
  role: string
}

export interface response {
  message : string,
  token: string,
  data: any
}

export interface Offer {
  id: number;
  landlord_id: number;
  title: string;
  description: string;
  price: string;
  location: string;
  rooms_count: number;
  amenities: string[];
  status: "active" | "inactive";
  created_at: string;
  cover_image: string | null;
  pending_bookings: number;
}

export interface HomeCardProps {
    imageSrc: string;
    price: string;
    rating: string;
    title: string;
    features: {
        text: string;
    }[];
}