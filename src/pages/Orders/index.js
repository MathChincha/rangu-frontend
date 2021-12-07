import React, { useState, useEffect } from 'react'
import styles from './orders.module.scss'
import Header from '../../components/Header'
import Popup from '../../components/Popup/Popup'
import Loading from '../../components/Loading/Popup'

import { apiOrders, apiOrchestrate } from '../../services/api'

export default function Orders({ history }) {
    const [isOpenEditStatus, setIsOpenEditStatus] = useState(false);
    const [isOpenRemovePerson, setIsOpenRemovePerson] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [editId, setEditId] = useState("");
    const [editStatus, setEditStatus] = useState('');

    const [orderArray, setOrderArray] = useState([]);

    const statusArray = [
        {
            id: 1,
            type: "SUBMITTED"
        },
        {
            id: 2,
            type: "TAKING"
        },
        {
            id: 3,
            type: "PREPARING"
        },
    ];

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            const user_token = sessionStorage.getItem('token');
            const id_token = sessionStorage.getItem('idR')
            console.log(user_token);
            console.log("pegando os pedidos")
            try {
                const response = await apiOrchestrate.get('/orders', {
                    headers: { restaurantId: id_token }
                });
                console.log(response.data);
                response.data.sort();
                setOrderArray(response.data);
                response.data.map((order) => (
                    console.log('order.id'),
                    console.log(order.id),
                    order.dishes.map((dish) => (
                        console.log('dish.id'),
                        console.log(dish.id)
                    ))
                ))
                console.log(orderArray)
                setIsLoading(false);
                console.log("deu certo")
            } catch (err) {
                alert(err);
                setIsLoading(false);
            }
        }
        loadData();
        console.log('teste');
    }, []);

    //Função para editar o Status do Pedido
    async function editarStatus(event) {
        setIsLoading(true);
        try {
            console.log("teste");
            const id_token = sessionStorage.getItem('idR');
            console.log(id_token);
            console.log(editId);
            await apiOrders.patch('', null,
                {
                    params: {
                        status: editStatus,
                    },
                    headers: {
                        restaurantId: id_token,
                        orderId: editId
                    }
                }
            );
            console.log('deu certo');
            setIsLoading(false);
            togglePopupEditStatus();
            alert("Status editado com sucesso");
            window.location.reload(false);
        } catch (err) {
            setIsLoading(false);
            togglePopupEditStatus();
            alert("Erro");
        }
    }

    //Função para setar qual pedido vai ser editado
    function setEditOrder(order) {
        setEditId(order.id);
    }

    function togglePopupEditStatus() {
        setIsOpenEditStatus(!isOpenEditStatus);
    }

    function togglePopupRemovePerson() {
        setIsOpenRemovePerson(!isOpenRemovePerson);
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
                isLoading && <Loading />
            }
            {
                isOpenRemovePerson && <Popup
                    content={<>
                        <b>You want to remove this person?</b>
                        <strong>Person to remove:</strong>
                        <div>
                            <button className={styles.insert} onClick={() => { togglePopupRemovePerson() }}>Remove Person</button>
                            <button className={styles.insert} onClick={() => { togglePopupRemovePerson() }}>Cancel</button>
                        </div>
                    </>}
                    handleClose={togglePopupRemovePerson}
                />
            }
            {
                isOpenEditStatus && <Popup
                    content={<>
                        <b>Editar o Status do Pedido:<strong></strong></b>
                        <input onChange={event => setEditStatus(event.target.value)} list="status"></input>
                        <datalist id="status">
                            <option value="SUBMITTED">SUBMITTED</option>
                            <option value="TAKING">TAKING</option>
                            <option value="PREPARING">PREPARING</option>
                            <option value="Enviado">Enviado</option>
                            <option value="Em Preparo">Em Preparo</option>
                            <option value="Pronto">Pronto</option>
                            <option value="Cancelado">Cancelado</option>
                            <option value="Finalizado">Finalizado</option>
                        </datalist >
                        <div>
                            <button className={styles.insert} onClick={() => { editarStatus() }}>Edit Status</button>
                            <button className={styles.insert} onClick={() => { togglePopupEditStatus() }}>Cancel</button>
                        </div>
                    </>}
                    handleClose={togglePopupEditStatus}
                />
            }

            <Header menu={() => menu()} logoff={() => logoff()} orders={() => orders()} profile={() => profile()} employess={() => employess()} tables={() => tables()} reports={() => reports()} />
            <div className={styles.menuContainer}>
                <div>
                    {statusArray.map((status) => <>
                        <h1 className={styles.title}>{status.type}</h1>
                        <ul className={styles.foodList}>
                            <div className={styles.overflowX}>
                                {orderArray.filter(order => order.status === status.type).map((order) => (
                                    <>
                                        <li className={styles.foodList} key={order.id}>
                                            <strong className={styles.dishName}>{order.dishes.map((dish, index) => { if (index == 0) { return dish.name } })}</strong>
                                            <strong className={styles.price}>Preço: <strong className={styles.color}>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(order.totalPrice)}</strong></strong>
                                            <strong className={styles.eta}>Hora do Pedido: <strong className={styles.color}>{new Date(order.orderHour).toLocaleDateString()} - {new Date(order.orderHour).toLocaleTimeString()}</strong></strong>
                                            <strong className={styles.comments}>Comentários: <strong className={styles.color}>{order.comment}</strong></strong>
                                            <strong className={styles.clientName}>Nome do Cliente: <strong className={styles.color}>{order.clientName}</strong></strong>
                                            <strong className={styles.status}>Status: <strong className={styles.color}>{order.status}</strong></strong>
                                            <button className={styles.ul} onClick={() => { setEditOrder(order); togglePopupEditStatus() }}>Edit Status</button>
                                        </li>
                                    </>
                                ))}
                            </div>
                        </ul>
                    </>)}
                </div>
            </div>
        </>
    );
}