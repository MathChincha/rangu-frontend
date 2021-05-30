import React, { useState } from 'react'
import styles from './login.module.scss'
import logo from '../../assets/logo.png'

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    async function handleSubmit(event) {
        event.preventDefault();

        try {
            history.push('/signup')
        } catch (err) {
            alert("Alerta");
        }
    }

    function ForgotPassword() {
        history.push('/forgotpassword');
    }

    function SignUp() {
        history.push('/signup');
    }

    return (
        <div className={styles.loginContainer}>
            <img src={logo} alt="Logo" />
            <p>Sign In</p>
            <form onSubmit={handleSubmit}>
                <input placeholder="email" name="email" id="email" value={email} onChange={event => setEmail(event.target.value)} />
                <input placeholder="password" name="password" id="password" value={password} onChange={event => setPassword(event.target.value)} />
                <button type="submit">Sign In</button>
                <div>
                    <label onClick={ForgotPassword}>Forgot password?</label>
                    <label onClick={SignUp}>Not a member yet?</label>
                </div>
            </form>
        </div>
    );
}