import React, { useState } from 'react'
import styles from './orders.module.scss'
import Header from '../../components/Header'
import Popup from '../../components/Popup/Popup'

export default function Orders({ history }) {
    const [isOpenType, setIsOpenType] = useState(false);

    function togglePopupType() {
        setIsOpenType(!isOpenType);
    }

    const table = [
        {
            id: 11,
            table: 'Table 1'
        },
        {
            id: 12,
            table: 'Table 2'
        },
        {
            id: 13,
            table: 'Table 3'
        },
    ]

    const foods = [
        {
            id: 15,
            table: 'Table 1',
            clientName: 'Matheus',
            dishName: 'Big Mac',
            eta: '5 min',
            price: 'R$ 35.99',
            comments: "Sem cebola, teste teste vai curinthia teste teste",
            status: 'Em preparo'
        },
        {
            id: 16,
            table: 'Table 1',
            clientName: 'Gian',
            dishName: 'McChicken',
            eta: '2 min',
            price: 'R$ 10.90',
            comments: "Sem cebola",
            status: 'Em preparo'
        },
        {
            id: 17,
            table: 'Table 1',
            clientName: 'Gian',
            dishName: 'Coca-Cola',
            eta: '2 min',
            price: 'R$ 5.00',
            comments: 'bem gelada, copo gelo e limão',
            status: 'Concluído'
        },
        {
            id: 18,
            table: 'Table 2',
            clientName: 'Matheus',
            dishName: 'Heineken',
            eta: '2 min',
            price: 'R$ 6.00',
            comments: 'trincando',
            status: 'Concluído'
        },
        {
            id: 19,
            table: 'Table 2',
            clientName: 'Leonarno',
            dishName: 'Pudim',
            eta: '5 min',
            price: 'R$ 10.00',
            comments: '2 garfos por favor',
            status: 'Pronto'
        },
        {
            id: 20,
            table: 'Table 3',
            clientName: 'Luiz',
            dishName: 'Lemon Pie',
            eta: '5 min',
            price: 'R$ 10.00',
            comments: 'Pronto',
            status: 'Concluído'
        },
    ]

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            history.push('/signup')
        } catch (err) {
            alert("Alerta");
        }
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
        <>
            <Header menu={() => menu()} logoff={() => logoff()} orders={() => orders()} profile={() => profile()} employess={() => employess()} tables={() => tables()} reports={() => reports()} />
            <div className={styles.menuContainer}>
                {table.map((table) => (
                    <>
                        <h1 className={styles.title} key={table.id}>{table.table}</h1>
                        <ul className={styles.foodList} key={table.id}>
                            <button className={styles.ul}>Remove Person</button>
                            <button className={styles.ul}>Checkout</button>
                            {foods.filter(food => food.table === table.table).map((food) => (
                                <li className={styles.foodList} key={food.id}>
                                    <strong className={styles.dishName}>{food.dishName}</strong>
                                    <strong className={styles.price}>Price: <strong className={styles.color}>{food.price}</strong></strong>
                                    <strong className={styles.eta}>Time to Prepare: <strong className={styles.color}>{food.eta}</strong></strong>
                                    <strong className={styles.comments}>Comments: <strong className={styles.color}>{food.comments}</strong></strong>
                                    <strong className={styles.clientName}>Client Name: <strong className={styles.color}>{food.clientName}</strong></strong>
                                    <strong className={styles.status}>Status: <strong className={styles.color}>{food.status}</strong></strong>
                                    <button className={styles.li2}>Edit Status</button>
                                </li>
                            ))}
                        </ul>
                    </>
                ))}
            </div>
        </>
    );
}