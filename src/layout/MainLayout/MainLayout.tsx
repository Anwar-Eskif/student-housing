import { Outlet, ScrollRestoration } from "react-router-dom"
//components
import { Header } from "../../components";
import Footer from "../../components/Footer/Footer";

const MainLayout = () => {
    // const auth = useContext(AuthContext);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem("token");

    //     if (axios.isAxiosError(auth?.error) && auth?.error?.response?.status === 401 || !token) {
    //         localStorage.removeItem("token");
    //         navigate('/auth');
    //     }
    // }, [auth?.error, navigate]);

    return (
        <div className="flex min-h-screen flex-col" dir="rtl" >
            <Header />
                <div className="min-h-screen bg-surface-low pt-20 md:pt-0">
                    <Outlet />
                    <ScrollRestoration />
                </div>
            <Footer/>
        </div>
    )
}
export default MainLayout;