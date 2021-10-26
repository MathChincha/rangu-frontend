import React, { useState } from 'react'
import styles from './tables.module.scss'
import Header from '../../components/Header'
import QRCode from 'react-qr-code'
import Popup from '../../components/Popup/Popup'

export default function Reports({ history }) {
    const [isOpenNewTables, setIsOpenNewTables] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            history.push('/signup')
        } catch (err) {
            alert("Alerta");
        }
    }

    function togglePopupNewTables() {
        setIsOpenNewTables(!isOpenNewTables);
    }


    const table = [
        {
            id: 151,
            isActive: true,
        },
        {
            id: 152,
            isActive: true,
        },
    ]
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
                isOpenNewTables && <Popup
                    content={<>
                        <b>Create New Tables</b>
                        <form>
                            <input placeholder="Category" name="category" id="category"  ></input>
                            <button type="submit" className={styles.insert}>Create New Tables</button>
                            <button className={styles.insert} onClick={() => { togglePopupNewTables() }}>Cancel</button>
                        </form>
                    </>}
                    handleClose={togglePopupNewTables}
                />
            }
            <Header menu={() => menu()} logoff={() => logoff()} orders={() => orders()} profile={() => profile()} employess={() => employess()} tables={() => tables()} reports={() => reports()} />
            <div className={styles.tableContainer}>
                <button className={styles.newTables} onClick={() => { togglePopupNewTables() }}>Create New Tables</button>
                <div>
                    {table.map((table) => (
                        <>
                            <h1 className={styles.title} key={table.id}>Table: {table.id}</h1>
                            <div className={styles.QRCode}>
                                <QRCode className={styles.QRCode} name="QrCode" id="QrCode" value={'{id:' + table.id + ',isActive:true}'} />
                            </div>
                        </>
                    ))}
                </div>

            </div>
        </>
    );
}