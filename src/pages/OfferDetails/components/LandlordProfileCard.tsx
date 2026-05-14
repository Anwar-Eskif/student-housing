import { User2 } from "lucide-react";
import { LANDLORD_PROFILE_CARD_TEXT } from "../../../data/data";

const LandlordProfileCard = () => {
  const landloadEmail = "email@gmail.com";
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-2xl shadow-primary/5 flex flex-col gap-6">
      <h4 className="font-extrabold text-slate-900 text-lg">{LANDLORD_PROFILE_CARD_TEXT.title}</h4>
      <div className="flex items-center gap-4">
        <div
          className="size-12 flex items-center justify-center rounded-full bg-cover bg-center ring-2 ring-primary/20"
        >
          <User2/>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-slate-900 leading-tight">
            {LANDLORD_PROFILE_CARD_TEXT.name}
          </span>
        </div>
      </div>
      <a
        href={"mailto:" + landloadEmail}
        className="w-full border-2 border-slate-900 text-slate-900 rounded-2xl h-12 font-bold hover:bg-slate-900 hover:text-white transition-all active:scale-95 flex items-center justify-center"
      >
        {LANDLORD_PROFILE_CARD_TEXT.contact_button}
      </a>
    </div>
  );
};

export default LandlordProfileCard;

