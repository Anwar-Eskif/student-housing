export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: "landlord" | "student";
}

export interface response {
  message : string;
  token: string;
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
  landlord_name: string;
  cover_image: string;
  avg_rating: number | null;
  reviews_count: number;
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