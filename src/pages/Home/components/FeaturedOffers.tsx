// components
import HomeCard from './HomeCard';
// router
import { Link } from 'react-router-dom';
import SkeletonCard from './SkeletonCard';
// data
import { FEATURED_OFFERS_TEXT } from '../../../data/data';
import { getLatestOffers } from '../../../services/api';
import { useQuery } from '@tanstack/react-query';
import { HomeCardProps } from '../../../types/types';

const FeaturedOffers = () => {

    const { data, isLoading, isError } = useQuery({
    queryKey: ["latest-offers"],
    queryFn: () => getLatestOffers(),
    });
    const isThereData = data && data.offers && data.offers.length > 0;


    if (isError) {
        return <div>Error fetching offers</div>;
    }
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
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            )}
            {isThereData && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data?.offers?.map((offer: HomeCardProps) => (
                    <HomeCard key={offer.id} {...offer} />
                ))}
            </div>
            )}
        </section>
    );
};

export default FeaturedOffers;
