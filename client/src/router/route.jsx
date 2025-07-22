import {createBrowserRouter} from "react-router-dom";
import App from "../App"
import Users from "../components/Users"
import Search from '../components/Search'
/*import Contact from '../components/Contact'
import Login from '../components/Login'*/ //กรณีเติมหน้าอื่นอีก

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'users', element: <Users />},
            {path: 'search', element: <Search />},
        ],
    },
])

export default router;