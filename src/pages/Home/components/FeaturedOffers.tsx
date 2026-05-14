// components
import HomeCard from './HomeCard';
// router
import { Link } from 'react-router-dom';
// data
import { HOME_CARD_DATA, FEATURED_OFFERS_TEXT } from '../../../data/data';

const FeaturedOffers = () => {
    return (
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">{FEATURED_OFFERS_TEXT.title}</h2>
                    <p className="text-slate-500 font-medium">{FEATURED_OFFERS_TEXT.description}</p>
                </div>
                <Link to={"/offers"} className="group inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-xl transition-all">
                    <span>{FEATURED_OFFERS_TEXT.browse_all}</span>
                </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {HOME_CARD_DATA.map((offer, index) => (
                    <HomeCard key={index} {...offer} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedOffers;
