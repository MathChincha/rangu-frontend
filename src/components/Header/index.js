import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useState } from 'react';
import logo from '../../assets/logo.png'

import styles from './styles.module.scss';

export default function Header(props) {
    const currentDate = format(new Date(), 'EEEEEE, d, MMMM', {
        locale: ptBR
    });

    const type = sessionStorage.getItem('type');
    console.log(type);
    const isActive = useState(props.isActive);

    if (type === 'RESTAURANT')
        return (
            <header className={styles.headerContainer}>

                <img src={logo} alt="Logo" />

                <p>Rangu</p>
                <div>
                    {

                        isActive ? <div>
                            <span className={styles.Header} onClick={() => { props.menu() }}>Cárdapio</span>
                            <span className={styles.Header} onClick={() => { props.profile() }}>Perfil</span>
                            <span className={styles.Header} onClick={() => { props.orders() }}>Pedidos</span>
                            <span className={styles.Header} onClick={() => { props.employess() }}>Funcionários</span>
                            <span className={styles.Header} onClick={() => { props.tables() }}>Mesas</span>
                            <span className={styles.Header} onClick={() => { props.reports() }}>Relatórios</span>
                            <span className={styles.Header} onClick={() => { sessionStorage.clear(); props.logoff() }}>Sair</span>
                        </div> : null
                    }
                </div>
                <span>{currentDate}</span>
            </header>
        );

    if (type === 'EMPLOYEE')
        return (
            <header className={styles.headerContainer}>

                <img src={logo} alt="Logo" />

                <p>Rangu</p>
                <div>
                    {

                        isActive ? <div>
                            <span className={styles.Header} onClick={() => { props.menu() }}>Cárdapio</span>
                            <span className={styles.Header} onClick={() => { props.orders() }}>Pedidos</span>
                            <span className={styles.Header} onClick={() => { props.tables() }}>Mesas</span>
                            <span className={styles.Header} onClick={() => { sessionStorage.clear(); props.logoff() }}>Sair</span>
                        </div> : null
                    }
                </div>
                <span>{currentDate}</span>
            </header>
        );

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

}