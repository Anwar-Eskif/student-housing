import { Offer } from "../../../../types/types";
import { FilePenLine, MapPin, Trash2 } from "lucide-react";

type OfferCardProps = {
  offer: Offer;
};

const OfferCard = ({ offer }: OfferCardProps) => {
  const statusVariant = offer.status === "active" ? "bg-primary text-white" : "bg-red-300 text-on-surface-variant";
  return (
    <div className="bg-surface-container-lowest rounded-2xl  overflow-hidden shadow-md hover:shadow-lg transition-shadow group flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          alt={offer.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={offer.imageUrl}
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
            {offer.price.toLocaleString()} <span className="text-sm font-normal text-on-surface-variant">دولار / شهر</span>
          </span>
          <div className="flex gap-2">
            <button className="text-on-surface-variant hover:text-primary-container rounded-full hover:bg-surface-container">
              <FilePenLine size={20} />
            </button>
            <button className="text-on-surface-variant hover:text-error rounded-full hover:bg-error-container">
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
