import React, { useState } from 'react'
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
    const [editEmail, setEditEmail] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [editPhone, setEditPhone] = useState('');

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
                    //password: password,
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

    function editEmployee(employee) {
        setEditID(employee.id);
        setEditEmail(employee.email);
        setEditName(employee.name);
        setEditPassword(employee.password);
        setEditPhone(employee.phone);
    }

    function togglePopupNewEmp() {
        setIsOpenNewEmp(!isOpenNewEmp);
    }

    function togglePopupEditEmp() {
        setIsOpenEditEmp(!isOpenEditEmp);
    }

    function togglePopupRemoveEmp() {
        setIsOpenRemoveEmp(!isOpenRemoveEmp);
    }

    const employesss = [
        {
            id: 30,
            email: 'teste@teste.com',
            name: 'Luiz Silva',
            password: 'abc123',
            phone: '98765-4321'
        },
        {
            id: 40,
            email: 'teste2@teste.com',
            name: 'Gian Raphael',
            password: 'abc123',
            phone: '98765-4321'
        },
        {
            id: 50,
            email: 'teste3@teste.com',
            name: 'Leonardo Mariotto',
            password: 'abc123',
            phone: '98765-4321'
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
                isOpenNewEmp && <Popup
                    content={<>
                        <form onSubmit={newEmployee}>
                            <b>Insert the new employee</b>
                            <input placeholder="Email" name="email" id="email" value={email} onChange={event => setEmail(event.target.value)} />
                            <input placeholder="Name" name="name" id="name" value={name} onChange={event => setName(event.target.value)} />
                            <input placeholder="Password" name="password" id="password" type="password" value={password} onChange={event => setPassword(event.target.value)} />
                            <input placeholder="Phone" name="phone" id="phone" value={phone} onChange={event => setPhone(event.target.value)} />
                            <div>
                                <button type="submit" className={styles.insert} >Insert New Employee</button>
                                <button className={styles.insert} onClick={() => { togglePopupNewEmp() }}>Cancel</button>
                            </div>
                        </form>
                    </>}
                    handleClose={togglePopupNewEmp}
                />
            }
            {
                isOpenEditEmp && <Popup
                    content={<>
                        <b>Edit employee</b>
                        <input placeholder="Email" name="editEmail" id="editEmail" value={editEmail} onChange={event => setEditEmail(event.target.value)} />
                        <input placeholder="Name" name="editName" id="editName" value={editName} onChange={event => setEditName(event.target.value)} />
                        <input placeholder="Password" name="editPassword" id="editPassword" type="password" value={editPassword} onChange={event => setEditPassword(event.target.value)} />
                        <input placeholder="Phone" name="editPhone" id="editPhone" value={editPhone} onChange={event => setEditPhone(event.target.value)} />
                        <div>
                            <button className={styles.insert} onClick={() => { togglePopupEditEmp() }}>Edit Employee</button>
                            <button className={styles.insert} onClick={() => { togglePopupEditEmp() }}>Cancel</button>
                        </div>
                    </>}
                    handleClose={togglePopupEditEmp}
                />
            }
            {
                isOpenRemoveEmp && <Popup
                    content={<>
                        <b>You wish to Remove this employee?</b>
                        <div>
                            <button className={styles.insert} onClick={() => { togglePopupRemoveEmp() }}>Remove Employee</button>
                            <button className={styles.insert} onClick={() => { togglePopupRemoveEmp() }}>Cancel</button>
                        </div>
                    </>}
                    handleClose={togglePopupRemoveEmp}
                />
            }
            {
                isLoading && <Loading />
            }
            <Header menu={() => menu()} logoff={() => logoff()} orders={() => orders()} profile={() => profile()} employess={() => employess()} tables={() => tables()} reports={() => reports()} />
            <div className={styles.tableContainer}>
                <button className={styles.newEmployee} onClick={() => { togglePopupNewEmp() }}>Create New Employee</button>
                {employesss.map((employesss) => (
                    <>
                        <ul className={styles.foodList} key={employesss.id}>
                            <strong className={styles.dishName}>{employesss.name}</strong>
                            <strong className={styles.comments}>{employesss.email}</strong>
                            <strong className={styles.dishName}>{employesss.password}</strong>
                            <strong className={styles.comments}>{employesss.phone}</strong>
                            <button className={styles.ul} onClick={() => { togglePopupRemoveEmp() }}>Remove Employee</button>
                            <button className={styles.li2} onClick={() => { editEmployee(employesss); togglePopupEditEmp() }}>Edit Employee</button>
                        </ul>
                    </>
                ))}
            </div>
        </>
    );
}