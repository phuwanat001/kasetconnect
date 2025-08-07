import {createBrowserRouter} from "react-router-dom";
import App from "../App"
import Home from '../pages/home/Home';
import Category from "../components/Category";
import Contact from '../components/Contact';
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/machines/CartPage";


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
            {path: '/cart', element: <CartPage/>}
        ],
    },
])

export default router;