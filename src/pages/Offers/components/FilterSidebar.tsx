import { CircleDollarSign, Package, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { FILTER_SIDEBAR_TEXT } from "../../../data/data";

const FilterSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="pt-10! md:pt-[130px]!">
            <div className="md:hidden p-4 bg-slate-50 border-l border-slate-200 flex justify-start">
                <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-slate-200">
                    <SlidersHorizontal size={20} className="text-primary-light" />
                </button>
            </div>
            <aside className={`w-full md:w-64 bg-slate-50 border-l border-slate-200 p-6 flex flex-col gap-6 sticky top-0 md:h-screen transition-all duration-300 ${isOpen ? 'h-fit' : 'h-0 p-0 m-0 hidden'} md:h-fit md:p-6 md:m-0`}>
                <div className="flex flex-col gap-1 ">
                    <h2 className="text-lg font-bold text-teal-800">
                        {FILTER_SIDEBAR_TEXT.title}
                    </h2>
                    <p className="text-sm text-slate-500">{FILTER_SIDEBAR_TEXT.description}</p>
                </div>
                {/* Price Range */}
                <div className="flex flex-col gap-3 ">
                    <div className="flex items-center gap-2 justify-start text-teal-700 font-medium">
                        <span>{FILTER_SIDEBAR_TEXT.price}</span>
                        <span
                            className="material-symbols-outlined text-sm"
                            data-icon="payments"
                        >
                            <CircleDollarSign />
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            className="w-full text-sm rounded-lg border-outline-variant bg-white px-4 py-2"
                            placeholder={FILTER_SIDEBAR_TEXT.max_price}
                            type="number"
                        />
                        <input
                            className="w-full text-sm rounded-lg border-outline-variant bg-white px-4 py-2"
                            placeholder={FILTER_SIDEBAR_TEXT.min_price}
                            type="number"
                        />
                    </div>
                </div>
                {/* City */}
                {/* <div className="flex flex-col gap-3 ">
                    <div className="flex items-center gap-2 justify-start text-teal-700 font-medium">
                        <span>المدينة</span>
                        <span
                            className="material-symbols-outlined text-sm"
                            data-icon="location_city"
                        >
                            <MapPin />
                        </span>
                    </div>
                    <select className="w-full text-sm rounded-lg border-outline-variant bg-white focus:ring-primary">
                        <option>الرياض</option>
                        <option>جدة</option>
                        <option>الدمام</option>
                    </select>
                </div> */}
                {/* Amenities */}
                <div className="flex flex-col gap-3 ">
                    <div className="flex items-center gap-2 justify-start text-teal-700 font-medium">
                        <span>{FILTER_SIDEBAR_TEXT.amenities}</span>
                        <span className="material-symbols-outlined text-sm" data-icon="wifi">
                            <Package />
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center justify-start gap-2 text-sm text-slate-600 cursor-pointer">
                            <input
                                className="rounded text-primary focus:ring-primary"
                                type="checkbox"
                            />
                            <span>{FILTER_SIDEBAR_TEXT.wifi}</span>

                        </label>
                        <label className="flex items-center justify-start gap-2 text-sm text-slate-600 cursor-pointer">
                            <input
                                className="rounded text-primary focus:ring-primary"
                                type="checkbox"
                            />
                            <span>{FILTER_SIDEBAR_TEXT.laundry}</span>

                        </label>
                        <label className="flex items-center justify-start gap-2 text-sm text-slate-600 cursor-pointer">
                            <input
                                className="rounded text-primary focus:ring-primary"
                                type="checkbox"
                            />
                            <span>{FILTER_SIDEBAR_TEXT.parking}</span>

                        </label>
                        <label className="flex items-center justify-start gap-2 text-sm text-slate-600 cursor-pointer">
                            <input
                                className="rounded text-primary focus:ring-primary"
                                type="checkbox"
                            />
                            <span>{FILTER_SIDEBAR_TEXT.air_conditioner}</span>

                        </label>
                        <label className="flex items-center justify-start gap-2 text-sm text-slate-600 cursor-pointer">
                            <input
                                className="rounded text-primary focus:ring-primary"
                                type="checkbox"
                            />
                            <span>{FILTER_SIDEBAR_TEXT.gym}</span>

                        </label>
                        <label className="flex items-center justify-start gap-2 text-sm text-slate-600 cursor-pointer">
                            <input
                                className="rounded text-primary focus:ring-primary"
                                type="checkbox"
                            />
                            <span>{FILTER_SIDEBAR_TEXT.kitchen}</span>

                        </label>
                    </div>
                </div>

                <button className="mt-4 w-full text-white bg-primary text-on-primary py-3 rounded-xl font-bold hover:opacity-90 transition-all">
                    {FILTER_SIDEBAR_TEXT.apply_filters}
                </button>
            </aside>
        </div>
    );
};

export default FilterSidebar;
