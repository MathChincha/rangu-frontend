import React, { useState, useEffect, useMemo } from 'react'
import styles from './menu.module.scss'
import Header from '../../components/Header'
import Item from '../../components/Item/item'
import Loading from '../../components/Loading/Popup'
import CategoryPopup from '../../components/CategoryPopUp/Popup'
import { apiMenu } from '../../services/api'

import camera from '../../assets/camera.svg'

export default function Menu({ history }) {

    //Variavéis dos PopUPS
    const [isOpenNewCategory, setIsOpenNewCategory] = useState(false);
    const [isOpenNewItem, setIsOpenNewItem] = useState(false);
    const [isOpenEditItem, setIsOpenEditItem] = useState(false);
    const [isOpenDisableCategory, setIsOpenDisableCategory] = useState(false);
    const [isOpenDisableItem, setIsOpenDisableItem] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //Variaveis para Deletar/Desabilitar
    const [deleteId, setDeleteId] = useState('');
    const [deleteFName, setDeleteFName] = useState('');
    const [deleteCName, setDeleteCName] = useState('');

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
        return dishImage;
    }, [dishImage])

    const editPreview = useMemo(() => {
        return editDishImage;
    }, [editDishImage])

    //UseEffect para carregar todas as categorias cadastradas
    useEffect(() => {
        async function loadCategory() {
            setIsLoading(true);
            const user_token = sessionStorage.getItem('token');
            const id_token = sessionStorage.getItem('idR')
            console.log(user_token);
            try {
                const response = await apiMenu.get('/category', {
                    headers: { restaurantId: id_token }
                });
                console.log(response.data);
                setCategoryArray(response.data);
                setIsLoading(false);
            } catch (err) {
                alert("Alerta");
                setIsLoading(false);
            }
        }
        loadCategory();
        console.log('teste');
        console.log(categoryArray);
    }, []);
    //UseEffect para carregar todas as comidas cadastradas
    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
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
                setIsLoading(false);
            } catch (err) {
                alert("Alerta");
                setIsLoading(false);
            }
        }
        loadData();
        console.log('teste');
        console.log(foodArray);
    }, []);

    //Função para setar qual comida vai ser editada
    function setEditFood(food) {
        setEditId(food.id);
        setEditFoodCategory(food.category);
        setEditDishImage(food.image);
        setEditDishName(food.name);
        setEditEta(food.estimatedTime);
        setEditPrice(food.price);
        setEditDescription(food.description);
    }
    //Função para setar qual comida vai ser deletada
    function setDeleteFood(food, category) {
        setDeleteId(food.id);
        setDeleteFName(food.name);
        setDeleteCName(category);
    }
    //Função para setar qual categoria vai ser deletada
    function setDeleteCategory(category) {
        setDeleteId(category.id);
        setDeleteCName(category.name);
    }
    //Funções para abrir e fechar os PopUp
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
    //Função para deletar uma categoria
    async function deleteCategory() {
        setIsLoading(true);
        try {
            console.log("teste");
            const user_token = sessionStorage.getItem('token');
            const id_token = sessionStorage.getItem('idR')
            console.log(id_token);
            console.log(deleteCName);
            await apiMenu.delete('/category',
                {
                    params: {
                        category: deleteCName
                    },
                    headers: {
                        restaurantId: id_token
                    }
                });
            console.log('deu certo');
            setIsLoading(false);
            togglePopupDisableCategory();
            alert("Categoria deletada com sucesso");
            window.location.reload(false);
        } catch (err) {
            setIsLoading(false);
            togglePopupDisableCategory();
            alert(err);
        }
    }
    //Função para criar uma categoria
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
    //Função para criar um prato
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
                    image: base64,
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
    //Função para Editar um prato
    async function editFood(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            console.log("teste para editar a comida");
            const user_token = sessionStorage.getItem('token');
            const id_token = sessionStorage.getItem('idR');
            const base64 = "https://www.lovelesscafe.com/wp-content/uploads/2019/11/lemon-icebox-pie-recipe.jpg"
            console.log(id_token);
            console.log(editId);
            console.log({
                category: editFoodCategory,
                description: editDescription,
                estimatedTime: editEta,
                image: editDishImage,
                name: editDishName,
                price: editPrice
            });
            await apiMenu.put(`/dishes/${editId}`,
                {
                    category: editFoodCategory,
                    description: editDescription,
                    estimatedTime: editEta,
                    image: editDishImage,
                    name: editDishName,
                    price: editPrice
                },
                {
                    headers: { restaurantId: id_token }
                });
            console.log('deu certo');

            setIsLoading(false);
            togglePopupEditItem();
            alert("Comida editada com sucesso");
            window.location.reload(false);
        } catch (err) {
            setIsLoading(false);
            togglePopupEditItem();
            alert("Erro");
        }
    }
    //Função para deletar um Prato
    async function deleteDish() {
        setIsLoading(true);

        try {
            console.log("teste de Deletar Prato");
            console.log(deleteId);
            const user_token = sessionStorage.getItem('token');
            const id_token = sessionStorage.getItem('idR');
            console.log(id_token);
            await apiMenu.delete(`/dishes/${deleteId}`,
                {
                    headers: { restaurantId: id_token }
                });
            console.log('deu certo');
            setIsLoading(false);
            togglePopupDisableItem();
            alert("Comida removida com sucesso");
            window.location.reload(false);
        } catch (err) {
            setIsLoading(false);
            togglePopupDisableItem();
            alert(err);
        }
    }
    //Funções para trocar de tela
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
        setDishImage(element);
        console.log("BASE64");
        console.log(element);
        var filesSelected = element;

        var fileToLoad = filesSelected;

        var fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            setDishImage(srcData);
            console.log(srcData);
        }
        fileReader.readAsDataURL(fileToLoad);
    }
    function encodeEditImageFileAsURL(element) {
        setEditDishImage(element);
        console.log("BASE64");
        console.log(element);
        var filesSelected = element;

        var fileToLoad = filesSelected;

        var fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            setEditDishImage(srcData);
            console.log(srcData);
        }
        fileReader.readAsDataURL(fileToLoad);
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
                isOpenNewItem && <Item
                    content={<>
                        <b>Insira o novo item</b>
                        <form onSubmit={createFood}>
                            <label
                                id="dishImage"
                                style={{ backgroundImage: `url(${preview})` }}
                                className={styles.dishImage}
                            >
                                <input style={{ display: 'none' }} type="file" accept=".jpeg, .png, .jpg" onChange={event => encodeImageFileAsURL(event.target.files[0])} />
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
                isOpenEditItem && <Item
                    content={<>
                        <b>Edite o Item</b>
                        <form onSubmit={editFood}>
                            <label
                                id="editDishImage"
                                style={{ backgroundImage: `url(${editPreview})` }}
                                className={styles.editDishImage}
                            >
                                <input style={{ display: 'none' }} type="file" accept=".jpeg, .png, .jpg" onChange={event => encodeEditImageFileAsURL(event.target.files[0])} />
                                <img src={camera} alt="Selecione uma Image" />
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
                        <b>Você deseja desabilitar a categoria <strong>{deleteCName}</strong>?</b>
                        <div>
                            <button className={styles.insert} onClick={() => { deleteCategory() }}>Desabilitar a Categoria</button>
                            <button className={styles.insert} onClick={() => { togglePopupDisableCategory() }}>Cancelar</button>
                        </div>
                    </>}
                    handleClose={togglePopupDisableCategory}
                />
            }
            {
                isOpenDisableItem && <CategoryPopup
                    content={<>
                        <b>Você deseja desabilitar o item <strong>{deleteFName}</strong> da categoria <strong>{deleteCName}</strong>?</b>
                        <div>
                            <button className={styles.insert} onClick={() => { deleteDish() }}>Desabilitar o Item</button>
                            <button className={styles.insert} onClick={() => { togglePopupDisableItem() }}>Cancelar</button>
                        </div>
                    </>}
                    handleClose={togglePopupDisableItem}
                />
            }
            {
                isLoading && <Loading />
            }
            <Header menu={() => menu()} logoff={() => logoff()} orders={() => orders()} profile={() => profile()} employess={() => employess()} tables={() => tables()} reports={() => reports()} />
            <div className={styles.menuContainer}>
                <button className={styles.newCategory} onClick={() => { togglePopupNewCategory() }}>Criar Nova Categoria</button>
                <div>
                    {categoryArray.map((category, index) => (
                        <>
                            <h1 className={styles.title}>{category.name}</h1>
                            <ul className={styles.foodList} key={index}>
                                <button className={styles.ul} onClick={() => { setDeleteCategory(category); togglePopupDisableCategory() }}>Desabilitar Categoria</button>
                                <button className={styles.ul} onClick={() => { setCategory(category.name); togglePopupNewItem() }}>Adicionar Item</button>
                                {foodArray.filter(foodArray => foodArray.category === category.name).map((food, index) => (
                                    <li className={styles.foodList} key={index}>
                                        <img className={styles.dishImg} src={food.image} alt="Food" />
                                        <strong className={styles.dishName}>{food.name}</strong>
                                        <strong className={styles.description}>Descrição: {food.description}</strong>
                                        <strong className={styles.price}>Preço: <strong className={styles.color}>{food.price}</strong></strong>
                                        <strong className={styles.eta}>Tempo de Preparo: <strong className={styles.color}>{food.estimatedTime}</strong></strong>
                                        <button className={styles.li1} onClick={() => { setDeleteFood(food, category.name); togglePopupDisableItem() }}>Desabilitar Item</button>
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