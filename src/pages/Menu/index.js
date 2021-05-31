import React, { useState } from 'react'
import styles from './menu.module.scss'
import Header from '../../components/Header'
import BigMac from '../../assets/BigMac.jpg'
import McChicken from '../../assets/McChicken.png'
import CocaCola from '../../assets/CocaCola.jpg'

export default function Menu({ history }) {

    const foods = [
        {
            id: 1,
            type: 'Prato',
            foodImg: BigMac,
            dishName: 'Big Mac',
            eta: '5 min',
            price: 'R$ 35.99',
            description: 'Não existe nada igual. Dois hambúrgueres, alface, queijo e molho especial, cebola e picles num pão com gergelim. O sabor de McDonald’s triplamente delicioso. Com três hambúrgueres de carne 100% bovina, queijo derretido, cebola, picles, ketchup e mostarda. Não existe nada igual. Dois hambúrgueres, alface, queijo e molho especial, cebola e picles num pão com gergelim.',
        },
        {
            id: 2,
            type: 'Prato',
            foodImg: McChicken,
            dishName: 'McChicken',
            eta: '2 min',
            price: 'R$ 10.90',
            description: 'O sabor que você adora. Frango empanado e dourado com molho suave e cremoso, acompanhado de alface crocante num pão com gergelim.',
        },
        {
            id: 3,
            type: 'Bebida',
            foodImg: CocaCola,
            dishName: 'Coca-Cola',
            eta: '2 min',
            price: 'R$ 5.00',
            description: 'Coca-Cola geladinha',
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

    function sair() {
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
            <Header menu={() => menu()} sair={() => sair()} orders={() => orders()} profile={() => profile()} />
            <div className={styles.menuContainer}>
                <div>
                    <h1>Pratos</h1>
                    <ul className="food-list">
                        {foods.filter(food => food.type === "Prato").map((food) => (
                            <li key={food.id}>
                                <img src={food.foodImg} />
                                <strong>{food.dishName}</strong>
                                <strong>R${food.price}</strong>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h1>Bebidas</h1>
                    <ul className="food-list">
                        {foods.filter(food => food.type === "Bebida").map((food) => (
                            <li key={food.id}>
                                <img src={food.foodImg} />
                                <strong>{food.dishName}</strong>
                                <strong>R${food.price}</strong>
                            </li>
                        ))}
                    </ul>
                </div>
                <button>Adicionar Item</button>
            </div>
        </>
    );
}