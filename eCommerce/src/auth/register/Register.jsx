import React from "react";
import {Link} from "react-router"

const Register = () => {
    return (
        <>
            <div>Register</div>
            <span>Have an account? <Link to="/login">login</Link></span>
        </>
    )
}

export default Register