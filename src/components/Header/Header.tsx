// auth context
import { useAuth } from "../../context/AuthContext"
import { useState } from "react"
// router
import { Link } from "react-router-dom"
// static data
import { NAV_LINKS, AUTH_TEXT } from "../../data/data"
// icons
import { Home, LogIn, Menu } from "lucide-react"
// components
import ProfileDropdown from "./ProfileDropdown/ProfileDropdown"


const Header = () => {
    const { user, name, logout, isLoading } = useAuth()
    const safeName = (name ?? "").trim()
    const isArabicName = /[\u0600-\u06FF]/.test(name ?? "")
    const formattedEnglishName = safeName
        ? `${safeName.charAt(0).toUpperCase()}${safeName.slice(1)}`
        : ""
    const welcomeMessage = isArabicName ? "أهلا" : "Wellcome"
    const displayName = isArabicName ? safeName : formattedEnglishName
    const [isOpen, setIsOpen] = useState(false);

    const logoutProcess = () => {
        window.location.href = '/'
        logout()
    }
    return (
        <nav className="fixed top-4 right-4 left-4 z-50 flex flex-row items-center justify-between rounded-2xl border border-white/45 bg-white/20 px-1 md:px-6 py-4 shadow-[0_18px_45px_rgba(15,23,42,0.22)] backdrop-blur-2xl md:right-8 md:left-8 md:py-5">
            <div className="flex items-center">
                {/* menu for mobile view */}
                <div className="md:hidden px-2 flex justify-start">
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-slate-200">
                        <Menu size={20} className="text-primary-light" />
                    </button>
                </div>
                <div>
                    <ul className={`mx-3 md:hidden flex-col rounded-lg border border-white/40 bg-white px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-xl absolute top-[70%] right-0 mt-2 ${isOpen ? 'flex' : 'hidden'}`}>
                        {NAV_LINKS.map((item, index) => (
                            <div key={item.path}>
                                <li className="mx-3 text-sm md:text-lg">
                                    <Link className="font-medium text-slate-700 transition-all duration-200 hover:text-primary" to={item.path}>{item.label}</Link>
                                </li>
                                {index !== NAV_LINKS.length - 1 && (
                                    <div className="border-t border-gray-300 my-1"></div>
                                )}
                            </div>
                        ))}
                        {user?.role === 'student' && (
                            <div>
                                <li className="mx-3 text-sm md:text-lg">
                                    <Link className="font-medium text-slate-700 transition-all duration-200 hover:text-primary" to={'my-bookings'}>{AUTH_TEXT.my_bookings}</Link>
                                </li>
                            </div>
                        )}
                    </ul>
                </div>
                {/* 1. If currently fetching user data, show a loading placeholder */}
                {isLoading ? (
                    <div className="h-[40px] w-[120px] animate-pulse rounded-full border border-white/40 bg-white/30"></div>
                ) : user ? (
                    /* 2. Once loaded and user exists, show the Dropdown */
                    <ProfileDropdown>
                        {/* <div className={isArabicName ? 'text-right' : 'text-left'}>{`${welcomeMessage} ${displayName}`.trim()}</div> */}
                        <div className={'text-center'}>{`${welcomeMessage} ${displayName}`.trim()}</div>
                        {user.role === 'landlord' && (
                            <>
                                <div className="border-t border-gray-300 my-1"></div>
                                <Link className="block w-full text-gray-500 my-2" to={'/platform'}> لوحة التحكم </Link>
                            </>
                        )}
                        <div className="border-t border-gray-300 my-1"></div>
                        <button className="block w-full text-red-500 my-1 text-right cursor-pointer" onClick={() => logoutProcess()}>تسجيل الخروج</button>
                    </ProfileDropdown>
                ) : (
                    /* 3. If loaded but NO user exists, show Login link */
                    <Link to={'/auth'}>
                        <div className="flex cursor-pointer items-center rounded-full border border-white/40 bg-primary/90 px-4 py-2 text-background-light transition-all duration-300 hover:scale-[1.02] hover:bg-primary">
                            <LogIn /> <span className="mx-2">{AUTH_TEXT.login}</span>
                        </div>
                    </Link>
                )}
                <ul className="hidden mx-3 md:flex flex-row rounded-full border border-white/40 bg-white/25 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-xl">
                    {NAV_LINKS.map((link) => (
                        <li key={link.path} className="mx-3 text-sm md:text-lg">
                            <Link className="font-medium text-slate-700 transition-all duration-200 hover:text-primary" to={link.path}>{link.label}</Link>
                        </li>
                    ))}
                    {user?.role === 'student' && (
                        <div>
                            <li className="mx-3 text-sm md:text-lg">
                                <Link className="font-medium text-slate-700 transition-all duration-200 hover:text-primary" to={'my-bookings'}>{AUTH_TEXT.my_bookings}</Link>
                            </li>
                        </div>
                    )}
                </ul>

            </div>
            <div className="rounded-xl border border-white/40 bg-primary/90 p-3">
                <Home className="text-white" />
            </div>
        </nav>
    )
}
export default Header