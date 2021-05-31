import React, { useState } from 'react'
import styles from './signup.module.scss'
import logo from '../../assets/logo.png'
import { apiUsers } from '../../services/api'

export default function SignUp({ history }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [phone, setPhone] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [address, setAddress] = useState([]);
    const [postalCode, setPostalCode] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');


    async function handleSubmit(event) {
        event.preventDefault();

        try {
            Address();
            await apiUsers.post('/restaurants/sign-up',
                {
                    address,
                    cnpj,
                    email,
                    name,
                    password,
                    phone,
                    restaurantName
                });
            history.push('/')
        } catch (err) {
            alert("Alerta");
        }
    }

    function Address() {
        setAddress([
            postalCode,
            state,
            city,
            district,
            street,
            number
        ])
    }

    function Login() {
        history.push('/');
    }

    return (
        <>
            <div className={styles.signUpContainer}>
                <div class={styles.collumn}>
                    <img src={logo} alt="Logo" />
                    <div class={styles.row}>
                        <p>Identity</p>
                        <p>Address</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class={styles.row}>
                            <input placeholder="CNPJ" name="CNPJ" id="CNPJ" value={cnpj} onChange={event => setCnpj(event.target.value)} />
                            <input placeholder="PostalCode" name="postalCode" id="postalCode" value={postalCode} onChange={event => setPostalCode(event.target.value)} />
                        </div>
                        <div class={styles.row}>
                            <input placeholder="Email" name="email" id="email" value={email} onChange={event => setEmail(event.target.value)} />
                            <input placeholder="State" name="state" id="state" value={state} onChange={event => setState(event.target.value)} />
                        </div>
                        <div class={styles.row}>
                            <input placeholder="Name" name="name" id="name" value={name} onChange={event => setName(event.target.value)} />
                            <input placeholder="City" name="city" id="city" value={city} onChange={event => setCity(event.target.value)} />
                        </div>
                        <div class={styles.row}>
                            <input placeholder="Password" name="password" id="password" value={password} onChange={event => setPassword(event.target.value)} />
                            <input placeholder="District" name="district" id="district" value={district} onChange={event => setDistrict(event.target.value)} />
                        </div>
                        <div class={styles.row}>
                            <input placeholder="Phone" name="phone" id="phone" value={phone} onChange={event => setPhone(event.target.value)} />
                            <input placeholder="Street" name="street" id="street" value={street} onChange={event => setStreet(event.target.value)} />
                        </div>
                        <div class={styles.row}>
                            <input placeholder="RestaurantName" name="restaurantName" id="restaurantName" value={restaurantName} onChange={event => setRestaurantName(event.target.value)} />
                            <input placeholder="Number" name="number" id="number" value={number} onChange={event => setNumber(event.target.value)} />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                    <label onClick={Login}>Back</label>
                </div>
            </div>
        </>
    );
}