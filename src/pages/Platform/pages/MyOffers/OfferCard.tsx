import { useNavigate } from "react-router-dom";
import { Offer } from "../../../../types/types";
import { MapPin, Trash2 } from "lucide-react";

type OfferCardProps = {
  offer: Offer;
  onDelete: (id: number) => void;
};

const OfferCard = ({ offer, onDelete }: OfferCardProps) => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_IMG_URL;
  const statusVariant =
    offer.status === "active"
      ? "bg-primary text-white"
      : "bg-red-300 text-on-surface-variant";
  return (
    <div onClick={() => navigate(`/platform/update-offer/${offer.id}`)} className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:cursor-pointer transition-shadow group flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          alt={offer.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={offer.cover_image ? `${baseUrl}/${offer.cover_image}` : "https://via.placeholder.com/400x300?text=No+Image"}
        />
        <div className={`absolute top-4 right-4  text-xs font-bold px-3 py-1 rounded-full shadow-sm ${statusVariant}`}>
          {offer.status === "active" ? "نشط" : "غير نشط"}
        </div>
      </div>
      <div className="p-5 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="font-bold text-lg text-on-surface mb-1">{offer.title}</h3>
          <div className="flex items-center gap-1 text-on-surface-variant text-sm">
            <MapPin size={18} />
            <span>{offer.location}</span>
          </div>
        </div>
        <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-200">
          <span className="font-bold text-primary text-xl">
            {offer.price}{" "}
            <span className="text-sm font-normal text-on-surface-variant">
              دولار / شهر
            </span>
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onDelete(offer.id)}
              className="text-on-surface-variant hover:text-error rounded-full hover:bg-error-container"
            >
              <Trash2 className="text-red-500" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
