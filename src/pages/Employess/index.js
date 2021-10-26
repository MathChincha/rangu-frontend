import React, { useState } from 'react'
import styles from './employess.module.scss'
import Header from '../../components/Header'
import Popup from '../../components/Popup/Popup'

export default function Reports({ history }) {
    const [isOpenNewEmp, setIsOpenNewEmp] = useState(false);
    const [isOpenEditEmp, setIsOpenEditEmp] = useState(false);
    const [isOpenRemoveEmp, setIsOpenRemoveEmp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

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
                        <b>Insert the new employee</b>
                        <input placeholder="Email" name="email" id="email" value={email} onChange={event => setEmail(event.target.value)} />
                        <input placeholder="Name" name="name" id="name" value={name} onChange={event => setName(event.target.value)} />
                        <input placeholder="Password" name="password" id="password" type="password" value={password} onChange={event => setPassword(event.target.value)} />
                        <input placeholder="Phone" name="phone" id="phone" value={phone} onChange={event => setPhone(event.target.value)} />
                        <div>
                            <button className={styles.insert} onClick={() => { togglePopupNewEmp() }}>Insert New Employee</button>
                            <button className={styles.insert} onClick={() => { togglePopupNewEmp() }}>Cancel</button>
                        </div>
                    </>}
                    handleClose={togglePopupNewEmp}
                />
            }
            {
                isOpenEditEmp && <Popup
                    content={<>
                        <b>Edit employee</b>
                        <input placeholder="Email" name="email" id="email" value={email} onChange={event => setEmail(event.target.value)} />
                        <input placeholder="Name" name="name" id="name" value={name} onChange={event => setName(event.target.value)} />
                        <input placeholder="Password" name="password" id="password" type="password" value={password} onChange={event => setPassword(event.target.value)} />
                        <input placeholder="Phone" name="phone" id="phone" value={phone} onChange={event => setPhone(event.target.value)} />
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
                            <button className={styles.li2} onClick={() => { togglePopupEditEmp() }}>Edit Employee</button>
                        </ul>
                    </>
                ))}
            </div>
        </>
    );
}