import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { OFFER_CARD_TEXT } from "../../../data/data";

interface Tag {
  label: string;
};

interface OfferCardProps  {
  imageUrl: string;
  price: number;
  title: string;
  rating: number;
  tags: Tag[];
  isFavorite?: boolean;
};

const OfferCard = ({
  imageUrl,
  price,
  title,
  rating,
  tags,
}: OfferCardProps) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <div className="relative h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={imageUrl}
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
          <div className="flex items-center gap-1 text-tertiary">
            <span className="text-sm font-bold text-orange-300">{rating}</span>
            <Star size={16} className="fill-current text-orange-300" />
          </div>
        </div>
        <div className="flex gap-2  mb-4 overflow-x-auto no-scrollbar">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className="bg-primary/60 text-white text-[10px] px-3 py-2 rounded-full whitespace-nowrap"
            >
              {tag.label}
            </span>
          ))}
        </div>
        <button className="w-full bg-primary text-white  rounded-lg font-medium hover:brightness-110 transition-all cursor-pointer">
            <Link className="block h-full w-full py-2.5" to="/offers/1">{OFFER_CARD_TEXT.view_details}</Link>
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
