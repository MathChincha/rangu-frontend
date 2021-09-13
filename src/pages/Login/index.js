import React, { useState } from 'react'
import styles from './login.module.scss'
import { apiUsers } from '../../services/api'
import Popup from '../../components/Popup/Popup'

import logo from '../../assets/logo.png'
import Loading from '../../assets/Loading.gif'

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const type = 'RESTAURANT';
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        console.log(email);
        console.log(password);
        console.log(type);

        try {
            const response = await apiUsers.post('/login',
                {
                    email,
                    password,
                    type
                });
            console.log(response);
            sessionStorage.setItem('token', response.data.token);
            console.log(sessionStorage.getItem('token'));
            setIsLoading(false);
            history.push('/menu');
        } catch (err) {
            alert("Alerta");
            setIsLoading(false);
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
            {
                isLoading && <Popup
                    content={<>
                        <img src={Loading} alt="Loading"></img>
                    </>}
                />
            }
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