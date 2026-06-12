import { useState } from "react";
// icons
import { ChevronLeft, ChevronRight, Mail } from "lucide-react";
// library
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQuery } from "@tanstack/react-query";
// api
import { getLandLordBookings, updateBookingStatus } from "../../../../services/api";
// types
import { BookingResponse } from "../../../../types/types";
// utils
import { formatTime12hr } from "../../../../util/FormatTime12hr";
import axios from "axios";
import { ERROR_MESSAGES } from "../../../../data/data";



const BookingRequests = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const queryClient = useQueryClient();


  const { data, isLoading, isError } = useQuery<BookingResponse>({
    queryKey: ['landlordBookings', currentPage],
    queryFn: () => getLandLordBookings(currentPage, limit),
  });


  const { mutate, isPending, variables } = useMutation({
    mutationFn: updateBookingStatus,
    onSuccess: ()=>{
      // Refetch the bookings after updating the status
      queryClient.invalidateQueries({ queryKey: ['landlordBookings', currentPage] });
      toast.success("تم تحديث حالة الطلب بنجاح");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || ERROR_MESSAGES.server_error);
      }
    },

  })

  if (isLoading) {
    return (
      <div className="max-w-6xl py-6 mx-auto flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl py-6 mx-auto text-center text-red-600 font-bold">
        حدث خطأ أثناء تحميل طلبات الحجز. يرجى المحاولة مرة أخرى لاحقاً.
      </div>
    );
  }

  const handleUpdateStateRequest = (bookingId: number, newStatus: "accepted" | "rejected") => {
    mutate({ bookingId, newStatus });
  }

  const { bookings, pagination } = data || { bookings: [], pagination: { totalPages: 1, hasNextPage: false, hasPrevPage: false, page: 1, limit: 10, total: 0 } };

  return (
    <div className="max-w-6xl py-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-headline text-3xl font-bold text-on-surface mb-2"> إدارة الحجوزات </h1>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  اسم الطالب
                </th>
                <th className="px-6 py-4 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  عنوان العقار
                </th>
                <th className="px-6 py-4 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  تاريخ الطلب
                </th>
                <th className="px-6 py-4 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  التواصل
                </th>
                <th className="px-6 py-4 text-slate-500 text-xs font-semibold uppercase tracking-wider text-left">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {bookings.length > 0 ? (
                bookings.map((request) => (
                  <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-on-surface">
                        {request.student_name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-700 font-medium">
                        {request.offer_title}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-500">
                        {new Date(request.visit_date).toLocaleDateString('en-CA').replace(/-/g, '/')} - {formatTime12hr(request.visit_time)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Mail className="text-lg text-primary" />
                        <span>{request.student_email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                      {request.status === "pending" && (
                        <div className="flex justify-end gap-2">
                          {isPending && variables?.bookingId === request.id ? (
                            <div className="flex justify-center w-full px-8">
                              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() => handleUpdateStateRequest(request.id, "accepted")}
                                className="inline-flex items-center justify-center px-3 py-1.5 border border-green-500 text-green-600 hover:bg-green-50 rounded-lg transition-colors text-xs font-bold"
                              >
                                قبول
                              </button>
                              <button
                                onClick={() => handleUpdateStateRequest(request.id, "rejected")}
                                className="inline-flex items-center justify-center px-3 py-1.5 border border-red-500 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs font-bold"
                              >
                                رفض
                              </button>
                            </>
                          )}
                        </div>
                      )}
                      {request.status === "accepted" && (
                        <span className="text-primary text-sm font-bold">
                          مقبول
                        </span>
                      )}
                      {request.status === "rejected" && (
                        <span className="text-red-600 text-sm font-bold">
                          مرفوض
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                    لا توجد طلبات حجز حالياً.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-slate-50 border-t border-slate-200">
              <tr>
                <td className="px-6 py-3" colSpan={5} >
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={!pagination.hasPrevPage}
                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight />
                      </button>
                      
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-bold transition-colors ${
                            currentPage === page
                              ? "bg-primary-container text-on-primary-container"
                              : "hover:bg-slate-200"
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.totalPages))}
                        disabled={!pagination.hasNextPage}
                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingRequests;
