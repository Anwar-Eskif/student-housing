//library
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//pages
import { Home } from "../pages";

import MainLayout from "../layout/MainLayout/MainLayout";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import Offers from "../pages/Offers/Offers";
import OfferDetails from "../pages/OfferDetails/OfferDetails";

import OfferImagesPage from "../pages/OfferDetails/OfferImagesPage";
import Layout from "../pages/Platform/Layout/Layout";
import BookingRequests from "../pages/Platform/pages/BookingRequests/BookingRequests";
import MyOffers from "../pages/Platform/pages/MyOffers/MyOffers";
import UpdateOffer from "../pages/Platform/pages/UpdateOffer/UpdateOffer";
import AddOffer from "../pages/Platform/pages/AddOffer/AddOffer";

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <AuthLayout />,
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'offers',
                element: <Offers />
            },
            {
                path: 'offers/:id',
                element: <OfferDetails />
            },
            {
                path: 'offer-images',
                element: <OfferImagesPage />
            }
        ]
    },
    {
        path: '/platform',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <BookingRequests />
            },
            {
                path: '/platform/booking-requests',
                element: <BookingRequests />
            },
            {
                path: '/platform/my-offers',
                element: <MyOffers />
            },
            {
                path: '/platform/add-offer',
                element: <AddOffer />
            },
            {
                path: '/platform/update-offer/:offerId',
                element: <UpdateOffer />
            },
        ]
    },
    {
        path: '*',
        element: <div>404 Page Not Found</div> // Replace this with your actual Error Page component
    }
])

const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter