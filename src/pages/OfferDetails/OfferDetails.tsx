// React
import { useState } from "react";
// components
import Gallery from "./components/Gallery";
import BookingCard from "./components/BookingCard";
import LandlordProfileCard from "./components/LandlordProfileCard";
import BookingConfirmationPopup from "./components/BookingConfirmationPopup";
import ReviewPopup from "./components/ReviewPopup";
// Icons
import { Check, Map, Star, StarIcon } from "lucide-react";
// Data
import { OFFER_DETAILS_DATA, OFFER_DETAILS_TEXT } from "../../data/data";
// context
import { useAuth } from "../../context/AuthContext";

const OfferDetails = () => {
  const { user,isLoading } = useAuth()
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);

  const handleBooking = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOpenReviewPopup = () => {
    setIsReviewPopupOpen(true);
  };

  const handleCloseReviewPopup = () => {
    setIsReviewPopupOpen(false);
  };
  return (
    <main className="px-6 md:px-12 py-8 flex flex-1 justify-center pt-[30px] md:pt-[130px]" dir="rtl">
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
        {/* Title & Header Info */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-900 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
              {OFFER_DETAILS_DATA.title}
            </h1>
            <div className="flex items-center gap-3 text-slate-500 text-base font-medium">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-xl">
                  <Map/>
                </span>
                <span>{OFFER_DETAILS_DATA.address}</span>
              </div>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                <span className="material-symbols-outlined text-sm"><Star size={'15'}/></span>
                {OFFER_DETAILS_DATA.rating} ({OFFER_DETAILS_DATA.reviews} {OFFER_DETAILS_TEXT.reviews})
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            {/* <button className="flex items-center justify-center gap-2 rounded-xl h-11 px-5 bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-all">
              <span className="material-symbols-outlined text-lg"><Share/></span>
              مشاركة
            </button> */}
            {/* <button className="flex items-center justify-center gap-2 rounded-xl h-11 px-5 bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-all">
              <span className="material-symbols-outlined text-lg">
                favorite_border
              </span>{" "}
              حفظ
            </button> */}
          </div>
        </div>

        <Gallery images={OFFER_DETAILS_DATA.images} />

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Details */}
          <div className="flex-1 flex flex-col gap-10">

            {/* Description */}
            <div className="flex flex-col gap-5">
              <h3 className="text-2xl font-extrabold text-slate-900">
                {OFFER_DETAILS_TEXT.about}
              </h3>
              {OFFER_DETAILS_DATA.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-slate-600 text-base leading-[1.8] font-medium"
                >
                  {paragraph}
                </p>
              ))}
              {/* <button className="text-primary font-bold text-right hover:underline w-max">
                اقرأ المزيد
              </button> */}
            </div>

            {/* Amenities */}
            <div className="flex flex-col gap-8 bg-slate-50 py-8 rounded-3xl border border-slate-100">
              <h3 className="text-2xl font-extrabold text-slate-900">
                {OFFER_DETAILS_TEXT.amenities}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
                {OFFER_DETAILS_DATA.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 text-slate-700 font-medium"
                  >
                    <span className="material-symbols-outlined text-primary text-xl">
                      <Check size={'20'}/>
                    </span>{" "}
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            {/* User Reviews Section */}
            <div className="flex flex-col gap-8">
              <div className="flex justify-between">
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {OFFER_DETAILS_TEXT.user_reviews}
                </h3>
                  { isLoading ? (
                      <div className="h-[40px] w-[120px] animate-pulse rounded-full border border-white/40 bg-white/30"></div>
                  ) : user && user.role === "student" ? (
                  <button
                    onClick={handleOpenReviewPopup}
                    className="px-5 py-2 rounded-2xl bg-primary text-white font-bold hover:bg-gray-900 transition cursor-pointer"
                  >
                    {OFFER_DETAILS_TEXT.add_review}
                  </button>
                  ) : null
                }
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {OFFER_DETAILS_DATA.reviewsData.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col gap-4 shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-slate-900">
                          {review.author}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`material-symbols-outlined text-sm ${
                              i < review.rating ? "" : "text-slate-200"
                            }`}
                          >
                            <StarIcon size={'15'}/>
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="w-full lg:w-[400px]">
            <div className="sticky top-28 flex flex-col gap-6">
              <BookingCard onBooking={handleBooking} />
              <LandlordProfileCard />
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && <BookingConfirmationPopup onClose={handleClosePopup} />}
      {isReviewPopupOpen && <ReviewPopup onClose={handleCloseReviewPopup} />}
    </main>
  );
};

export default OfferDetails;

