import { useEffect, useState } from 'react';
import styles from './register.module.css';
import { Link } from 'react-router-dom';

import { register } from '../../../api/authenticationApi';
import { useAuth } from '../../../Context/authContext';

export default function Login (){
    const { registerSubmitHandler } = useAuth();
    const [isHovered, setIsHovered] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ rePass, setRePass ] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
                            
    return(
        <div className={styles.container}>
            {/* <form onSubmit={(e) => registerSubmitHandler(e, email, password, rePass, setErrorMessage)} className={`${styles.registerForm} ${isHovered ? styles.registerFormHovered : ''}`} > */}
            <form onSubmit={(e) => registerSubmitHandler(e, email, password, rePass, setErrorMessage)} className={styles.registerForm} >
                <h1>Register</h1>
                {/* <label htmlFor="email" className={isHovered ? styles.registerLabelsHovered : styles.registerLabels} >Email</label> */}
                <label htmlFor="email" className={styles.registerLabels} >Email</label>
                <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} className={styles.registerInput} id={styles.email} placeholder='example@gmail.com' />
                {/* <label htmlFor="password" className={isHovered ? styles.registerLabelsHovered : styles.registerLabels} >Password</label> */}
                <label htmlFor="password" className={styles.registerLabels} >Password</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className={styles.registerInput} id={styles.password} placeholder='*****' />
                {/* <label htmlFor="repeatPassword" className={isHovered ? styles.registerLabelsHovered : styles.registerLabels} >Repeat Password</label> */}
                <label htmlFor="repeatPassword" className={styles.registerLabels} >Repeat Password</label>
                <input type="password" name="repeatPassword" onChange={(e) => setRePass(e.target.value)}className={styles.registerInput} id={styles.password} placeholder='*****' />
                <p className={styles.errorMessage}>{errorMessage}</p>
                <input type='submit' value={"Register"}  
                    onClick={() => setIsHovered(true)}/>
                     <p>Already have an account? Then click<Link className={styles.navigateLink} to={'/users/login'}>here</Link>.</p>
            </form>
        </div>
    );
}