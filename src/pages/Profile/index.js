import React, { useState } from 'react'
import styles from './profile.module.scss'
import Header from '../../components/Header'
import Popup from '../../components/Popup/Popup'
import { apiUsers } from '../../services/api'

import logo from '../../assets/logo.png'
import Loading from '../../assets/Loading.gif'

export default function Menu({ history }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [phone, setPhone] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            console.log("teste");
            await apiUsers.update('/restaurants/sign-up',
                {
                    restaurantName,
                    cnpj,
                    user: {
                        name,
                        email,
                        password,
                        phone
                    },
                    address: {
                        district,
                        city,
                        state,
                        postalCode,
                        number,
                        street
                    }
                });
            console.log('deu certo');
            setIsLoading(false);
            alert("Sua solicitação de criação de conta foi enviada, aguarde o e-mail de ativação de conta");
            history.push('/');
        } catch (err) {
            setIsLoading(false);
            alert("Usuário já existe");
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

    return (
        <>
            {
                isLoading && <Popup
                    content={<>
                        <img src={Loading} alt="Loading"></img>
                    </>}
                />
            }
            <Header menu={() => menu()} logoff={() => logoff()} orders={() => orders()} profile={() => profile()} employess={() => employess()} />
            <div className={styles.menuContainer}>
                <div className={styles.collumn}>
                    <img src={logo} alt="Logo" />
                    <div className={styles.row}>
                        <p>Identity</p>
                        <p>Address</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.row}>
                            <input placeholder="CNPJ" name="CNPJ" id="CNPJ" value={cnpj} onChange={event => setCnpj(event.target.value)} />
                            <input placeholder="PostalCode" name="postalCode" id="postalCode" value={postalCode} onChange={event => setPostalCode(event.target.value)} />
                        </div>
                        <div className={styles.row}>
                            <input placeholder="Email" name="email" id="email" value={email} onChange={event => setEmail(event.target.value)} />
                            <input placeholder="State" name="state" id="state" value={state} onChange={event => setState(event.target.value)} />
                        </div>
                        <div className={styles.row}>
                            <input placeholder="Name" name="name" id="name" value={name} onChange={event => setName(event.target.value)} />
                            <input placeholder="City" name="city" id="city" value={city} onChange={event => setCity(event.target.value)} />
                        </div>
                        <div className={styles.row}>
                            <input placeholder="Password" name="password" id="password" type="password" value={password} onChange={event => setPassword(event.target.value)} />
                            <input placeholder="District" name="district" id="district" value={district} onChange={event => setDistrict(event.target.value)} />
                        </div>
                        <div className={styles.row}>
                            <input placeholder="Phone" name="phone" id="phone" value={phone} onChange={event => setPhone(event.target.value)} />
                            <input placeholder="Street" name="street" id="street" value={street} onChange={event => setStreet(event.target.value)} />
                        </div>
                        <div className={styles.row}>
                            <input placeholder="RestaurantName" name="restaurantName" id="restaurantName" value={restaurantName} onChange={event => setRestaurantName(event.target.value)} />
                            <input placeholder="Number" name="number" id="number" value={number} onChange={event => setNumber(event.target.value)} />
                        </div>
                        <button type="submit">Update</button>
                    </form>
                </div>
            </div>
        </>
    );
}