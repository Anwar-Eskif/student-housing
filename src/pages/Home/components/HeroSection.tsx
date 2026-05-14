// components
import SearchInput from './SearchInput';
// icons
import { Shield } from 'lucide-react';
// data
import { HERO_SECTION_TEXT } from '../../../data/data';

const HeroSection = () => {
    return (
        <section className="relative w-full bg-white overflow-hidden  lg:min-h-[740px] flex flex-col lg:flex-row text-red">
            <div className="hidden lg:block lg:w-1/2 relative bg-primary">
                <div 
                    className="absolute inset-0 bg-cover bg-center hero-split-image" 
                    style={{ backgroundImage: "url('assets/bg/hero.png')" }}
                ></div>
                <div className="absolute bottom-12 left-0 right-0 px-12 z-10">
                    <div className="glass-effect p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-white/20">
                        <div className="bg-primary text-white p-3 rounded-full">
                            <Shield/>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900">{HERO_SECTION_TEXT.safety_title}</h4>
                            <p className="text-sm text-slate-600">{HERO_SECTION_TEXT.safety_description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2 flex items-center px-6 md:px-12 py-16 lg:py-24">
                <div className="max-w-xl">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-6">
                        {HERO_SECTION_TEXT.badge}
                    </span>
                    <h1 className="text-slate-900 text-5xl md:text-6xl font-black leading-[1.2] tracking-tight mb-6">
                        {HERO_SECTION_TEXT.title_part1} <span className="text-primary">{HERO_SECTION_TEXT.title_part2}</span>
                    </h1>
                    <p className="text-slate-600 text-lg md:text-xl font-medium mb-10 leading-relaxed">
                        {HERO_SECTION_TEXT.description}
                    </p>

                    <SearchInput />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
