// icons
import { ArrowLeft, Search } from 'lucide-react';
// data
import { SEARCH_INPUT_TEXT } from '../../../data/data';

const SearchInput = () => {
    return (
        <div className="bg-white p-2 rounded-2xl shadow-2xl shadow-primary/5 border border-slate-100 flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative flex items-center">
                <Search className='mx-2'/>
                <input 
                    className="w-full pr-10 pl-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-slate-900 placeholder-slate-400 font-medium" 
                    placeholder={SEARCH_INPUT_TEXT.placeholder} 
                    type="text" 
                />
            </div>
            <button className="bg-primary hover:bg-primary-light text-white font-bold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2">
                <span>{SEARCH_INPUT_TEXT.button}</span>
                <ArrowLeft/>
            </button>
        </div>
    );
};

export default SearchInput;
