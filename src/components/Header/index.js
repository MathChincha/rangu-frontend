import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useState } from 'react';
import logo from '../../assets/logo.png'

import styles from './styles.module.scss';

export default function Header(props) {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
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
                        <span className={styles.Header} onClick={() => { props.logoff() }}>Logoff</span>
                    </div> : null
                }
            </div>
            <span>{currentDate}</span>
        </header>
    );
}