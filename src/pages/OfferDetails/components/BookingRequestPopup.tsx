import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BOOKING_REQUEST_POPUP_TEXT } from "../../../data/data";
import toast from "react-hot-toast";
import { createBooking } from "../../../services/api";

interface BookingRequestPopupProps {
  onClose: () => void;
  offerId: number;
}

const BookingRequestPopup = ({
  onClose,
  offerId,
}: BookingRequestPopupProps) => {
  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      toast.success(data.message || BOOKING_REQUEST_POPUP_TEXT.success_message, {
        style: {
          textAlign: 'right',
        },
        position: 'bottom-center',
      });
      onClose();
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || BOOKING_REQUEST_POPUP_TEXT.error_message;
      toast.error(errorMessage, {
        style: {
          textAlign: 'right',
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      visit_date: "",
      visit_time: "",
    },
    validationSchema: Yup.object({
      visit_date: Yup.date().required("التاريخ مطلوب"),
      visit_time: Yup.string().required("الوقت مطلوب"),
    }),
    onSubmit: (values) => {
      const now = new Date();
      const today = now.toISOString().split("T")[0];
      const currentTime = now.toTimeString().slice(0, 5);

      if (values.visit_date === today && values.visit_time < currentTime) {
        toast.error(BOOKING_REQUEST_POPUP_TEXT.time_expired, {
          style: {
            textAlign: 'right',
          },
        });
        return;
      }
      
      mutation.mutate({
        offer_id: offerId,
        visit_date: values.visit_date,
        visit_time: `${values.visit_time}:00`,
      });
    },
  });

  const getMinTime = () => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    if (formik.values.visit_date === today) {
      return now.toTimeString().slice(0, 5);
    }
    return "00:00";
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
        <form onSubmit={formik.handleSubmit} className="space-y-4 text-right">
          <div>
            <label htmlFor="visit-date" className="block text-sm font-medium text-slate-700">
              {BOOKING_REQUEST_POPUP_TEXT.date_label}
            </label>
            <input
              type="date"
              id="visit_date"
              name="visit_date"
              value={formik.values.visit_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              min={new Date().toISOString().split("T")[0]}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
            {formik.touched.visit_date && formik.errors.visit_date ? (
              <div className="text-red-500 text-sm">{formik.errors.visit_date}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="visit-time" className="block text-sm font-medium text-slate-700">
              {BOOKING_REQUEST_POPUP_TEXT.time_label}
            </label>
            <input
              type="time"
              id="visit_time"
              name="visit_time"
              value={formik.values.visit_time}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              min={getMinTime()}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
            {formik.touched.visit_time && formik.errors.visit_time ? (
              <div className="text-red-500 text-sm">{formik.errors.visit_time}</div>
            ) : null}
          </div>
          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl h-12 font-bold transition-all"
            >
              {BOOKING_REQUEST_POPUP_TEXT.cancel_button}
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-primary hover:bg-primary-light text-white rounded-xl h-12 font-bold transition-all"
            >
              {mutation.isPending ? 'جاري الحجز...' : BOOKING_REQUEST_POPUP_TEXT.confirm_button}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingRequestPopup;
