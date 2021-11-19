import React, { useState, useEffect, useMemo } from 'react'
import styles from './menu.module.scss'
import Header from '../../components/Header'
import Popup from '../../components/Popup/Popup'
import CategoryPopup from '../../components/CategoryPopUp/Popup'
import { apiMenu } from '../../services/api'

import Loading from '../../assets/Loading.gif'
import camera from '../../assets/camera.svg'

export default function Menu({ history }) {

    //Variavéis dos PopUPS
    const [isOpenNewCategory, setIsOpenNewCategory] = useState(false);
    const [isOpenNewItem, setIsOpenNewItem] = useState(false);
    const [isOpenEditItem, setIsOpenEditItem] = useState(false);
    const [isOpenDisableCategory, setIsOpenDisableCategory] = useState(false);
    const [isOpenDisableItem, setIsOpenDisableItem] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //Variaveis para criar as comidas
    const [category, setCategory] = useState('');
    const [dishImage, setDishImage] = useState(null);
    const [dishName, setDishName] = useState('');
    const [description, setDescription] = useState('');
    const [eta, setEta] = useState('');
    const [price, setPrice] = useState('');

    //Variaveis dos arrays trazidos pelas API's
    const [foodArray, setFoodArray] = useState([]);
    const [categoryArray, setCategoryArray] = useState([]);

    //Variaveis para editar as comidas
    const [editId, setEditId] = useState('');
    const [editFoodCategory, setEditFoodCategory] = useState('');
    const [editDishImage, setEditDishImage] = useState(null);
    const [editDishName, setEditDishName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editEta, setEditEta] = useState('');
    const [editPrice, setEditPrice] = useState('');

    const preview = useMemo(() => {
        return dishImage ? URL.createObjectURL(dishImage) : null;
    }, [dishImage])

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
                console.log(foodArray);
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
        setEditDishImage(food.image);
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

    async function createFood(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            console.log("teste");
            const user_token = sessionStorage.getItem('token');
            const id_token = sessionStorage.getItem('idR');
            const base64 = "https://www.lovelesscafe.com/wp-content/uploads/2019/11/lemon-icebox-pie-recipe.jpg"
            console.log(id_token);
            await apiMenu.post('/dishes',
                {
                    category: category,
                    description: description,
                    estimatedTime: eta,
                    image: dishImage,
                    name: dishName,
                    price: price
                },
                {
                    headers: { restaurantId: id_token }
                });
            console.log('deu certo');
            setIsLoading(false);
            togglePopupNewItem();
            alert("Comida criada com sucesso");
            window.location.reload(false);
        } catch (err) {
            setIsLoading(false);
            togglePopupNewItem();
            alert("Erro");
        }
    }

    async function editFood(event) { /*
        event.preventDefault();
        setIsLoading(true);
        try {
            console.log("teste");
            const user_token = sessionStorage.getItem('token');
            const id_token = sessionStorage.getItem('idR');
            const base64 = "https://www.lovelesscafe.com/wp-content/uploads/2019/11/lemon-icebox-pie-recipe.jpg"
            console.log(id_token);
            await apiMenu.post('/dishes',
                {
                    category: category,
                    description: description,
                    estimatedTime: eta,
                    image: dishImage,
                    name: dishName,
                    price: price
                },
                {
                    headers: { restaurantId: id_token }
                });
            console.log('deu certo');
            setIsLoading(false);
            togglePopupNewItem();
            alert("Comida criada com sucesso");
            window.location.reload(false);
        } catch (err) {
            setIsLoading(false);
            togglePopupNewItem();
            alert("Erro");
        } */
        setIsOpenEditItem(!isOpenEditItem);
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

    function encodeImageFileAsURL(element) {
        var file = element.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            console.log('RESULT', reader.result)
        }
        reader.readAsDataURL(file);

        setDishImage(reader.result);
    }

    return (
        <>
            {
                isOpenNewCategory && <CategoryPopup
                    content={<>
                        <b>Insira a nova categoria </b>
                        <form onSubmit={createCategory}>
                            <input placeholder="Category" name="category" id="category" value={category} onChange={event => setCategory(event.target.value)} ></input>
                            <div>
                                <button type="submit" className={styles.insert}>Inserir Nova Categoria</button>
                                <button className={styles.insert} onClick={() => { togglePopupNewCategory() }}>Cancelar</button>
                            </div>
                        </form>
                    </>}
                    handleClose={togglePopupNewCategory}
                />
            }
            {
                isOpenNewItem && <Popup
                    content={<>
                        <b>Insira o novo item</b>
                        <form onSubmit={createFood}>
                            <label
                                id="dishImage"
                                style={{ backgroundImage: `url(${preview})` }}
                                className={styles.dishImage}
                            >
                                <input style={{ display: 'none' }} type="file" accept=".jpeg, .png, .jpg" onChange={event => setDishImage(event.target.files[0])} />
                                <img src={camera} alt="Selecione uma Image" />
                            </label>
                            <input placeholder="Dish Name" name="dishName" id="dishName" value={dishName} onChange={event => setDishName(event.target.value)} />
                            <input placeholder="Description" name="description" id="description" value={description} onChange={event => setDescription(event.target.value)} />
                            <input placeholder="Estimated Time of Arrival" name="eta" id="eta" value={eta} onChange={event => setEta(event.target.value)} />
                            <input placeholder="Price" name="price" id="price" value={price} onChange={event => setPrice(event.target.value)} />
                            <div>
                                <button type="submit" className={styles.insert}>Inserir Novo Item</button>
                                <button className={styles.insert} onClick={() => { togglePopupNewItem() }}>Cancelar</button>
                            </div>
                        </form>
                    </>}
                    handleClose={togglePopupNewItem}
                />
            }
            {
                isOpenEditItem && <Popup
                    content={<>
                        <b>Edite o Item</b>
                        <form onSubmit={editFood}>
                            <label
                                id="DishImage"
                                className={styles.DishImage}
                                style={{ backgroundImage: `url(${preview})` }}
                            >
                                <input style={{ display: 'none' }} type="file" accept=".jpeg, .png, .jpg" onChange={event => setEditDishImage(event.target.files[0])} />
                                <img src={editDishImage} alt="Selecione uma Image" />
                            </label>
                            <input placeholder="Dish Name" name="editDishName" id="editDishName" value={editDishName} onChange={event => setEditDishName(event.target.value)} />
                            <input placeholder="Description" name="editDescription" id="editDescription" value={editDescription} onChange={event => setEditDescription(event.target.value)} />
                            <input placeholder="Estimated Time of Arrival" name="editEta" id="editEta" value={editEta} onChange={event => setEditEta(event.target.value)} />
                            <input placeholder="Price" name="editPrice" id="editPrice" value={editPrice} onChange={event => setEditPrice(event.target.value)} />
                            <input placeholder="Category" name="editFoodCategory" id="editFoodCategory" value={editFoodCategory} onChange={event => setEditFoodCategory(event.target.value)} />
                            <div>
                                <button type="submit" className={styles.insert}>Editar o Item</button>
                                <button className={styles.insert} onClick={() => { togglePopupEditItem() }}>Cancelar</button>
                            </div>
                        </form>
                    </>}
                    handleClose={togglePopupEditItem}
                />
            }
            {
                isOpenDisableCategory && <CategoryPopup
                    content={<>
                        <b>Você deseja desabilitar essa categoria?</b>
                        <div>
                            <button className={styles.insert} onClick={() => { togglePopupDisableCategory() }}>Desabilitar a Categoria</button>
                            <button className={styles.insert} onClick={() => { togglePopupDisableCategory() }}>Cancelar</button>
                        </div>
                    </>}
                    handleClose={togglePopupDisableCategory}
                />
            }
            {
                isOpenDisableItem && <Popup
                    content={<>
                        <b>Você deseja desabilitar esse item?</b>
                        <div>
                            <button className={styles.insert} onClick={() => { togglePopupDisableItem() }}>Desabilitar o Item</button>
                            <button className={styles.insert} onClick={() => { togglePopupDisableItem() }}>Cancelar</button>
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
                <button className={styles.newCategory} onClick={() => { togglePopupNewCategory() }}>Criar Nova Categoria</button>
                <div>
                    {categoryArray.map((category, index) => (
                        <>
                            <h1 className={styles.title}>{category.name}</h1>
                            <ul className={styles.foodList} key={index}>
                                <button className={styles.ul} onClick={() => { togglePopupDisableCategory() }}>Desabilitar Categoria</button>
                                <button className={styles.ul} onClick={() => { setCategory(category.name); togglePopupNewItem() }}>Adicionar Item</button>
                                {foodArray.filter(foodArray => foodArray.category === category.name).map((food, index) => (
                                    <li className={styles.foodList} key={index}>
                                        <div>
                                            <img className={styles.dishImg} src={food.image} alt="Food" />
                                        </div>
                                        <strong className={styles.dishName}>{food.name}</strong>
                                        <strong className={styles.description}>Descrição: {food.description}</strong>
                                        <strong className={styles.price}>Preço: <strong className={styles.color}>{food.price}</strong></strong>
                                        <strong className={styles.eta}>Tempo de Preparo: <strong className={styles.color}>{food.estimatedTime}</strong></strong>
                                        <button className={styles.li1} onClick={() => { togglePopupDisableItem() }}>Desabilitar Item</button>
                                        <button className={styles.li2} onClick={() => { setEditFood(food); togglePopupEditItem() }}>Editar Item</button>
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