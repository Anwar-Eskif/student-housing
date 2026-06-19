import { Map, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { OFFER_CARD_TEXT } from "../../../data/data";
import { Offer } from "../../../types/types";

const OfferCard = ({
  cover_image,
  price,
  title,
  avg_rating,
  amenities,
  location,
  id
}: Offer) => {
  const baseUrl = import.meta.env.VITE_BASE_IMG_URL;
  return (
    <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <div className="relative h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={cover_image ? `${baseUrl}/${cover_image}` : ""}
          alt={title}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-primary font-bold text-sm">
          ${price} {OFFER_CARD_TEXT.monthly}
        </div>
        {/* <button className="absolute top-3 left-3 bg-white/50 backdrop-blur-sm p-1.5 rounded-full text-slate-400 hover:bg-white transition-colors">
          {isFavorite ? (
            <span
              className="material-symbols-outlined text-error"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
          ) : (
            <span className="material-symbols-outlined">favorite</span>
          )}
        </button> */}
      </div>
      <div className="p-5 text-right">
        <div className="flex justify-between items-center  mb-2">
          <h3 className="font-bold text-lg ">{title}</h3>
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-orange-300">{Math.round((avg_rating || 0) * 10) / 10 || 0}</span>
            <Star size={16} className="fill-current text-orange-300" />
          </div>
        </div>
        <div className="w-full">
          {/* locations with icon */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
              <Map size={16} className="text-slate-400" />
              <span>{location}</span>
          </div>
        </div>
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          {amenities.map((amenity) => (
            <span
              key={amenity}
              className="bg-primary/60 text-white text-[10px] px-3 py-2 rounded-full whitespace-nowrap"
            >
              {amenity}
            </span>
          ))}
        </div>
        <button className="w-full bg-primary text-white  rounded-lg font-medium hover:brightness-110 transition-all cursor-pointer">
            <Link className="block h-full w-full py-2.5" to={`/offers/${id}`}>
              {OFFER_CARD_TEXT.view_details}
            </Link>
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
