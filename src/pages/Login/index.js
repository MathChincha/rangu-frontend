import React, { useState } from 'react'
import styles from './login.module.scss'
import logo from '../../assets/logo.png'

export default function Login({ history }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnpj, setCnpj] = useState('');

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
                <input placeholder="username" name="username" id="username" />
                <input placeholder="password" name="password" id="password" />
                <button type="submit">Sign In</button>
                <div>
                    <label onClick={ForgotPassword}>Forgot password?</label>
                    <label onClick={SignUp}>Not a member yet?</label>
                </div>
            </form>
        </div>
    );
}