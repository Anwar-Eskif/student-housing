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
  id: string;
  title: string;
  location: string;
  price: number;
  status: "active" | "inactive";
  imageUrl: string;
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