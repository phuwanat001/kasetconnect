import {createBrowserRouter} from "react-router-dom";
import App from "../App"
import Home from '../pages/home/Home';
import Category from "../components/Category";
import Contact from '../components/Contact';
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/machines/CartPage";
import RentalPage from "../pages/machines/RentalPage";
import PaymentPage from "../pages/machines/PaymentPage";
import MachineDetailPage from "../pages/machines/MachineDetailPage";
import Profile from "../pages/Profile";
import RentalList from "../pages/machines/RentalList";
import TermsPage from "../pages/machines/TermsPage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <Home />},
            {path: '/category', element: <Category />},
            {path: '/contact', element: <Contact />},
            {path: '/login', element: <Login/>},
            {path: '/register', element: <Register/>},
            {path: '/cart', element: <CartPage/>},
            {path: '/rental', element: <RentalPage />},
            {path: '/payment', element: <PaymentPage />},
            {path: '/machines/:id', element: <MachineDetailPage />},
            {path: '/profile', element: <Profile />},
            {path: '/rentallist', element: <RentalList />},
            {path: '/terms', element: <TermsPage/>}
        ],
    },
])

export default router;