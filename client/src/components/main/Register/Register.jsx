import { useState } from 'react';
import styles from './register.module.css';
import { Link } from 'react-router-dom';

export default function Login (){
    const [isHovered, setIsHovered] = useState(false);
                            
    return(
        <div className={styles.container}>
            <form action="#" className={`${styles.registerForm} ${isHovered ? styles.registerFormHovered : ''}`} method="">
                <h1>Register</h1>
                <label htmlFor="email" className={isHovered ? styles.registerLabelsHovered : styles.registerLabels} >Email</label>
                <input type="text" name="email" className={styles.registerInput} id={styles.email} placeholder='example@gmail.com' />
                <label htmlFor="password" className={isHovered ? styles.registerLabelsHovered : styles.registerLabels} >Password</label>
                <input type="password" name="password" className={styles.registerInput} id={styles.password} placeholder='*****' />
                <label htmlFor="repeatPassword" className={isHovered ? styles.registerLabelsHovered : styles.registerLabels} >Repeat Password</label>
                <input type="password" name="repeatPassword" className={styles.registerInput} id={styles.password} placeholder='*****' />
                <input type='submit' value={"Register"}  
                    onClick={() => setIsHovered(true)}/>
                     <p>Already have an account? Then click<Link className={styles.navigateLink} to={'/users/login'}>here</Link>.</p>
            </form>
        </div>
    );
}