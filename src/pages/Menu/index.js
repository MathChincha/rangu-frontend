import React, { useState, useEffect } from 'react'
import styles from './menu.module.scss'
import Header from '../../components/Header'
import Popup from '../../components/Popup/Popup'
import { apiMenu } from '../../services/api'

import Loading from '../../assets/Loading.gif'

export default function Menu({ history }) {
    const [isOpenNewCategory, setIsOpenNewCategory] = useState(false);
    const [isOpenNewItem, setIsOpenNewItem] = useState(false);
    const [isOpenEditItem, setIsOpenEditItem] = useState(false);
    const [isOpenDisableCategory, setIsOpenDisableCategory] = useState(false);
    const [isOpenDisableItem, setIsOpenDisableItem] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState('');
    const [dishName, setDishName] = useState('');
    const [description, setDescription] = useState('');
    const [eta, setEta] = useState('');
    const [price, setPrice] = useState('');
    const [dishImage, setDishImage] = useState('');
    const [foodArray, setFoodArray] = useState([]);
    const [categoryArray, setCategoryArray] = useState([]);

    const [editId, setEditId] = useState('');
    const [editFoodCategory, setEditFoodCategory] = useState('');
    const [editDishImage, setEditDishImage] = useState('');
    const [editDishName, setEditDishName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editEta, setEditEta] = useState('');
    const [editPrice, setEditPrice] = useState('');

    useEffect(() => {
        async function loadCategory() {
            const user_token = sessionStorage.getItem('token');
            const id_token = sessionStorage.getItem('idR')
            console.log(user_token);
            try {
                const response = await apiMenu.get('/category', {
                    headers: { restaurantId: id_token }
                });
                console.log(response.data);
                setCategoryArray(response.data);
            } catch (err) {
                alert("Alerta");
            }
        }
        loadCategory();
        console.log('teste');
        console.log(categoryArray);
    }, []);

    useEffect(() => {
        async function loadData() {
            const user_token = sessionStorage.getItem('token');
            const id_token = sessionStorage.getItem('idR')
            console.log(user_token);
            try {
                const response = await apiMenu.get('/dishes', {
                    headers: { restaurantId: id_token }
                });
                console.log(response.data);
                setFoodArray(response.data);
            } catch (err) {
                alert("Alerta");
            }
        }
        loadData();
        console.log('teste');
        console.log(foodArray);
    }, []);


    function setEditFood(food) {
        setEditId(food.id);
        setEditFoodCategory(food.category);
        setEditDishImage(food.aimage);
        setEditDishName(food.name);
        setEditEta(food.estimatedTime);
        setEditPrice(food.price);
        setEditDescription(food.description);
    }

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
    /* antigo array de categoria
        const foods = [
            {
                id: 555,
                type: 'Hamburguers',
                foodImg: BigMac,
                dishName: 'Big Mac',
                eta: '5 min',
                price: 'R$ 35.99',
                description: "There is nothing like it. Two hamburgers, lettuce, cheese and special sauce, onion and pickles on a sesame bun. The flavor of McDonald's is triply delicious. With three 100% beef burgers, melted cheese, onion, pickles, ketchup and mustard. There is nothing like it. Two hamburgers, lettuce, cheese and special sauce, onion and pickles on a sesame bun.",
            },
            {
                id: 666,
                type: 'Hamburguers',
                foodImg: McChicken,
                dishName: 'McChicken',
                eta: '2 min',
                price: 'R$ 10.90',
                description: 'The flavor you love. Breaded and browned chicken with a smooth, creamy sauce, accompanied by crispy lettuce on a sesame bun.',
            },
            {
                id: 777,
                type: 'Drinks',
                foodImg: CocaCola,
                dishName: 'Coca-Cola',
                eta: '2 min',
                price: 'R$ 5.00',
                description: 'A cold Brew',
            },
            {
                id: 888,
                type: 'Drinks',
                foodImg: Heineken,
                dishName: 'Heineken',
                eta: '2 min',
                price: 'R$ 6.00',
                description: 'A cold Brew',
            },
            {
                id: 999,
                type: 'Dessert',
                foodImg: Pudim,
                dishName: 'Pudim',
                eta: '5 min',
                price: 'R$ 10.00',
                description: 'A delicious Pudim, made in the house',
            },
            {
                id: 1111,
                type: 'Dessert',
                foodImg: TortaLimao,
                dishName: 'Lemon Pie',
                eta: '5 min',
                price: 'R$ 10.00',
                description: 'A delicious Lemon Pie, made in the house',
            },
        ]
    */
    async function createCategory(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            console.log("teste");
            const user_token = sessionStorage.getItem('token');
            const id_token = sessionStorage.getItem('idR')
            console.log(id_token);
            await apiMenu.post('/category', { name: category },
                {
                    headers: { restaurantId: id_token }
                });
            console.log('deu certo');
            setIsLoading(false);
            togglePopupNewCategory();
            alert("Categoria criada com sucesso");
            window.location.reload(false);
        } catch (err) {
            setIsLoading(false);
            togglePopupNewCategory();
            alert("Erro");
        }
    }

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
                        <form onSubmit={createCategory}>
                            <input placeholder="Category" name="category" id="category" value={category} onChange={event => setCategory(event.target.value)} ></input>
                            <button type="submit" className={styles.insert}>Insert New Category</button>
                            <button className={styles.insert} onClick={() => { togglePopupNewCategory() }}>Cancel</button>
                        </form>
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
                        <input type="file" placeholder="Dish Image" name="editDishImage" id="editDishImage" value={editDishImage} onChange={event => setEditDishImage(event.target.value)} />
                        <input placeholder="Dish Name" name="editDishName" id="editDishName" value={editDishName} onChange={event => setEditDishName(event.target.value)} />
                        <input placeholder="Description" name="editDescription" id="editDescription" value={editDescription} onChange={event => setEditDescription(event.target.value)} />
                        <input placeholder="Estimated Time of Arrival" name="editEta" id="editEta" value={editEta} onChange={event => setEditEta(event.target.value)} />
                        <input placeholder="Price" name="editPrice" id="editPrice" value={editPrice} onChange={event => setEditPrice(event.target.value)} />
                        <input placeholder="Category" name="editFoodCategory" id="editFoodCategory" value={editFoodCategory} onChange={event => setEditFoodCategory(event.target.value)} />
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
            {
                isLoading && <Popup
                    content={<>
                        <img src={Loading} alt="Loading"></img>
                    </>}
                />
            }
            <Header menu={() => menu()} logoff={() => logoff()} orders={() => orders()} profile={() => profile()} employess={() => employess()} tables={() => tables()} reports={() => reports()} />
            <div className={styles.menuContainer}>
                <button className={styles.newCategory} onClick={() => { togglePopupNewCategory() }}>Create New Category</button>
                <div>
                    {categoryArray.map((category, index) => (
                        <>
                            <h1 className={styles.title}>{category.name}</h1>
                            <ul className={styles.foodList} key={index}>
                                <button className={styles.ul} onClick={() => { togglePopupDisableCategory() }}>Disable Category</button>
                                <button className={styles.ul} onClick={() => { togglePopupNewItem() }}>Add Item</button>
                                {foodArray.filter(foodArray => foodArray.category === category.name).map((food, index) => (
                                    <li className={styles.foodList} key={index}>
                                        <img className={styles.dishImg} src={food.image} alt="Food" />
                                        <strong className={styles.dishName}>{food.name}</strong>
                                        <strong className={styles.description}>Description: {food.description}</strong>
                                        <strong className={styles.price}>Price: <strong className={styles.color}>{food.price}</strong></strong>
                                        <strong className={styles.eta}>Time to Prepare: <strong className={styles.color}>{food.estimatedTime}</strong></strong>
                                        <button className={styles.li1} onClick={() => { togglePopupDisableItem() }}>Disable Item</button>
                                        <button className={styles.li2} onClick={() => { setEditFood(food); togglePopupEditItem() }}>Edit Item</button>
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