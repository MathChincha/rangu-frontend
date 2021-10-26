import React, { useState } from 'react'
import styles from './menu.module.scss'
import Header from '../../components/Header'
import Popup from '../../components/Popup/Popup'

import BigMac from '../../assets/BigMac.jpg'
import McChicken from '../../assets/McChicken.png'
import CocaCola from '../../assets/CocaCola.jpg'
import Heineken from '../../assets/Heineken.jpg'
import Pudim from '../../assets/Pudim.jpg'
import TortaLimao from '../../assets/TortaLimao.jpg'

export default function Menu({ history }) {
    const [isOpenNewCategory, setIsOpenNewCategory] = useState(false);
    const [isOpenNewItem, setIsOpenNewItem] = useState(false);
    const [isOpenEditItem, setIsOpenEditItem] = useState(false);
    const [isOpenDisableCategory, setIsOpenDisableCategory] = useState(false);
    const [isOpenDisableItem, setIsOpenDisableItem] = useState(false);
    const [dishName, setDishName] = useState('');
    const [description, setDescription] = useState('');
    const [eta, setEta] = useState('');
    const [price, setPrice] = useState('');
    const [dishImage, setDishImage] = useState('');


    function togglePopupNewCategory() {
        setIsOpenNewCategory(!isOpenNewCategory);
    }

    function togglePopupNewItem() {
        setIsOpenNewItem(!isOpenNewItem);
    }

    function togglePopupEditItem() {
        setIsOpenEditItem(!isOpenEditItem);
    }

    function togglePopupDisableCategory() {
        setIsOpenDisableCategory(!isOpenDisableCategory);
    }

    function togglePopupDisableItem() {
        setIsOpenDisableItem(!isOpenDisableItem);
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
        {
            id: 8,
            type: 'Drinks',
            foodImg: Heineken,
            dishName: 'Heineken',
            eta: '2 min',
            price: 'R$ 6.00',
            description: 'A cold Brew',
        },
        {
            id: 9,
            type: 'Dessert',
            foodImg: Pudim,
            dishName: 'Pudim',
            eta: '5 min',
            price: 'R$ 10.00',
            description: 'A delicious Pudim, made in the house',
        },
        {
            id: 10,
            type: 'Dessert',
            foodImg: TortaLimao,
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
    function tables() {
        history.push('/tables');
    }
    function reports() {
        history.push('/reports');
    }

    return (
        <>
            {
                isOpenNewCategory && <Popup
                    content={<>
                        <b>Insert the new category</b>
                        <input></input>
                        <div>
                            <button className={styles.insert} onClick={() => { togglePopupNewCategory() }}>Insert New Category</button>
                            <button className={styles.insert} onClick={() => { togglePopupNewCategory() }}>Cancel</button>
                        </div>
                    </>}
                    handleClose={togglePopupNewCategory}
                />
            }
            {
                isOpenNewItem && <Popup
                    content={<>
                        <b>Insert the new Item</b>
                        <input type="file" placeholder="Dish Image" name="dishImage" id="dishImage" value={dishImage} onChange={event => setDishImage(event.target.value)} />
                        <input placeholder="Dish Name" name="dishName" id="dishName" value={dishName} onChange={event => setDishName(event.target.value)} />
                        <input placeholder="Description" name="description" id="description" value={description} onChange={event => setDescription(event.target.value)} />
                        <input placeholder="Estimated Time of Arrival" name="eta" id="eta" value={eta} onChange={event => setEta(event.target.value)} />
                        <input placeholder="Price" name="price" id="price" value={price} onChange={event => setPrice(event.target.value)} />
                        <div>
                            <button className={styles.insert} onClick={() => { togglePopupNewItem() }}>Insert New Item</button>
                            <button className={styles.insert} onClick={() => { togglePopupNewItem() }}>Cancel</button>
                        </div>
                    </>}
                    handleClose={togglePopupNewItem}
                />
            }
            {
                isOpenEditItem && <Popup
                    content={<>
                        <b>Edit the Item</b>
                        <input type="file" placeholder="Dish Image" name="dishImage" id="dishImage" value={dishImage} onChange={event => setDishImage(event.target.value)} />
                        <input placeholder="Dish Name" name="dishName" id="dishName" value={dishName} onChange={event => setDishName(event.target.value)} />
                        <input placeholder="Description" name="description" id="description" value={description} onChange={event => setDescription(event.target.value)} />
                        <input placeholder="Estimated Time of Arrival" name="eta" id="eta" value={eta} onChange={event => setEta(event.target.value)} />
                        <input placeholder="Price" name="price" id="price" value={price} onChange={event => setPrice(event.target.value)} />
                        <div>
                            <button className={styles.insert} onClick={() => { togglePopupEditItem() }}>Edit the Item</button>
                            <button className={styles.insert} onClick={() => { togglePopupEditItem() }}>Cancel</button>
                        </div>
                    </>}
                    handleClose={togglePopupEditItem}
                />
            }
            {
                isOpenDisableCategory && <Popup
                    content={<>
                        <b>You wish to disable this category?</b>
                        <div>
                            <button className={styles.insert} onClick={() => { togglePopupDisableCategory() }}>Disable this Category</button>
                            <button className={styles.insert} onClick={() => { togglePopupDisableCategory() }}>Cancel</button>
                        </div>
                    </>}
                    handleClose={togglePopupDisableCategory}
                />
            }
            {
                isOpenDisableItem && <Popup
                    content={<>
                        <b>You wish to disable this item?</b>
                        <div>
                            <button className={styles.insert} onClick={() => { togglePopupDisableItem() }}>Disable this Item</button>
                            <button className={styles.insert} onClick={() => { togglePopupDisableItem() }}>Cancel</button>
                        </div>
                    </>}
                    handleClose={togglePopupDisableItem}
                />
            }
            <Header menu={() => menu()} logoff={() => logoff()} orders={() => orders()} profile={() => profile()} employess={() => employess()} tables={() => tables()} reports={() => reports()} />
            <div className={styles.menuContainer}>
                <button className={styles.newCategory} onClick={() => { togglePopupNewCategory() }}>Create New Category</button>
                <div>
                    {types.map((type) => (
                        <>
                            <h1 className={styles.title} key={type.id}>{type.type}</h1>
                            <ul className={styles.foodList} key={type.id}>
                                <button className={styles.ul} onClick={() => { togglePopupDisableCategory() }}>Disable Category</button>
                                <button className={styles.ul} onClick={() => { togglePopupNewItem() }}>Add Item</button>
                                {foods.filter(food => food.type === type.type).map((food) => (
                                    <li className={styles.foodList} key={food.id}>
                                        <img className={styles.dishImg} src={food.foodImg} alt="Food" />
                                        <strong className={styles.dishName}>{food.dishName}</strong>
                                        <strong className={styles.description}>Description: {food.description}</strong>
                                        <strong className={styles.price}>Price: <strong className={styles.color}>{food.price}</strong></strong>
                                        <strong className={styles.eta}>Time to Prepare: <strong className={styles.color}>{food.eta}</strong></strong>
                                        <button className={styles.li1} onClick={() => { togglePopupDisableItem() }}>Disable Item</button>
                                        <button className={styles.li2} onClick={() => { togglePopupEditItem() }}>Edit Item</button>
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