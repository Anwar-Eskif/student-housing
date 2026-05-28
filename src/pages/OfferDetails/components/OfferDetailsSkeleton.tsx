const OfferDetailsSkeleton = () => {
  return (
    <main className="px-6 md:px-12 py-8 flex flex-1 justify-center pt-[30px] md:pt-[130px]" dir="rtl">
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 animate-pulse">
        {/* Title & Header Info */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div className="flex flex-col gap-3 w-full max-w-lg">
            <div className="h-10 bg-slate-200 rounded-lg w-3/4"></div>
            <div className="h-6 bg-slate-200 rounded-lg w-1/2"></div>
          </div>
          <div className="flex gap-3">
            <div className="h-11 w-28 bg-slate-200 rounded-xl"></div>
            <div className="h-11 w-28 bg-slate-200 rounded-xl"></div>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2.5 h-[450px] mb-12">
          <div className="col-span-2 row-span-2 rounded-3xl bg-slate-200"></div>
          <div className="col-span-1 row-span-1 rounded-3xl bg-slate-200"></div>
          <div className="col-span-1 row-span-1 rounded-3xl bg-slate-200"></div>
          <div className="col-span-1 row-span-1 rounded-3xl bg-slate-200"></div>
          <div className="col-span-1 row-span-1 rounded-3xl bg-slate-200"></div>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Details */}
          <div className="flex-1 flex flex-col gap-10">
            {/* Description */}
            <div className="flex flex-col gap-5">
              <div className="h-8 bg-slate-200 rounded-lg w-48"></div>
              <div className="h-4 bg-slate-200 rounded-lg w-full"></div>
              <div className="h-4 bg-slate-200 rounded-lg w-full"></div>
              <div className="h-4 bg-slate-200 rounded-lg w-3/4"></div>
            </div>

            {/* Amenities */}
            <div className="flex flex-col gap-8 bg-slate-50 py-8 px-6 rounded-3xl border border-slate-100">
              <div className="h-8 bg-slate-200 rounded-lg w-48"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-6 w-6 bg-slate-200 rounded-full"></div>
                    <div className="h-5 bg-slate-200 rounded-lg w-32"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* User Reviews Section */}
            <div className="flex flex-col gap-8">
              <div className="flex justify-between">
                <div className="h-8 bg-slate-200 rounded-lg w-48"></div>
                <div className="h-11 w-32 bg-slate-200 rounded-2xl"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col gap-4 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-2">
                        <div className="h-5 bg-slate-200 rounded-lg w-24"></div>
                        <div className="h-3 bg-slate-200 rounded-lg w-16"></div>
                      </div>
                      <div className="flex h-5 w-24 bg-slate-200 rounded-lg"></div>
                    </div>
                    <div className="h-4 bg-slate-200 rounded-lg w-full"></div>
                    <div className="h-4 bg-slate-200 rounded-lg w-5/6"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="w-full lg:w-[400px]">
            <div className="sticky top-28 flex flex-col gap-6">
              <div className="h-96 bg-slate-100 rounded-3xl"></div>
              <div className="h-64 bg-slate-100 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OfferDetailsSkeleton;
