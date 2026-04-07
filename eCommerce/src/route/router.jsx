import {createBrowserRouter} from "react-router";
import Login from "../auth/login/Login.jsx";
import Register from "../auth/register/Register.jsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element:<Login />
    },
    {
        path: "/",
        element:<Register />
    }
])

export default router;