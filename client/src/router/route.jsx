import {createBrowserRouter} from "react-router-dom";
import App from "../App"
import Home from '../pages/Home'
import Users from "../components/Users"
import Category from "../components/Category";
import Search from '../components/Search'
import Contact from '../components/Contact'
/*import Login from '../components/Login'*/ //กรณีเติมหน้าอื่นอีก

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <Home />},
            {path: 'users', element: <Users />},
            {path: 'search', element: <Search />},
            {path: 'category', element: <Category />},
            {path: 'contact', element: <Contact />},
        ],
    },
])

export default router;