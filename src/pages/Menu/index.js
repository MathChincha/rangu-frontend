import React, { useState } from 'react'
import styles from './menu.module.scss'
import Header from '../../components/Header'
import Popup from '../../components/Popup/Popup'

import BigMac from '../../assets/BigMac.jpg'
import McChicken from '../../assets/McChicken.png'
import CocaCola from '../../assets/CocaCola.jpg'

export default function Menu({ history }) {
    const [isOpenType, setIsOpenType] = useState(false);



    function togglePopupType() {
        setIsOpenType(!isOpenType);
    }



    const types = [
        {
            id: 1,
            type: 'Hamburguers'
        },
        {
            id: 2,
            type: 'Drinks'
        },
        {
            id: 3,
            type: 'Dessert'
        },
        {
            id: 4,
            type: 'Porções'
        }
    ]

    const foods = [
        {
            id: 5,
            type: 'Hamburguers',
            foodImg: BigMac,
            dishName: 'Big Mac',
            eta: '5 min',
            price: 'R$ 35.99',
            description: "There is nothing like it. Two hamburgers, lettuce, cheese and special sauce, onion and pickles on a sesame bun. The flavor of McDonald's is triply delicious. With three 100% beef burgers, melted cheese, onion, pickles, ketchup and mustard. There is nothing like it. Two hamburgers, lettuce, cheese and special sauce, onion and pickles on a sesame bun.",
        },
        {
            id: 6,
            type: 'Hamburguers',
            foodImg: McChicken,
            dishName: 'McChicken',
            eta: '2 min',
            price: 'R$ 10.90',
            description: 'The flavor you love. Breaded and browned chicken with a smooth, creamy sauce, accompanied by crispy lettuce on a sesame bun.',
        },
        {
            id: 7,
            type: 'Drinks',
            foodImg: CocaCola,
            dishName: 'Coca-Cola',
            eta: '2 min',
            price: 'R$ 5.00',
            description: 'A cold Brew',
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
        history.push('/');
    }
    function orders() {
        history.push('/');
    }
    function profile() {
        history.push('/');
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
            <Header menu={() => menu()} logoff={() => logoff()} orders={() => orders()} profile={() => profile()} />
            <div className={styles.menuContainer}>
                <button className={styles.newCategory} onClick={() => { togglePopupType() }}>Create New Category</button>
                <div>
                    {types.map((type) => (
                        <>
                            <h1 className={styles.title} key={type.id}>{type.type}</h1>
                            <ul className={styles.foodList} key={type.id}>
                                <button className={styles.ul}>Disable Category</button>
                                <button className={styles.ul}>Add Item</button>
                                {foods.filter(food => food.type === type.type).map((food) => (
                                    <li className={styles.foodList} key={food.id}>
                                        <img className={styles.dishImg} src={food.foodImg} alt="Food" />
                                        <strong className={styles.dishName}>{food.dishName}</strong>
                                        <strong className={styles.description}>Description: {food.description}</strong>
                                        <strong className={styles.price}>Price: <strong className={styles.color}>{food.price}</strong></strong>
                                        <strong className={styles.eta}>Time to Prepare: <strong className={styles.color}>{food.eta}</strong></strong>
                                        <button className={styles.li1}>Disable Item</button>
                                        <button className={styles.li2}>Edit Item</button>
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