import {createBrowserRouter} from "react-router";
import Login from "../auth/login/Login.jsx";
import Register from "../auth/register/Register.jsx";
import Products from "../components/products/Products.jsx"

const router = createBrowserRouter([
    {
        path: "/login",
        element:<Login />
    },
    {
        path: "/",
        element:<Register />
    },
    {
        path: "/products",
        element:<Products/>
    }
])

export default router;