import {createBrowserRouter} from "react-router-dom";
import App from "../App"
import Home from '../pages/home/Home'
import Users from "../components/Users"
import Category from "../components/Category";
import Contact from '../components/Contact'


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <Home />},
            {path: 'users', element: <Users />},
            {path: 'category', element: <Category />},
            {path: 'contact', element: <Contact />},
        ],
    },
])

export default router;