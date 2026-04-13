import React, {useState} from "react";
import styles from './Login.module.css'
import {useLoginMutation} from "../../apis/productApi.jsx";


const Login = () => {
    const userDetails = {
        username: "",
        password: ""
    }

    const [login, {data, isLoading}] = useLoginMutation();
    const [userProfile, setUserProfile] = useState(userDetails)

    const changeHandler = (event) => {
        console.log(event)
        const {name, value} = event.target;

        setUserProfile((prev)=>({...prev, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try{

        } catch (error) {

        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Login</h2>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <input onChange={changeHandler}
                        type="username"
                        placeholder="Username"
                        className={styles.input}
                    />

                    <input onChange={changeHandler}
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                    />

                    <button className={styles.button}>Login</button>
                </form>
            </div>
        </div>

    )
}

export default Login;