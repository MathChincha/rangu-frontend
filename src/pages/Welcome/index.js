import { motion } from "framer-motion";
import React from 'react';
import logo from '../../assets/logo.png';
import styles from './welcome.module.scss';

export default function welcome({ history }) {

    function SignUp() {
        history.push('/signup');
    }

    function Login() {
        history.push('/login');
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0}} transition={{type:"tween",ease:"anticipate",duration: 1}}>
            <div className={styles.container}>

                <div className={styles.welcomeContainer}>
                    <p className={styles.text} >Transforme e inove sua maneira de gerenciar seu restaurante com Rangu</p>
                    <div className={styles.rowButtons}>
                        <button onClick={SignUp} className={styles.btn}>Cadastrar</button>
                        <button onClick={Login} className={styles.btn}>Login</button>
                    </div>
                </div>

                <div className={styles.iconContainer}>
                    <img className={styles.icon} src={logo} alt="Logo" />
                </div>
            </div>
        </motion.div>
    )
}
