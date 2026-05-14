// React
import { useState } from "react";
import { Star } from "lucide-react";
import { REVIEW_POPUP_TEXT } from "../../../data/data";

interface ReviewPopupProps {
  onClose: () => void;
}

const ReviewPopup = ({ onClose }: ReviewPopupProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50" dir="rtl">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-slate-900">{REVIEW_POPUP_TEXT.add_review_title}</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-medium text-slate-700">{REVIEW_POPUP_TEXT.rating}</label>
            <div className="flex gap-1 text-amber-500 mt-2">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <Star
                    key={i}
                    className="cursor-pointer"
                    fill={
                      ratingValue <= (hoverRating || rating)
                        ? "currentColor"
                        : "none"
                    }
                    onClick={() => setRating(ratingValue)}
                    onMouseEnter={() => setHoverRating(ratingValue)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="font-medium text-slate-700">
              {REVIEW_POPUP_TEXT.comment}
            </label>
            <textarea
              id="comment"
              rows={4}
              className="w-full mt-2 p-3 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary"
              placeholder={REVIEW_POPUP_TEXT.share_experience}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition"
          >
            {REVIEW_POPUP_TEXT.cancel}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-primary text-white font-bold hover:bg-gray-900 transition"
          >
            {REVIEW_POPUP_TEXT.submit_review}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
