import React, { useState } from 'react'
import styles from './signup.module.scss'
import Loading from '../../components/Loading/Popup'
import { apiUsers, apiCep } from '../../services/api'
import { motion } from "framer-motion"

import logo from '../../assets/logo.png'

export default function SignUp({ history }) {

    const [ownerName, setOwnerName] = useState('');
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
            console.log("teste de cadastro");
            await apiUsers.post('/restaurants/sign-up',
                {
                    restaurantName,
                    cnpj,
                    ownerName,
                    email,
                    password,
                    phone,
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
            alert("Erro");
        }
    }

    async function getCep() {

        try {
            const response = await apiCep.get(`${postalCode}.json`)
            console.log(response.data);
            setPostalCode(response.data.code);
            setState(response.data.state);
            setCity(response.data.city);
            setDistrict(response.data.district);
            setStreet(response.data.address);

        } catch (err) {
            alert("Cep não encontrado")
        }
    }

    function Login() {
        history.push('/');
    }

    return (
        isLoading ? <Loading /> :
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "tween", ease: "anticipate", duration: 1 }}>
                <div>
                    <div className={styles.signUpContainer}>
                        <div className={styles.collumn}>
                            <div className={styles.row}>
                                <p>Identidade</p>
                                <p>Endereço</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.row}>
                                    <input placeholder="CNPJ" name="CNPJ" id="CNPJ" value={cnpj} onChange={event => setCnpj(event.target.value)} />
                                    <input placeholder="CEP" name="postalCode" id="postalCode" value={postalCode} onPointerLeave={t => getCep()} onChange={event => setPostalCode(event.target.value)} />
                                </div>
                                <div className={styles.row}>
                                    <input placeholder="E-mail" name="email" id="email" value={email} onChange={event => setEmail(event.target.value)} />
                                    <input placeholder="Estado" name="state" id="state" value={state} onChange={event => setState(event.target.value)} />
                                </div>
                                <div className={styles.row}>

                                    <input placeholder="Nome" name="name" id="name" value={ownerName} onChange={event => setOwnerName(event.target.value)} />
                                    <input placeholder="Cidade" name="city" id="city" value={city} onChange={event => setCity(event.target.value)} />
                                </div>
                                <div className={styles.row}>
                                    <input placeholder="Senha" name="password" id="password" type="password" value={password} onChange={event => setPassword(event.target.value)} />
                                    <input placeholder="Bairro" name="district" id="district" value={district} onChange={event => setDistrict(event.target.value)} />
                                </div>
                                <div className={styles.row}>
                                    <input placeholder="Telefone" name="phone" id="phone" value={phone} onChange={event => setPhone(event.target.value)} />
                                    <input placeholder="Rua" name="street" id="street" value={street} onChange={event => setStreet(event.target.value)} />
                                </div>
                                <div className={styles.row}>
                                    <input placeholder="Nome do Restaurante" name="restaurantName" id="restaurantName" value={restaurantName} onChange={event => setRestaurantName(event.target.value)} />
                                    <input placeholder="Numero" name="number" id="number" value={number} onChange={event => setNumber(event.target.value)} />
                                </div>
                                <button type="submit">Cadastrar</button>
                            </form>
                            <label onClick={Login}>Voltar</label>
                        </div>
                    </div>
                </div>
            </motion.div>
    );
}