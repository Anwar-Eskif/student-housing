// comnponents
import HeroSection from './components/HeroSection';
import FeaturedOffers from './components/FeaturedOffers';

const Home = () => {
    return (
        <main className="flex-1 w-full bg-background-light text-slate-900 font-sans antialiased">
            <HeroSection />
            <FeaturedOffers />
        </main>
    );
};

export default Home;
