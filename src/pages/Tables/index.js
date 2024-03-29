import { motion } from "framer-motion"
import React, { useState, useEffect } from 'react'
import styles from './tables.module.scss'
import Header from '../../components/Header'
import QRCode from 'react-qr-code'
import Popup from '../../components/Popup/Popup'
import Loading from '../../components/Loading/Popup'
import { apiMenu } from '../../services/api'

export default function Reports({ history }) {
    const [isOpenNewTables, setIsOpenNewTables] = useState(false);
    const [isOpenNewTable, setIsOpenNewTable] = useState(false);
    const [isOpenDeleteTable, setIsOpenDeleteTable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [number, setNumber] = useState("");
    const [numbers, setNumbers] = useState("");

    const [deleteId, setDeleteId] = useState("");
    const [deleteNumber, setDeleteNumber] = useState("");

    //Variaveis dos arrays trazidos pelas API's
    const [mesasArray, setMesasArray] = useState([]);

    //Função para setar qual mesa vai ser deletada
    function setDeleteTable(table) {
        setDeleteId(table.id);
        setDeleteNumber(table.number);
    }

    //UseEffect para carregar todas as mesas cadastradas
    useEffect(() => {
        async function loadMesas() {
            setIsLoading(true);
            const user_token = sessionStorage.getItem('token');
            const id_token = sessionStorage.getItem('idR')
            console.log(user_token);
            try {
                const response = await apiMenu.get('/restaurantTables', {
                    headers: { restaurantId: id_token }
                });
                console.log(response.data);
                response.data.sort((a, b) => {
                    return a.number - b.number;
                });
                setMesasArray(response.data);
                setIsLoading(false);
            } catch (err) {
                alert("Alerta");
                setIsLoading(false);
            }
        }
        loadMesas();
        console.log('teste');
        console.log(mesasArray);
    }, []);

    //Função para deletar uma Mesa
    async function deleteMesa() {
        setIsLoading(true);
        try {
            console.log("teste");
            const user_token = sessionStorage.getItem('token');
            const id_token = sessionStorage.getItem('idR');
            console.log(id_token);
            await apiMenu.delete(`/restaurantTables/${deleteId}`,
                {
                    headers: { restaurantId: id_token }
                });
            console.log('deu certo');
            setIsLoading(false);
            togglePopupDeleteTable();
            alert("Mesa removida com sucesso");
            window.location.reload(false);
        } catch (err) {
            setIsLoading(false);
            togglePopupDeleteTable();
            alert("Erro");
        }
    }

    //Função para criar uma Mesa
    async function createMesa(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            console.log("teste");
            const user_token = sessionStorage.getItem('token');
            const id_token = sessionStorage.getItem('idR');
            console.log(id_token);
            await apiMenu.post('/restaurantTables',
                {
                    number: number,
                },
                {
                    headers: { restaurantId: id_token }
                });
            console.log('deu certo');
            setIsLoading(false);
            togglePopupNewTable();
            alert("Mesa criada com sucesso");
            window.location.reload(false);
        } catch (err) {
            setIsLoading(false);
            togglePopupNewTable();
            alert("Erro");
        }
    }

    //Função para criar varias Mesas
    async function createMesas(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            console.log("teste");
            const user_token = sessionStorage.getItem('token');
            const id_token = sessionStorage.getItem('idR');
            console.log(id_token);
            await apiMenu.post('/restaurantTables/generate', null,
                {
                    params: {
                        numberTables: numbers,
                    },
                    headers: { restaurantId: id_token }
                }
            );
            console.log('deu certo');
            setIsLoading(false);
            togglePopupNewTables();
            alert("Mesas criadas com sucesso");
            window.location.reload(false);
        } catch (err) {
            setIsLoading(false);
            togglePopupNewTables();
            alert("Erro");
        }
    }
    //Funções para abrir e fechar os PopUp
    function togglePopupNewTables() {
        setIsOpenNewTables(!isOpenNewTables);
    }
    function togglePopupNewTable() {
        setIsOpenNewTable(!isOpenNewTable);
    }
    function togglePopupDeleteTable() {
        setIsOpenDeleteTable(!isOpenDeleteTable);
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

    return (
        isLoading ? <Loading /> :
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 1 }}>
                {
                    isOpenNewTables &&
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 1 }}>
                        <Popup
                            content={<>
                                <b>Insira a quantidade de Mesas que deseja criar:</b>
                                <form onSubmit={createMesas}>
                                    <input type="number" placeholder="Número de Mesas" name="numbers" id="numbers" onChange={event => setNumbers(event.target.value)} ></input>
                                    <div>
                                        <button type="submit" className={styles.insert}>Criar novas Mesas</button>
                                        <button className={styles.insert} onClick={() => { togglePopupNewTables() }}>Cancelar</button>
                                    </div>
                                </form>
                            </>}
                            handleClose={togglePopupNewTables}
                        />
                    </motion.div>
                }
                {
                    isOpenNewTable &&
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 1 }}>
                        <Popup
                            content={<>
                                <b>Insira o número da Mesa que deseja criar:</b>
                                <form onSubmit={createMesa}>
                                    <input type="number" placeholder="Número da Mesa" name="number" id="number" onChange={event => setNumber(event.target.value)}  ></input>
                                    <div>
                                        <button type="submit" className={styles.insert}>Criar Nova Mesa</button>
                                        <button className={styles.insert} onClick={() => { togglePopupNewTable() }}>Cancelar</button>
                                    </div>
                                </form>
                            </>}
                            handleClose={togglePopupNewTable}
                        />
                    </motion.div>
                }
                {
                    isOpenDeleteTable &&
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 1 }}>
                        <Popup
                            content={<>
                                <b>Você deseja realmente remover a mesa:  <strong>{deleteNumber}?</strong></b>
                                <div>
                                    <button type="submit" className={styles.insert} onClick={() => { deleteMesa() }}>Remover Mesa</button>
                                    <button className={styles.insert} onClick={() => { togglePopupDeleteTable() }}>Cancelar</button>
                                </div>
                            </>}
                            handleClose={togglePopupNewTable}
                        />
                    </motion.div>
                }
                <Header menu={() => menu()} logoff={() => logoff()} orders={() => orders()} profile={() => profile()} employess={() => employess()} tables={() => tables()} reports={() => reports()} />
                <div className={styles.tableContainer}>
                    <div className={styles.Row}>
                        <button className={styles.newTables} onClick={() => { togglePopupNewTables() }}>Criar Mesas</button>
                        <button className={styles.newTables} onClick={() => { window.print() }}>Imprimir QRCodes</button>
                        <button className={styles.newTables} onClick={() => { togglePopupNewTable() }}>Criar Uma Mesa</button>
                    </div>
                    <ul className={styles.printcontainer} id="print-container">
                        {mesasArray.map((table) => (
                            <div>
                                <div className={styles.print}>
                                    <p>Para acessar o cárdapio e realizar os pedidos baixe o aplicativo e leia o QRCode abaixo</p>
                                </div>
                                <h1 className={styles.title} key={table.number}>Mesa: {table.number}</h1>
                                <div className={styles.QRCode}>
                                    <QRCode className={styles.QRCode} name="QrCode" id="QrCode" value={`{"tableId": "${table.id}"}`} />
                                </div>
                                <div className={styles.Row}>
                                    <button className={styles.deleteTable} onClick={() => { setDeleteTable(table); togglePopupDeleteTable() }}>Remover Mesa</button>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </motion.div>
    );
}