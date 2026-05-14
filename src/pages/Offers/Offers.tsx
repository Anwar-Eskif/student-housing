import { MoveLeft, MoveRight, Search } from "lucide-react";
import { OFFERS_DATA, OFFERS_PAGE_TEXT } from "../../data/data";
import FilterSidebar from "./components/FilterSidebar";
import OfferCard from "./components/OfferCard";

const Offers = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse min-h-screen">
      <FilterSidebar />
      <main className="flex-1 p-6 lg:p-10  pt-[0px]! md:pt-[130px]!">
        <div className="flex flex-col lg:flex-row-reverse justify-between items-center mb-8 gap-6">
          <h1 className="text-2xl font-bold text-on-surface whitespace-nowrap">
            {OFFERS_PAGE_TEXT.search_results} ({OFFERS_DATA.length} {OFFERS_PAGE_TEXT.property})
          </h1>
          <div className="flex flex-col sm:flex-row-reverse items-center gap-4 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                className="bg-[#ffffff]  focus:border-transparent rounded-lg px-4 py-2 text-right pr-10 focus:outline-none focus:ring-2 focus:ring-primary w-full"
                placeholder={OFFERS_PAGE_TEXT.search_placeholder}
                type="text"
              />
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline">
                <Search className="text-primary"/>
              </span>
            </div>
            {/* <div className="flex items-center gap-2 flex-row-reverse whitespace-nowrap">
              <span className="text-sm text-outline">{OFFERS_PAGE_TEXT.sort_by}</span>
              <select className="text-sm rounded-lg border-outline-variant bg-surface-container-low focus:ring-primary border-none py-1">
                <option>{OFFERS_PAGE_TEXT.latest}</option>
                <option>{OFFERS_PAGE_TEXT.price_low_to_high}</option>
                <option>{OFFERS_PAGE_TEXT.highest_rated}</option>
              </select>
            </div> */}
          </div>
        </div>

        {/* Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {OFFERS_DATA.map((offer) => (
            <OfferCard key={offer.id} {...offer} />
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-start items-center mt-8" dir="ltr">
          <nav className="flex items-center gap-2">
            <button className="p-2 rounded-md hover:bg-surface-container">
              <span className="material-symbols-outlined">
                <MoveLeft/>
              </span>
            </button>
            <button className="w-8 h-8 rounded-md bg-primary text-on-primary">1</button>
            <button className="w-8 h-8 rounded-md hover:bg-surface-container">2</button>
            <button className="w-8 h-8 rounded-md hover:bg-surface-container">3</button>
            <span className="text-on-surface">...</span>
            <button className="w-8 h-8 rounded-md hover:bg-surface-container">12</button>
            <button className="p-2 rounded-md hover:bg-surface-container">
              <span className="material-symbols-outlined">
                <MoveRight/>
              </span>
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
};

export default Offers;
