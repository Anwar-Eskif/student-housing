
import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "../../services/api";
import { Booking } from "../../types/types";
import BookingCard from "./components/BookingCard";
import { MY_BOOKINGS_TEXT } from "../../data/data";

const MyBookings = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["myBookings"],
        queryFn: getMyBookings
    });

  if (isLoading) {
    return <div className="min-h-dvh flex items-center justify-center" >{MY_BOOKINGS_TEXT.loading}</div>;
  }

  if (isError) {
    return <div className="min-h-dvh flex items-center justify-center"  >{MY_BOOKINGS_TEXT.error}</div>;
  }

  return (
    <div className="container mx-auto p-4 md:pt-[130px]!">
      <h1 className="text-2xl font-bold mb-4">{MY_BOOKINGS_TEXT.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.bookings.map((booking: Booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default MyBookings;