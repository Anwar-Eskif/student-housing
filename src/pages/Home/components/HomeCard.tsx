// icons
import { Star } from 'lucide-react';
// type
import { HomeCardProps } from '../../../types/types';
import { HOME_CARD_TEXT } from '../../../data/data';
import { Link } from 'react-router-dom';
const HomeCard = ({
   id , cover_image, price, avg_rating, title, amenities
}: HomeCardProps) => {
    const baseUrl = import.meta.env.VITE_BASE_IMG_URL;
    return (
        <Link to={`/offers/${id}`}>
            <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all cursor-pointer">
                <div className="relative h-72 overflow-hidden">
                    <img alt="Room" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={cover_image ? `${baseUrl}/${cover_image}` : ""} />

                    <div className="absolute bottom-4 left-4 right-auto bg-primary text-white font-bold px-3 py-1.5 rounded-lg shadow-lg">
                        {price}<span className="text-[10px] opacity-80 uppercase mr-1">{HOME_CARD_TEXT.monthly}</span>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-amber-500 font-bold text-sm bg-amber-50 px-2 py-0.5 rounded-md">
                            <Star size={15} /> {avg_rating ? Math.round(avg_rating * 10) / 10 : 0}
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-1">{title}</h3>

                    <div className="flex gap-4 text-sm text-black font-medium border-t border-slate-50 pt-4 overflow-x-auto no-scrollbar">
                        {amenities.map((amenity, idx) => (
                            <div key={idx} className="flex p-2 rounded-xl items-center gap-1.5 bg-slate-300 whitespace-nowrap">
                                <span >{amenity}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default HomeCard;
