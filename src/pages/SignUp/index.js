import styles from './signup.module.scss'
import logo from '../../assets/logo.png'
import Header from '../../components/Header'

export default function SignUp({ history }) {

    function Login() {
        history.push('/');
    }

    return (
        <>
            <Header />
            <div className={styles.signUpContainer}>
                <img src={logo} alt="Logo" />
                <p>Sign Up</p>
                <form>
                    <input placeholder="username" name="username" id="username" />
                    <input placeholder="password" name="password" id="password" />
                    <input placeholder="email" name="email" id="email" />
                    <input placeholder="CNPJ" name="CNPJ" id="CNPJ" />
                    <button>Sign Up</button>
                </form>
                <label onClick={Login}>Back</label>
            </div>
        </>
    );
}