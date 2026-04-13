import React from "react";
import styles from './Login.module.css'


const Login = () => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Login</h2>

                <form className={styles.form}>
                    <input
                        type="email"
                        placeholder="Email"
                        className={styles.input}
                    />

                    <input
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