import { motion } from "framer-motion"
import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { apiLogin } from '../../services/api'
import styles from './login.module.scss'

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
            const response = await apiLogin.post('/login',
                {
                    email,
                    password,
                    type
                });
            console.log(response);
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('idR', response.data.userId);
            console.log(sessionStorage.getItem('token'));
            console.log(sessionStorage.getItem('idR'));
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 1 }}>
            <div className={styles.loginContainer}>
                <img className={styles.img} src={logo} alt="Logo" />
                <form onSubmit={handleSubmit}>
                    <input placeholder="E-mail" name="email" id="email" value={email} onChange={event => setEmail(event.target.value)} />
                    <input placeholder="Senha" name="password" id="password" type="password" value={password} onChange={event => setPassword(event.target.value)} />
                    <button disabled={isLoading} type="submit">{isLoading ? "" : "Login"}</button>
                    <div>
                        <label onClick={ForgotPassword}>Esqueceu a senha?</label>
                        <label onClick={SignUp}>Ainda não é membro?</label>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}