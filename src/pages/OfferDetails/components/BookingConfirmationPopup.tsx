import { Check } from "lucide-react";
import { BOOKING_CONFIRMATION_POPUP_TEXT } from "../../../data/data";

interface BookingConfirmationPopupProps {
  onClose: () => void;
}

const BookingConfirmationPopup = ({
  onClose,
}: BookingConfirmationPopupProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center size-16 rounded-full bg-green-100 text-green-600 mx-auto mb-4">
          <span className="material-symbols-outlined text-4xl">
            <Check/>
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {BOOKING_CONFIRMATION_POPUP_TEXT.success_title}
        </h2>
        <p className="text-slate-600 mb-6">
          {BOOKING_CONFIRMATION_POPUP_TEXT.success_message}
        </p>
        <button
          onClick={onClose}
          className="w-full bg-primary hover:bg-primary-light text-white rounded-xl h-12 font-bold transition-all"
        >
          {BOOKING_CONFIRMATION_POPUP_TEXT.ok_button}
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmationPopup;
