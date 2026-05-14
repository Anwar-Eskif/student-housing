import { Link } from "react-router-dom";
import { offers } from "./mock";
import OfferCard from "./OfferCard";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const MyOffers = () => {
  const totalOffers = offers.length;
  const activeOffers = offers.filter(offer => offer.status === 'active').length;
  const rentedOffers = totalOffers - activeOffers;

  return (
    <main className="flex-1 p-6 md:p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="font-headline text-3xl font-bold text-on-surface mb-2">إدارة عروضي</h1>
            <p className="text-on-surface-variant">قم بإدارة ومتابعة جميع عقاراتك المعروضة.</p>
          </div>
          <button className="bg-primary  text-stone-50 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm">
            <Link className="flex" to="/platform/add-offer">
              <Plus />
              إضافة عرض
            </Link>
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl shadow-xl flex flex-col gap-2">
            <span className="text-on-surface-variant text-sm font-medium">إجمالي العروض</span>
            <span className="text-3xl font-bold text-primary">{totalOffers}</span>
          </div>
          <div className="p-6 rounded-2xl shadow-xl flex flex-col gap-2">
            <span className="text-on-surface-variant text-sm font-medium">عروض نشطة</span>
            <span className="text-3xl font-bold text-secondary">{activeOffers}</span>
          </div>
          <div className="p-6 rounded-2xl shadow-xl flex flex-col gap-2">
            <span className="text-on-surface-variant text-sm font-medium">عروض غير نشطة</span>
            <span className="text-3xl font-bold text-red-400">{rentedOffers}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <div className="flex items-center gap-2">
            <button disabled>
              <ChevronRight />
            </button>
            <button className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container font-bold">1</button>
            <button className="w-10 h-10 rounded-lg">2</button>
            <button className="w-10 h-10 rounded-lg">3</button>
            <button>
              <ChevronLeft />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyOffers;
