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
  landlord_email?: string;
  cover_image: string;
  avg_rating: number | null;
  reviews_count: number;
  images?: string[],
  reviews?: []
}

export interface HomeCardProps {
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
  reviews_count: number,
}

export interface Booking {
  id: number;
  status: "pending" | "accepted" | "rejected";
  visit_date: string;
  visit_time: string;
  created_at: string;
  offer_id: number;
  offer_title: string;
  offer_location: string;
  offer_price: string;
  cover_image: string;
}

export interface BookingCardProps {
  booking: Booking;
}