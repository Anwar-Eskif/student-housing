import { NavLink, Outlet } from "react-router-dom";
import { Home, CalendarIcon, PlusSquare, Undo2 } from "lucide-react";

const Layout = () => {
  return (
    <div dir="rtl" className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-outline-variant px-10 py-3 bg-surface-container-lowest">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <Building className="text-2xl text-primary" />
              <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-[-0.015em]">
                سكن الطلاب
              </h2>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD3f8e268p9A5iZIrHLE8azMZwhbQJTXZWkYj-T9LHcj0bqXrrvRsOxGRXkPpAWZaRok6-p21HbVh7GRE3pVy7dndPcysA9LVF52xaMe4x2tfF1LAy86Hl1NAExHaDskZAeRCrmoG1vRbP7zSkHGFRtKsWp_EnRpvOH9wPvHVRWQ3rGgSwYX8iT1mdDfgbbZaKv0zIuy56PVsIbZHFcpMaw19gSbuy3Etdk9K6i2JQUlXp-9b7QZbzJfmErOmBz5yYbhuuX6U_MAuw")',
              }}
            ></div>
          </div>
        </header> */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-64 border-l border-slate-200 fixed bg-white  flex flex-col justify-between py-6 px-4">
            <div className="flex flex-col gap-6">
              <div className="flex gap-3 items-center">
                <div className="flex justify-center bg-primary w-full rounded-xl p-2">
                  <h1 className="text-white font-bold leading-normal">
                    لوحة التحكم
                  </h1> 
                </div>
              </div>
              <nav className="flex flex-col gap-2">
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "text-white bg-primary-light/50"
                        : "text-slate-700 hover:bg-slate-50"
                    }`
                  }
                  to="/platform/booking-requests"
                >
                  <CalendarIcon className="text-xl" />
                  <span className="text-sm font-medium leading-normal">
                    الحجوزات
                  </span>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ?  "text-white bg-primary-light/50"
                        : "text-slate-700 hover:bg-slate-50"
                    }`
                  }
                  to="/platform/my-offers"
                >
                  <Home className="text-xl" />
                  <span className="text-sm font-medium leading-normal">
                    عروضي
                  </span>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ?  "text-white bg-primary-light/50"
                        : "text-slate-700 hover:bg-slate-50"
                    }`
                  }
                  to="/platform/add-offer"
                >
                  <PlusSquare className="text-xl" />
                  <span className="text-sm font-medium leading-normal">
                    إضافة عرض جديد
                  </span>
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ?  "text-white bg-primary-light/50"
                        : "text-slate-700 hover:bg-slate-50"
                    }`
                  }
                  to="/"
                >
                  <Undo2 className="text-xl" />
                  <span className="text-sm font-medium leading-normal">
                    الرجوع الى الموقع
                  </span>
                </NavLink>
              </nav>
            </div>
          </aside>
          {/* Main Content */}
          <main className="flex-1 p-8 pr-60 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout