import styles from './forgotpassword.module.scss';
import logo from '../../assets/logo.png'

export default function ForgotPassword({ history }) {

    function Login() {
        history.push('/');
    }

    return (
        <div className={styles.forgotPasswordContainer}>
            <img src={logo} alt="Logo" />
            <p>Esqueceu a Senha?</p>
            <form>
                <input placeholder="CNPJ" name="username" id="username" />
                <input placeholder="Email" name="email" id="email" />
                <button>Enviar Nova Senha</button>
            </form>
            <label className={styles.cursor} onClick={Login}>Voltar</label>
        </div>
    );
}