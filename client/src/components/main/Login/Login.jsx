import { useState } from 'react';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../Context/authContext';

export default function Login (){
    const {loginSubmitHandler} = useAuth();
    const [isHovered, setIsHovered] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');                       
    return(
        <div className={styles.container}>
            {/* <form  onSubmit={(e) => loginSubmitHandler(e, email, password, setErrorMessage)}className={`${styles.loginForm} ${isHovered ? styles.loginFormHovered : ''}`} > */}
            <form  onSubmit={(e) => loginSubmitHandler(e, email, password, setErrorMessage)}className={styles.loginForm} >
                <h1>Log-in</h1>
                {/* <label htmlFor="email" className={isHovered ? styles.loginLabelsHovered : styles.loginLabels} >Email</label> */}
                <label htmlFor="email" className={styles.loginLabels} >Email</label>
                <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} className={styles.loginInput} id={styles.email} placeholder='example@gmail.com' />
                {/* <label htmlFor="password" className={isHovered ? styles.loginLabelsHovered : styles.loginLabels} >Password</label> */}
                <label htmlFor="password" className={styles.loginLabels} >Password</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className={styles.loginInput} id={styles.password} placeholder='*****' />
                <p className={styles.errorMessage}>{errorMessage}</p>
                <input type='submit' value={"Login"}  
                    onClick={() => setIsHovered(true)}/>
                    <p>Don't have an account? Create your account<Link className={styles.navigateLink} to={'/users/register'}>here</Link>.</p>
            </form>
        </div>
    );
}