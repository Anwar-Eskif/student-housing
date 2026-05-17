import { Send } from "lucide-react";
import { BOOKING_CARD_TEXT } from "../../../data/data";
// context
import { useAuth } from "../../../context/AuthContext";

interface BookingCardProps {
  onBooking: () => void;
}

const BookingCard = ({ onBooking }: BookingCardProps) => {
  const { user } = useAuth()
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-2xl shadow-primary/5 flex flex-col gap-6">
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-slate-900">3,400$</span>
          <span className="text-slate-500 font-bold">{BOOKING_CARD_TEXT.monthly}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button
          disabled={!user || user.role !== "student"}
          onClick={onBooking}
          className={`w-full bg-primary hover:bg-primary-light text-white rounded-2xl h-14 font-bold text-lg transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-3 ${!user || user.role !== "student" ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
        >
          <span className="material-symbols-outlined scale-x-[-1]">
            <Send />
          </span>
          {BOOKING_CARD_TEXT.request_to_book}
        </button>
        <p className="text-center text-sm text-slate-400 font-medium">
          {user ? BOOKING_CARD_TEXT.no_charge_now : BOOKING_CARD_TEXT.register_first}
        </p>
      </div>
      <div className="flex flex-col gap-4 pt-6 border-t border-slate-50">
        <div className="flex justify-between text-slate-600 font-medium">
          <span>{BOOKING_CARD_TEXT.rent} (4 غرف)</span>
          <span className="text-slate-900 font-bold">3,400$</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;


