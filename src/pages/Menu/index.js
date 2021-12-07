import { motion } from "framer-motion"
import React, { useEffect, useMemo, useState } from 'react'
import { RNS3 } from 'react-native-aws3'
import camera from '../../assets/camera.svg'
import CategoryPopup from '../../components/CategoryPopUp/Popup'
import Header from '../../components/Header'
import Item from '../../components/Item/item'
import Loading from '../../components/Loading/Popup'
import { apiMenu } from '../../services/api'
import styles from './menu.module.scss'


export default function Menu({ history }) {

    const id_rest = sessionStorage.getItem('idR')

    const optionsProfileS3 = {
        keyPrefix: "menuFoodImg/",
        bucket: "rangu-ohio",
        region: "us-east-2",
        accessKey: "AKIAXYPJWAUP26AIKWE6",
        secretKey: "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",
        successActionStatus: 201
    };

    const [progressUpload, setProgressUpload] = useState(10);

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
                response.data.sort((a, b) => {
                    let fa = a.name.toLowerCase(),
                        fb = b.name.toLowerCase();

                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                });
                console.log(response.data);
                setCategoryArray(response.data);
                setTimeout(function () {
                    setIsLoading(false);
                }, 2000);
            } catch (err) {
                alert("Alerta");
                setTimeout(function () {
                    setIsLoading(false);
                }, 2000);
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
                response.data.sort((a, b) => {
                    let fa = a.name.toLowerCase(),
                        fb = b.name.toLowerCase();

                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                });
                setFoodArray(response.data);
                console.log(foodArray);
                setTimeout(function () {
                    setIsLoading(false);
                }, 2000);
            } catch (err) {
                alert("Alerta");
                setTimeout(function () {
                    setIsLoading(false);
                }, 2000);
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

    async function uploadS3(element) {

        console.log("AWS")

        //var newFile = new File([element], `${id_rest}-0.jpg`, { type: element.type });

        console.log(element);
        console.log('Enviando imagem para S3');
        try {
            await RNS3.put(element, optionsProfileS3).progress((progress) => {
                console.log('Uploading: ', progress.percent)
                if (progress.percent) {
                    console.log(progress.percent);
                    setProgressUpload(progress.percent);
                }
            })
                .then(response => {
                    if (response.status !== 201) {
                        console.log("Failed to upload image to S3");
                    }
                    console.log(response.body.postResponse.location);
                    setDishImage(response.body.postResponse.location);
                });
        } catch (error) {
            console.log(error);
        }

    }

    async function uploadS3Edit(element) {

        let numberImg
        if (editDishImage) {
            let currentName = editDishImage;
            numberImg = currentName.replace('https://rangu-ohio.s3.amazonaws.com/menuFoodImg%2F' + id_rest, "").replace(".jpg", "").replace("-", "");
            numberImg++;
        }
        else {
            numberImg = 0;
        }

        var newFile = new File([element], `${id_rest}-${numberImg}.jpg`, { type: element.type });

        console.log("AWS")
        console.log('Enviando imagem para S3');
        try {
            await RNS3.put(element, optionsProfileS3).progress((progress) => {
                console.log('Uploading: ', progress.percent)
                if (progress.percent) {
                    console.log(progress.percent);
                    setProgressUpload(progress.percent);
                }
            })
                .then(response => {
                    if (response.status !== 201) {
                        console.log("Failed to upload image to S3");
                    }
                    console.log(response.body.postResponse.location);
                    setEditDishImage(response.body.postResponse.location);
                });
        } catch (error) {
            console.log(error);
        }

    }
    async function encodeImageFileAsURL(element) {
        uploadS3(element);
        setDishImage(element);
        console.log("BASE64");
        console.log(element);
        var filesSelected = element;

        var fileToLoad = filesSelected;

        var fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            setDishImage(srcData);
            console.log("base64")
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
        isLoading ? <Loading /> :
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 1 }}>
                {
                    isOpenNewCategory &&
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 1 }}>
                        <CategoryPopup
                            content={
                                <>
                                    <b>Insira a nova categoria </b>
                                    <form onSubmit={createCategory}>
                                        <input placeholder="Categoria" name="category" id="category" value={category} onChange={event => setCategory(event.target.value)} ></input>
                                        <div>
                                            <button type="submit" className={styles.insert}>Inserir Nova Categoria</button>
                                            <button className={styles.insert} onClick={() => { togglePopupNewCategory() }}>Cancelar</button>
                                        </div>
                                    </form>
                                </>}
                            handleClose={togglePopupNewCategory}
                        />
                    </motion.div>
                }
                {
                    isOpenNewItem &&
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 1 }}>
                        <Item
                            content={<>
                                <b>Insira o novo item</b>
                                <form onSubmit={createFood}>
                                    <label
                                        id="dishImage"
                                        style={{ backgroundImage: `url(${preview})` }}
                                        className={styles.dishImage}
                                    >
                                        <input style={{ display: 'none' }} type="file" accept=".jpeg, .png, .jpg" onChange={event => uploadS3(event.target.files[0])} />
                                        <img src={camera} alt="Selecione uma Image" />
                                    </label>
                                    <progress id="dishImage" max="100" value={progressUpload} />
                                    <input placeholder="Nome do Prato" name="dishName" id="dishName" value={dishName} onChange={event => setDishName(event.target.value)} />
                                    <input placeholder="Descrição" name="description" id="description" value={description} onChange={event => setDescription(event.target.value)} />
                                    <input placeholder="Tempo Estimado" name="eta" id="eta" value={eta} onChange={event => setEta(event.target.value)} />
                                    <input placeholder="Preço" name="price" id="price" value={price} onChange={event => setPrice(event.target.value)} />
                                    <div>
                                        <button type="submit" className={styles.insert}>Inserir Novo Item</button>
                                        <button className={styles.insert} onClick={() => { togglePopupNewItem() }}>Cancelar</button>
                                    </div>
                                </form>
                            </>}
                            handleClose={togglePopupNewItem}
                        />
                    </motion.div>

                }
                {
                    isOpenEditItem &&
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 1 }}>
                        <Item
                            content={<>
                                <b>Edite o Item</b>
                                <form onSubmit={editFood}>
                                    <label
                                        id="editDishImage"
                                        style={{ backgroundImage: `url(${editPreview})` }}
                                        className={styles.editDishImage}
                                    >
                                        <input style={{ display: 'none' }} type="file" accept=".jpeg, .png, .jpg" onChange={event => uploadS3Edit(event.target.files[0])} />
                                        <img src={camera} alt="Selecione uma Image" />
                                    </label>
                                    <input placeholder="Nome do Prato" name="editDishName" id="editDishName" value={editDishName} onChange={event => setEditDishName(event.target.value)} />
                                    <input placeholder="Descrição" name="editDescription" id="editDescription" value={editDescription} onChange={event => setEditDescription(event.target.value)} />
                                    <input placeholder="Tempo Estimado" name="editEta" id="editEta" value={editEta} onChange={event => setEditEta(event.target.value)} />
                                    <input placeholder="Preço" name="editPrice" id="editPrice" value={editPrice} onChange={event => setEditPrice(event.target.value)} />
                                    <input placeholder="Categoria" name="editFoodCategory" id="editFoodCategory" value={editFoodCategory} onChange={event => setEditFoodCategory(event.target.value)} />
                                    <div>
                                        <button type="submit" className={styles.insert}>Editar o Item</button>
                                        <button className={styles.insert} onClick={() => { togglePopupEditItem() }}>Cancelar</button>
                                    </div>
                                </form>
                            </>}
                            handleClose={togglePopupEditItem}
                        />
                    </motion.div>

                }
                {
                    isOpenDisableCategory &&
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 1 }}>
                        <CategoryPopup
                            content={<>
                                <b>Você deseja desabilitar a categoria <strong>{deleteCName}</strong>?</b>
                                <div>
                                    <button className={styles.insert} onClick={() => { deleteCategory() }}>Desabilitar a Categoria</button>
                                    <button className={styles.insert} onClick={() => { togglePopupDisableCategory() }}>Cancelar</button>
                                </div>
                            </>}
                            handleClose={togglePopupDisableCategory}
                        />
                    </motion.div>

                }
                {
                    isOpenDisableItem &&
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 1 }}>
                        <CategoryPopup
                            content={<>
                                <b>Você deseja desabilitar o item <strong>{deleteFName}</strong> da categoria <strong>{deleteCName}</strong>?</b>
                                <div>
                                    <button className={styles.insert} onClick={() => { deleteDish() }}>Desabilitar o Item</button>
                                    <button className={styles.insert} onClick={() => { togglePopupDisableItem() }}>Cancelar</button>
                                </div>
                            </>}
                            handleClose={togglePopupDisableItem}
                        />
                    </motion.div>

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
                                    <div className={styles.overflowX}>
                                        {foodArray.filter(foodArray => foodArray.category === category.name).map((food, index) => (
                                            <li className={styles.foodList} key={index}>
                                                <img className={styles.dishImg} src={food.image} alt="Food" />
                                                <strong className={styles.dishName}>{food.name}</strong>
                                                <div className={styles.containerDescriçoes}>
                                                    <strong className={styles.description}>Descrição: {food.description}</strong>
                                                    <div className={styles.rowPriceEta}>
                                                        <strong className={styles.price}>Preço: <strong className={styles.color}>{food.price}</strong></strong>
                                                        <strong className={styles.eta}>Tempo de Preparo: <strong className={styles.color}>{food.estimatedTime}</strong></strong>
                                                    </div>
                                                </div>
                                                <button className={styles.li1} onClick={() => { setDeleteFood(food, category.name); togglePopupDisableItem() }}>Desabilitar Item</button>
                                                <button className={styles.li2} onClick={() => { setEditFood(food); togglePopupEditItem() }}>Editar Item</button>
                                            </li>
                                        ))}
                                    </div>
                                </ul>
                            </>
                        ))}
                    </div>

                </div>
            </motion.div>
    );
}