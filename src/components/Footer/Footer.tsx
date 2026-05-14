import { HomeIcon } from 'lucide-react';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 py-16">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-12 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
                            <HomeIcon/>
                        </div>
                        {/* <h2 className="text-white text-xl font-extrabold tracking-tight">Student Home</h2> */}
                    </div>
                    <div className="flex gap-8 text-slate-400 text-sm font-semibold">
                        <a className="hover:text-white transition-colors" href="#">سياسة الخصوصية</a>
                        <a className="hover:text-white transition-colors" href="#">شروط الخدمة</a>
                        <a className="hover:text-white transition-colors" href="#">الدعم الفني</a>
                    </div>
                </div>
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
                    <p>© 2026  جميع الحقوق محفوظة.</p>
                    <div className="flex gap-4">
                        <a className="hover:text-primary transition-colors" href="#">Instagram</a>
                        <a className="hover:text-primary transition-colors" href="#">LinkedIn</a>
                        <a className="hover:text-primary transition-colors" href="#">Twitter</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
