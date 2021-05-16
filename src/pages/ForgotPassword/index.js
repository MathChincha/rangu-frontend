import styles from './forgotpassword.module.scss';
import logo from '../../assets/logo.png'

export default function ForgotPassword({ history }) {

    function Login() {
        history.push('/');
    }

    return (
        <div className={styles.forgotPasswordContainer}>
            <img src={logo} alt="Logo" />
            <p>Forgot Password?</p>
            <form>
                <input placeholder="username" name="username" id="username" />
                <input placeholder="email" name="email" id="email" />
                <button>Send New Password</button>
            </form>
            <label onClick={Login}>Back</label>
        </div>
    );
}