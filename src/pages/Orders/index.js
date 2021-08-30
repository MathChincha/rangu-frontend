import React, { useState } from 'react'
import styles from './orders.module.scss'
import Header from '../../components/Header'
import Popup from '../../components/Popup/Popup'

export default function Menu({ history }) {
    const [isOpenType, setIsOpenType] = useState(false);



    function togglePopupType() {
        setIsOpenType(!isOpenType);
    }



    const tables = [
        {
            id: 1,
            table: 'Table 1'
        },
        {
            id: 2,
            table: 'Table 2'
        },
        {
            id: 3,
            table: 'Table 3'
        },
    ]

    const foods = [
        {
            id: 5,
            table: 'Table 1',
            dishName: 'Big Mac',
            eta: '5 min',
            price: 'R$ 35.99',
            description: "There is nothing like it. Two hamburgers, lettuce, cheese and special sauce, onion and pickles on a sesame bun. The flavor of McDonald's is triply delicious. With three 100% beef burgers, melted cheese, onion, pickles, ketchup and mustard. There is nothing like it. Two hamburgers, lettuce, cheese and special sauce, onion and pickles on a sesame bun.",
        },
        {
            id: 6,
            table: 'Table 1',
            dishName: 'McChicken',
            eta: '2 min',
            price: 'R$ 10.90',
            description: 'The flavor you love. Breaded and browned chicken with a smooth, creamy sauce, accompanied by crispy lettuce on a sesame bun.',
        },
        {
            id: 7,
            table: 'Table 1',
            dishName: 'Coca-Cola',
            eta: '2 min',
            price: 'R$ 5.00',
            description: 'A cold Brew',
        },
        {
            id: 8,
            table: 'Table 2',
            dishName: 'Heineken',
            eta: '2 min',
            price: 'R$ 6.00',
            description: 'A cold Brew',
        },
        {
            id: 9,
            table: 'Table 2',
            dishName: 'Pudim',
            eta: '5 min',
            price: 'R$ 10.00',
            description: 'A delicious Pudim, made in the house',
        },
        {
            id: 10,
            table: 'Table 3',
            dishName: 'Lemon Pie',
            eta: '5 min',
            price: 'R$ 10.00',
            description: 'A delicious Lemon Pie, made in the house',
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

    return (
        <>
            {
                isOpenType && <Popup
                    content={<>
                        <b>Insert the new category</b>
                        <input></input>
                        <div>
                            <button className={styles.insert} onClick={() => { togglePopupType() }}>Insert New Category</button>
                            <button className={styles.insert} onClick={() => { togglePopupType() }}>Cancel</button>
                        </div>
                    </>}
                    handleClose={togglePopupType}
                />
            }
            <Header menu={() => menu()} logoff={() => logoff()} orders={() => orders()} profile={() => profile()} employess={() => employess()} />
            <div className={styles.menuContainer}>
                <button className={styles.newCategory} onClick={() => { togglePopupType() }}>Create New Table</button>
                <div>
                    {tables.map((tables) => (
                        <>
                            <h1 className={styles.title} key={tables.id}>{tables.table}</h1>
                            <ul className={styles.foodList} key={tables.id}>
                                <button className={styles.ul}>Remove Person</button>
                                <button className={styles.ul}>Checkout</button>
                                {foods.filter(food => food.table === tables.table).map((food) => (
                                    <li className={styles.foodList} key={food.id}>
                                        <strong className={styles.dishName}>{food.dishName}</strong>
                                        <strong className={styles.price}>Price: <strong className={styles.color}>{food.price}</strong></strong>
                                        <strong className={styles.eta}>Time to Prepare: <strong className={styles.color}>{food.eta}</strong></strong>
                                        <button className={styles.li2}>Edit Status</button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ))}
                </div>

            </div>
        </>
    );
}