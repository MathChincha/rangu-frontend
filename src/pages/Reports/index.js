import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react';
import ChartBar from "../../components/Charts/ChartBar";
import ChartLine from "../../components/Charts/ChartLine";
import ChartPie from "../../components/Charts/ChartPie";
import Header from '../../components/Header';
import Loading from '../../components/Loading/Popup';
import styles from './reports.module.scss';



export default function Reports({ history }) {

    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        setTimeout(function () {
            setIsLoading(false);
        }, 2000);
    }, []);

    function logoff() {
        history.push('/');
    }
    function menu() {
        history.push('/menu');
    }
    function orders() {
        history.push('/orders');
    }
    function profile() {
        history.push('/profile');
    }
    function employess() {
        history.push('/employess');
    }
    function tables() {
        history.push('/tables');
    }
    function reports() {
        history.push('/reports');
    }

    return (
        isLoading ? <Loading /> :
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Header menu={() => menu()} logoff={() => logoff()} orders={() => orders()} profile={() => profile()} employess={() => employess()} tables={() => tables()} reports={() => reports()} />
                <div className={styles.reportsContainer}>
                    <div className={styles.graphics}>
                        <ChartLine />
                        <ChartBar />
                    </div>
                    <div className={styles.graphics}>
                        <div className={styles.graphicsPie}>
                            <ChartPie className={styles.ChartPie} />
                        </div>
                        <ChartBar />
                    </div>
                </div>
            </motion.div>

    );
}