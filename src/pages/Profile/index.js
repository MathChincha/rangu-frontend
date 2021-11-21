import React, { useState, useEffect } from 'react'
import styles from './profile.module.scss'
import Header from '../../components/Header'
import { apiUsers } from '../../services/api'
import Loading from '../../components/Loading/Popup'

import logo from '../../assets/logo.png'

export default function Profile({ history }) {

    const [restaurantName, setRestaurantName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [number, setNumber] = useState('');
    const [street, setStreet] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            const user_id = sessionStorage.getItem('idR');
            console.log(user_id);
            try {
                const response = await apiUsers.get(`/restaurants/${user_id}`, {
                });
                console.log(response.data);
                setCnpj(response.data.cnpj);
                setEmail(response.data.email);
                setOwnerName(response.data.ownerName);
                setPhone(response.data.phone);
                setRestaurantName(response.data.restaurantName);
                setPostalCode(response.data.address.postalCode);
                setState(response.data.address.state);
                setCity(response.data.address.city);
                setDistrict(response.data.address.district);
                setStreet(response.data.address.street);
                setNumber(response.data.address.number);
                setTimeout(function () {
                    setIsLoading(false);
                }, 2000);
            } catch (err) {
                alert("Alerta");
                setTimeout(function () {
                    setIsLoading(false);
                }, 2000);
            }
        }
        loadData();
        console.log('teste');
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            console.log("teste");
            const user_id = sessionStorage.getItem('idR');
            const jason = {
                body: {
                    addressUpdate: {
                        city,
                        district,
                        number,
                        postalCode,
                        state,
                        street
                    },
                    cnpj,
                    ownerName,
                    phone
                },
            }
            console.log(jason);
            const response = await apiUsers.put(`/restaurants/${user_id}`,
                {
                    body: {
                        addressUpdate: {
                            city,
                            district,
                            number,
                            postalCode,
                            state,
                            street
                        },
                        cnpj,
                        ownerName,
                        phone
                    },
                });
            console.log('deu certo');
            setIsLoading(false);
            console.log(response.data);
            alert("Seus dados foram atualizados com sucesso");
            history.push('/');
        } catch (err) {
            setIsLoading(false);
            alert("Erro");
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
                isLoading && <Loading />
            }
            <Header menu={() => menu()} logoff={() => logoff()} orders={() => orders()} profile={() => profile()} employess={() => employess()} tables={() => tables()} reports={() => reports()} />
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
                            <input placeholder="Name" name="name" id="name" value={ownerName} onChange={event => setOwnerName(event.target.value)} />
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