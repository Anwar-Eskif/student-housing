import { useState } from "react";
import { BOOKING_REQUEST_POPUP_TEXT } from "../../../data/data";
import toast from "react-hot-toast";

interface BookingRequestPopupProps {
  onClose: () => void;
}

const BookingRequestPopup = ({
  onClose,
}: BookingRequestPopupProps) => {
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");

  const getMinTime = () => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    if (visitDate === today) {
      return now.toTimeString().slice(0, 5);
    }
    return "00:00";
  };

  const handleBooking = () => {
    if (visitDate && visitTime) {
      const now = new Date();
      const today = now.toISOString().split("T")[0];
      const currentTime = now.toTimeString().slice(0, 5);

      if (visitDate === today && visitTime < currentTime) {
        toast.error(BOOKING_REQUEST_POPUP_TEXT.time_expired, {
          style: {
            textAlign: 'right',
          },
        });
        return;
      }
      toast.success(BOOKING_REQUEST_POPUP_TEXT.success_message, {
      style: {
        textAlign: 'right',
      },
      position: 'bottom-center',
      });
      console.log("Selected Visit Date:", visitDate);
      console.log("Selected Visit Time:", visitTime);
      onClose();
    } else {
      toast.error(BOOKING_REQUEST_POPUP_TEXT.alert_message, {
        style: {
          textAlign: 'right',
        },
      });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-lg text-center md:w-md w-sm max-w-md mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          {BOOKING_REQUEST_POPUP_TEXT.title}
        </h2>
        <p className="text-slate-600 mb-6">
          {BOOKING_REQUEST_POPUP_TEXT.description}
        </p>
        <div className="space-y-4 text-right">
          <div>
            <label htmlFor="visit-date" className="block text-sm font-medium text-slate-700">
              {BOOKING_REQUEST_POPUP_TEXT.date_label}
            </label>
            <input
              type="date"
              id="visit-date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="visit-time" className="block text-sm font-medium text-slate-700">
              {BOOKING_REQUEST_POPUP_TEXT.time_label}
            </label>
            <input
              type="time"
              id="visit-time"
              value={visitTime}
              onChange={(e) => setVisitTime(e.target.value)}
              min={getMinTime()}
              disabled={!visitDate}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
        </div>
        <div className="mt-8 flex gap-4">
          <button
            onClick={onClose}
            className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl h-12 font-bold transition-all"
          >
            {BOOKING_REQUEST_POPUP_TEXT.cancel_button}
          </button>
          <button
            onClick={handleBooking}
            className="w-full bg-primary hover:bg-primary-light text-white rounded-xl h-12 font-bold transition-all"
          >
            {BOOKING_REQUEST_POPUP_TEXT.confirm_button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingRequestPopup;
