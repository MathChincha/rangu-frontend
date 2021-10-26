import format from 'date-fns/format';
import enUS from 'date-fns/locale/en-US';
import React, { useState } from 'react';
import logo from '../../assets/logo.png'

import styles from './styles.module.scss';

export default function Header(props) {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: enUS,
    });
    const isActive = useState(props.isActive);

    /*   function showUser() {
   
           if (isActive)
               return (
                   <>
   
                   </>
               )
           else
               return (
                   <> <label>teste</label> </>
               )
       }
   */
    return (
        <header className={styles.headerContainer}>

            <img src={logo} alt="Logo" />

            <p>Rangu</p>
            <div>
                {
                    isActive ? <div>
                        <span className={styles.Header} onClick={() => { props.menu() }}>Menu</span>
                        <span className={styles.Header} onClick={() => { props.profile() }}>Profile</span>
                        <span className={styles.Header} onClick={() => { props.orders() }}>Orders</span>
                        <span className={styles.Header} onClick={() => { props.employess() }}>Employess</span>
                        <span className={styles.Header} onClick={() => { props.tables() }}>Tables</span>
                        <span className={styles.Header} onClick={() => { props.reports() }}>Reports</span>
                        <span className={styles.Header} onClick={() => { sessionStorage.clear(); props.logoff() }}>Logoff</span>
                    </div> : null
                }
            </div>
            <span>{currentDate}</span>
        </header>
    );
}