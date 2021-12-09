import { motion } from "framer-motion"
import React, { useState, useEffect } from 'react'
import styles from './employess.module.scss'
import Header from '../../components/Header'
import Popup from '../../components/Popup/Popup'
import Loading from '../../components/Loading/Popup'

import { apiUsers } from '../../services/api'

export default function Reports({ history }) {
    const [isOpenNewEmp, setIsOpenNewEmp] = useState(false);
    const [isOpenEditEmp, setIsOpenEditEmp] = useState(false);
    const [isOpenRemoveEmp, setIsOpenRemoveEmp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const [editID, setEditID] = useState('');
    const [editName, setEditName] = useState('');
    const [editPhone, setEditPhone] = useState('');

    const [employees, setEmployees] = useState([]);

    //UseEffect para carregar todos os employees cadastradas
    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            const user_id = sessionStorage.getItem('idR');
            console.log(user_id);
            try {
                const response = await apiUsers.get(`/restaurants/${user_id}`, {
                });
                console.log(response.data);
                if (response.data.employees) {
                    setEmployees(response.data.employees);
                }
                console.log(employees);
                setIsLoading(false);
            } catch (err) {
                alert("Alerta");
                setIsLoading(false);
            }
        }
        loadData();
        console.log('teste');
    }, []);

    //Função para criar um employee
    async function newEmployee(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            console.log("teste");
            const user_token = sessionStorage.getItem('token');
            const id_token = sessionStorage.getItem('idR')
            console.log(id_token);
            await apiUsers.post(`/restaurants/${id_token}/employee`,
                {
                    email: email,
                    name: name,
                    password: password,
                    phone: phone
                }
            );
            console.log('deu certo');
            setIsLoading(false);
            togglePopupNewEmp();
            alert("Funcionário criado com sucesso");
            window.location.reload(false);
        } catch (err) {
            setIsLoading(false);
            togglePopupNewEmp();
            alert("Erro");
        }
    }

    //Função para editar um employee
    async function editarFuncionário(event) {
        console.log(editID);
        console.log(editName);
        console.log(editPhone);
        event.preventDefault();
        setIsLoading(true);
        try {
            console.log("teste");
            const response = await apiUsers.put(`/employees/${editID}`,
                {
                    name: editName,
                    phone: editPhone
                }
            );
            console.log('deu certo');
            togglePopupEditEmp();
            setIsLoading(false);
            console.log(response.data);
            alert("Funcionário editado com sucesso");
            window.location.reload(false);
        } catch (err) {
            setIsLoading(false);
            togglePopupEditEmp();
            alert(err);
        }
    }

    //Função para remover um employee
    async function deleteFuncionário() {
        console.log(editID);
        console.log(editName);
        console.log(editPhone);
        const id_token = sessionStorage.getItem('idR')
        setIsLoading(true);
        try {
            console.log("teste");
            const response = await apiUsers.delete(`/restaurants/${id_token}/employee/${editID}`,
                {
                    name: editName,
                    phone: editPhone
                }
            );
            console.log('deu certo');
            togglePopupEditEmp();
            setIsLoading(false);
            console.log(response.data);
            alert("Funcionário removido com sucesso");
            window.location.reload(false);
        } catch (err) {
            setIsLoading(false);
            togglePopupEditEmp();
            alert(err);
        }
    }

    function setEditEmployee(employee) {
        setEditID(employee.id);
        setEditName(employee.name);
        setEditPhone(employee.phone);
    }
    //Funções para abrir e fechar os PopUp
    function togglePopupNewEmp() {
        setIsOpenNewEmp(!isOpenNewEmp);
    }
    function togglePopupEditEmp() {
        setIsOpenEditEmp(!isOpenEditEmp);
    }
    function togglePopupRemoveEmp() {
        setIsOpenRemoveEmp(!isOpenRemoveEmp);
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
        isLoading ? <Loading /> :
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 1 }}>
                {
                    isOpenNewEmp &&
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 1 }}>
                        <Popup
                            content={<>
                                <form onSubmit={newEmployee}>
                                    <b>Insira o novo Funcionário</b>
                                    <input placeholder="Email" name="email" id="email" value={email} onChange={event => setEmail(event.target.value)} />
                                    <input placeholder="Nome" name="name" id="name" value={name} onChange={event => setName(event.target.value)} />
                                    <input placeholder="Senha" name="password" id="password" type="password" value={password} onChange={event => setPassword(event.target.value)} />
                                    <input placeholder="Telefone" name="phone" id="phone" value={phone} onChange={event => setPhone(event.target.value)} />
                                    <div>
                                        <button type="submit" className={styles.insert} >Criar Novo Funcionário</button>
                                        <button className={styles.insert} onClick={() => { togglePopupNewEmp() }}>Cancelar</button>
                                    </div>
                                </form>
                            </>}
                            handleClose={togglePopupNewEmp}
                        />
                    </motion.div>
                }
                {
                    isOpenEditEmp &&
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 1 }}>
                        <Popup
                            content={<>
                                <form onSubmit={editarFuncionário}>
                                    <b>Editar Funcionário</b>
                                    <input placeholder="Nome" name="editName" id="editName" value={editName} onChange={event => setEditName(event.target.value)} />
                                    <input placeholder="Telefone" name="editPhone" id="editPhone" value={editPhone} onChange={event => setEditPhone(event.target.value)} />
                                    <div>
                                        <button className={styles.insert} type="submit">Editar Funcionário</button>
                                        <button className={styles.insert} onClick={() => { togglePopupEditEmp() }}>Cancel</button>
                                    </div>
                                </form>
                            </>}
                            handleClose={togglePopupEditEmp}
                        />
                    </motion.div>
                }
                {
                    isOpenRemoveEmp &&
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 1 }}>
                        <Popup
                            content={<>
                                <b>Você deseja remover o funcionário: <strong> {editName}</strong> ?</b>
                                <div>
                                    <button className={styles.insert} onClick={() => { deleteFuncionário() }}>Remove Employee</button>
                                    <button className={styles.insert} onClick={() => { togglePopupRemoveEmp() }}>Cancel</button>
                                </div>
                            </>}
                            handleClose={togglePopupRemoveEmp}
                        />
                    </motion.div>
                }
                <Header menu={() => menu()} logoff={() => logoff()} orders={() => orders()} profile={() => profile()} employess={() => employess()} tables={() => tables()} reports={() => reports()} />
                <div className={styles.tableContainer}>
                    <button className={styles.newEmployee} onClick={() => { togglePopupNewEmp() }}>Criar novo funcionario</button>
                    {employees.map((employesss) => (
                        <>
                            <ul className={styles.foodList} key={employesss.id}>
                                <strong className={styles.name}>{employesss.name}</strong>
                                <strong className={styles.email}>{employesss.email}</strong>
                                <strong className={styles.phone}>{employesss.phone}</strong>
                                <button className={styles.button1} onClick={() => { setEditEmployee(employesss); togglePopupRemoveEmp() }}>Remover funcionario</button>
                                <button className={styles.button2} onClick={() => { setEditEmployee(employesss); togglePopupEditEmp() }}>Editar funcionario</button>
                            </ul>
                        </>
                    ))}
                </div>
            </motion.div>
    );
}