import { ChevronLeft, ChevronRight, Mail } from "lucide-react";

const bookingRequestsData = [
  {
    studentName: "أليس سميث",
    propertyTitle: "  بالقرب من الحرم الجامعي",
    date: "12 أكتوبر 2023",
    email: "alice.smith@example.com",
    status: "pending",
  },
  {
    studentName: "بوب جونسون",
    propertyTitle: "بالقرب من الحرم الجامعي",
    date: "10 أكتوبر 2023",
    email: "bob.johnson@example.com",
    status: "approved",
  },
  {
    studentName: "تشارلي براون",
    propertyTitle: "بالقرب من الحرم الجامعي",
    date: "08 أكتوبر 2023",
    email: "charlie.brown@example.com",
    status: "rejected",
  },
];

const BookingRequests = () => {
  return (
    <div className="max-w-6xl py-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
                    <h1 className="font-headline text-3xl font-bold text-on-surface mb-2">  إدارة الحجوزات </h1>
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
              {bookingRequestsData.map((request, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-on-surface">
                      {request.studentName}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-700 font-medium">
                      {request.propertyTitle}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-500">
                      {request.date}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Mail className="text-lg text-primary" />
                      <span>{request.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    {request.status === "pending" && (
                      <div className="flex justify-end gap-2">
                        <button className="inline-flex items-center justify-center px-3 py-1.5 border border-green-500 text-green-600 hover:bg-green-50 rounded-lg transition-colors text-xs font-bold">
                          قبول
                        </button>
                        <button className="inline-flex items-center justify-center px-3 py-1.5 border border-red-500 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-xs font-bold">
                          رفض
                        </button>
                      </div>
                    )}
                    {request.status === "approved" && (
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
              ))}
            </tbody>
            <tfoot className="bg-slate-50 border-t border-slate-200">
              <tr>
                <td className="px-6 py-3" colSpan={5}>
                  <div className="flex items-center gap-2 justify-end">
                    {/* <nav
                      aria-label="Pagination"
                      className="inline-flex gap-1.5 items-center"
                    >
                      <button className="relative inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors">
                        <ArrowRightIcon size={20}/>
                        <span>السابق</span>
                      </button>
                      <button
                        aria-current="page"
                        className="relative z-10 inline-flex items-center rounded-md bg-primary px-3 py-1 text-xs font-bold text-on-primary-container focus:z-20"
                      >
                        1
                      </button>
                      <button className="relative inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors">
                        2
                      </button>
                      <button className="relative inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors">
                        3
                      </button>
                      <span className="relative inline-flex items-center px-2 py-1 text-xs font-medium text-outline">
                        ...
                      </span>
                      <button className="relative inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors">
                        10
                      </button>
                      <button className="relative inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors">
                        <span>التالي</span>
                        <ArrowLeftIcon size={20}/>
                      </button>
                    </nav> */}
                            <div className="flex justify-end mt-4">
                    <div className="flex items-center gap-2">
                        <button disabled>
                        <ChevronRight />
                        </button>
                        <button className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container font-bold">1</button>
                        <button className="w-10 h-10 rounded-lg">2</button>
                        <button className="w-10 h-10 rounded-lg">3</button>
                        <button>
                        <ChevronLeft />
                        </button>
                    </div>
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

export default BookingRequests