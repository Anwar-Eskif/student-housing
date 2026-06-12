import { Link } from "react-router-dom";
import { Booking } from "../../../types/types";
import { Calendar, Clock, MapPin, Wallet } from "lucide-react";
import { formatTime12hr } from "../../../util/FormatTime12hr";
import { MY_BOOKING_CARD_TEXT } from "../../../data/data";

const BookingCard = ({ booking }: { booking: Booking }) => {
  const getStatusPillColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "accepted":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };    

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return MY_BOOKING_CARD_TEXT.status.pending;
      case "accepted":
        return MY_BOOKING_CARD_TEXT.status.accepted;
      case "rejected":
        return MY_BOOKING_CARD_TEXT.status.rejected;
      default:
        return MY_BOOKING_CARD_TEXT.status.unknown;
    }
  };

  return (
    <Link to={`/offers/${booking.offer_id}`} className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">Title</dt>
            <dd className="font-medium">{booking.offer_title}</dd>
          </div>

          <div>
            <dt className="sr-only">Location</dt>
            <dd className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {booking.offer_location}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center gap-8 text-xs">
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <Wallet className="h-4 w-4 text-indigo-600" />
            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">{MY_BOOKING_CARD_TEXT.price_label}</p>
              <p className="font-medium">{booking.offer_price} $</p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <Calendar className="h-4 w-4 text-indigo-600" />
            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">{MY_BOOKING_CARD_TEXT.visit_date_label}</p>
              <p className="font-medium">{new Date(booking.visit_date).toLocaleDateString('en-CA').replace(/-/g, '/')}</p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <Clock className="h-4 w-4 text-indigo-600" />
            <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">{MY_BOOKING_CARD_TEXT.visit_time_label}</p>
                <p className="font-medium text-right" dir="ltr">{formatTime12hr(booking.visit_time)}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 ${getStatusPillColor(booking.status)}`}>
            {getStatusLabel(booking.status)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BookingCard;
