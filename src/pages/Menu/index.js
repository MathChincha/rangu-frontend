import React, { useState } from 'react'
import styles from './menu.module.scss'

export default function Menu({ history }) {
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

    function Login() {
        history.push('/signup');
    }

    return (
        <div className={styles.menuContainer}>

        </div>
    );
}