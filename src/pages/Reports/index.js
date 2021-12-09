import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react';
import ChartBar from "../../components/Charts/ChartBar";
import ChartLine from "../../components/Charts/ChartLine";
import ChartPie from "../../components/Charts/ChartPie";
import NumberOrdersChart from "../../components/Charts/NumberOrdersChart";
import Header from '../../components/Header';
import Loading from '../../components/Loading/Popup';
import styles from './reports.module.scss';
import { apiOrchestrate } from '../../services/api'

export default function Reports({ history }) {

    const [isLoading, setIsLoading] = useState(false);
    const [analyticsOrders, setAnalyticsOrders] = useState();


    useEffect( async () => {
        setIsLoading(true);
        const restaurantId = sessionStorage.getItem('idR')
        var starterDate = '2021-12-01';
        var analyticsOrders = await apiOrchestrate.get('/analytics/orders', {
            headers: {
                restaurantId: restaurantId,
                starterDate: starterDate
            }
        });
        setAnalyticsOrders(analyticsOrders.data);
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
                        <NumberOrdersChart />
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