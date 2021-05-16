import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import logo from '../../assets/logo.png'

import styles from './styles.module.scss';

export default function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    });

    return (
        <header className={styles.headerContainer}>

            <img src={logo} alt="Logo" />

            <p>Rangu</p>

            <span>{currentDate}</span>
        </header>
    );
}