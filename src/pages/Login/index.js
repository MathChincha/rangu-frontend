import React, { useState } from 'react'
import styles from './login.module.scss'
import logo from '../../assets/logo.png'
import { apiUsers } from '../../services/api'

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const type = 'RESTAURANT';

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(email);
        console.log(password);
        console.log(type);

        try {
            await apiUsers.post('/login',
                {
                    email,
                    password,
                    type
                });

            history.push('/menu')
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
        <>
            <div className={styles.loginContainer}>
                <img src={logo} alt="Logo" />
                <p>Sign In</p>
                <form onSubmit={handleSubmit}>
                    <input placeholder="email" name="email" id="email" value={email} onChange={event => setEmail(event.target.value)} />
                    <input placeholder="password" name="password" id="password" type="password" value={password} onChange={event => setPassword(event.target.value)} />
                    <button type="submit">Sign In</button>
                    <div>
                        <label onClick={ForgotPassword}>Forgot password?</label>
                        <label onClick={SignUp}>Not a member yet?</label>
                    </div>
                </form>
            </div>
        </>
    );
}