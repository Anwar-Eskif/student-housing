// React
import { useState } from "react";
import { Star } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// Data & API
import { REVIEW_POPUP_TEXT } from "../../../data/data";
import { submitReview } from "../../../services/api";

interface ReviewPopupProps {
  offerId: number;
  onClose: () => void;
}

const ReviewPopup = ({ offerId, onClose }: ReviewPopupProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: { rating: number; comment: string }) =>
      submitReview(offerId, values),
    onSuccess: () => {
      toast.success("تم إرسال تقييمك بنجاح!", {
        style: {
          textAlign: 'right',
        },
      });
      queryClient.invalidateQueries({ queryKey: ["offer", String(offerId)] });
      onClose();
    },
    onError: (error: any) => {
      const errorMsg = error.response?.data?.message || "حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى.";
      toast.error(errorMsg, {
        style: {
          textAlign: 'right',
        },
      });
    },
  });

  const validationSchema = Yup.object({
    rating: Yup.number()
      .required("التقييم مطلوب"),
    comment: Yup.string()
      .trim()
      .min(5, "يجب أن يكون التعليق 5 أحرف على الأقل")
      .required("التعليق مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      rating: 0,
      comment: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50" dir="rtl">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white rounded-2xl p-8 max-w-md w-full flex flex-col gap-6"
      >
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
                      ratingValue <= (hoverRating || formik.values.rating)
                        ? "currentColor"
                        : "none"
                    }
                    onClick={() => {
                      formik.setFieldValue("rating", ratingValue);
                      formik.setFieldTouched("rating", true);
                    }}
                    onMouseEnter={() => setHoverRating(ratingValue)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                );
              })}
            </div>
            {formik.touched.rating && formik.errors.rating && (
              <span className="text-red-500 text-xs mt-1 block">{formik.errors.rating}</span>
            )}
          </div>
          <div>
            <label htmlFor="comment" className="font-medium text-slate-700">
              {REVIEW_POPUP_TEXT.comment}
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={4}
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full mt-2 p-3 border rounded-lg focus:ring-primary focus:border-primary ${
                formik.touched.comment && formik.errors.comment
                  ? "border-red-500"
                  : "border-slate-200"
              }`}
              placeholder={REVIEW_POPUP_TEXT.share_experience}
            ></textarea>
            {formik.touched.comment && formik.errors.comment && (
              <span className="text-red-500 text-xs mt-1 block">{formik.errors.comment}</span>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={mutation.isPending}
            className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition disabled:opacity-50"
          >
            {REVIEW_POPUP_TEXT.cancel}
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-5 py-2 rounded-xl bg-primary text-white font-bold hover:bg-gray-900 transition disabled:opacity-50 flex items-center justify-center min-w-[100px]"
          >
            {mutation.isPending ? "جاري الإرسال..." : REVIEW_POPUP_TEXT.submit_review}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewPopup;

