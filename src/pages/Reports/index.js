import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react';
import ChartBar from "../../components/Charts/ChartBar";
import ChartLine from "../../components/Charts/ChartLine";
import ChartPie from "../../components/Charts/ChartPie";
import QuantityOrdersChart from "../../components/Charts/QuantityOrdersChart";
import Header from '../../components/Header';
import Loading from '../../components/Loading/Popup';
import { apiOrchestrate } from '../../services/api';
import styles from './reports.module.scss';

export default function Reports({ history }) {

    const [isLoading, setIsLoading] = useState(true);
    const [analyticsOrdersWeek, setAnalyticsOrdersWeek] = useState({});
    const [analyticsPeopleWeek, setAnalyticsPeopleWeek] = useState({});
    const [analyticsIncomeWeek, setAnalyticsIncomeWeek] = useState({});
    const [analyticsFavoritesWeek, setAnalyticsFavoritesWeek] = useState({});

    const [analyticsOrdersYear, setAnalyticsOrdersYear] = useState({});
    const [analyticsPeopleYear, setAnalyticsPeopleYear] = useState({});
    const [analyticsIncomeYear, setAnalyticsIncomeYear] = useState({});
    const [analyticsFavoritesYear, setAnalyticsFavoritesYear] = useState({});

    const [typeAnalytics, setTypeAnalytics] = useState('Semanal');


    useEffect(() => {
        analyticsLoad()
    }, []);

    function changeTypeAnalytics() {
        if (typeAnalytics == 'Semanal') {
            setTypeAnalytics('Mensal')
        } else {
            setTypeAnalytics('Semanal')
        }
    }


    async function analyticsLoad() {
        const restaurantId = sessionStorage.getItem('idR')
        var labels = []
        var values = []
        var responseAnalyticsOrders = await apiOrchestrate.get('/analytics/orders/week', {
            headers: {
                restaurantId: restaurantId
            }
        });
        responseAnalyticsOrders.data.forEach(label => labels.push(formatDate(label.dateOfWeek)))
        responseAnalyticsOrders.data.forEach(value => values.push(value.quantityOfOrders))
        setAnalyticsOrdersWeek({labels, values})

        var responseAnalyticsPeople = await apiOrchestrate.get('/analytics/people/week', {
            headers: {
                restaurantId: restaurantId
            }
        });
        values = []
        responseAnalyticsPeople.data.forEach(value => values.push(value.quantityOfPeople))
        setAnalyticsPeopleWeek({labels,values})

        var responseAnalyticsIncome = await apiOrchestrate.get('/analytics/income/week', {
            headers: {
                restaurantId: restaurantId
            }
        });
        values = []
        responseAnalyticsIncome.data.forEach(value => value.profit == 'NaN' ? values.push('0') : values.push(value.profit.toString()))
        setAnalyticsIncomeWeek({labels,values})
        console.log(analyticsIncomeWeek)
        var responseAnalyticsFavorites = await apiOrchestrate.get('/analytics/favorites_dishs/week', {
            headers: {
                restaurantId: restaurantId
            }
        });
        values = []
        var allOrders = []
        var dishesNames = new Set();
        responseAnalyticsFavorites.data.forEach(ordersDay => {
            ordersDay.quantity.forEach(orders => {
                allOrders.push(orders)
            })

        })
        allOrders.forEach(orders => dishesNames.add(orders.dish.name))

        dishesNames.forEach(nameDish => {
            var result = 0
            allOrders.forEach(orders => {
                if (orders.dish.name == nameDish) {
                    result = orders.quantity + result;
                }
            })
            values.push(result)
        })
        labels = [...dishesNames]
        setAnalyticsFavoritesWeek({labels,values})
        

        var responseAnalyticsOrdersYear = await apiOrchestrate.get('/analytics/orders/year', {
            headers: {
                restaurantId: restaurantId
            }
        });

        labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novrembro', 'Dezembro']
        values = []
        responseAnalyticsOrdersYear.data.forEach(value => values.push(value.quantityOfOrders))
        setAnalyticsOrdersYear({labels, values})


        var responseAnalyticsPeopleYear = await apiOrchestrate.get('/analytics/people/year', {
            headers: {
                restaurantId: restaurantId
            }
        });
        values = []
        responseAnalyticsPeopleYear.data.forEach(value => values.push(value.quantityOfPeople))
        setAnalyticsPeopleYear({labels, values})

        var responseAnalyticsPeopleYear = await apiOrchestrate.get('/analytics/income/year', {
            headers: {
                restaurantId: restaurantId
            }
        });
        values = []
        responseAnalyticsPeopleYear.data.forEach(value => value.profit == 'NaN' ? values.push('0') : values.push('R$ ' + value.profit.toString()))
        setAnalyticsIncomeYear({labels, values})




        var responseAnalyticsFavoritesYear = await apiOrchestrate.get('/analytics/favorites_dishs/year', {
            headers: {
                restaurantId: restaurantId
            }
        });
        values = []
        labels = []
        allOrders = []
        dishesNames = new Set();
        responseAnalyticsFavoritesYear.data.forEach(ordersMonth => {
            ordersMonth.quantity.forEach(orders => {
                allOrders.push(orders)
            })

        })
        allOrders.forEach(orders => dishesNames.add(orders.dish.name))
        dishesNames.forEach(nameDish => {
            var result = 0
            allOrders.forEach(orders => {
                if (orders.dish.name == nameDish) {
                    result = orders.quantity + result;
                }
            })
            values.push(result)
        })
        labels = [...dishesNames]
        setAnalyticsFavoritesYear({labels,values})
        setIsLoading(false)
    }

    function formatDate(date) {
        date = new Date(date);
        var newDate = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        return newDate.split("/", 2).join("/")
    }


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
            typeAnalytics == 'Semanal' ?
                <>
                    <Header menu={() => menu()} logoff={() => logoff()} orders={() => orders()} profile={() => profile()} employess={() => employess()} tables={() => tables()} reports={() => reports()} />
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <button className={styles.buttonAnalytics} onClick={() => changeTypeAnalytics()}>{typeAnalytics}</button>
                        <div className={styles.reportsContainer}>
                            <div className={styles.graphics}>
                                <ChartLine analytics={analyticsPeopleWeek} />
                                <QuantityOrdersChart analytics={analyticsOrdersWeek} />
                            </div>
                            <div className={styles.graphics}>
                                <div className={styles.graphicsPie}>
                                    <ChartPie className={styles.ChartPie} analytics={analyticsFavoritesWeek} />
                                </div>
                                <ChartBar analytics={analyticsIncomeWeek}/>
                            </div>
                        </div>
                    </motion.div>
                </>
                :
                <>
                    <Header menu={() => menu()} logoff={() => logoff()} orders={() => orders()} profile={() => profile()} employess={() => employess()} tables={() => tables()} reports={() => reports()} />
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <button className={styles.buttonAnalytics} onClick={() => changeTypeAnalytics()}>{typeAnalytics}</button>
                        <div className={styles.reportsContainer}>
                            <div className={styles.graphics}>
                                <ChartLine analytics={analyticsPeopleYear} />
                                <QuantityOrdersChart typeAnalytics={typeAnalytics} analytics={analyticsOrdersYear} />
                            </div>
                            <div className={styles.graphics}>
                                <div className={styles.graphicsPie}>
                                    <ChartPie className={styles.ChartPie} analytics={analyticsFavoritesYear} />
                                </div>
                                <ChartBar analytics={analyticsIncomeYear}/>
                            </div>
                        </div>
                    </motion.div>
                </>
    );
}