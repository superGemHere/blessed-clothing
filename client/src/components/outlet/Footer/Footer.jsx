import styles from './footer.module.css';

import {Link} from 'react-router-dom';

import { FaGithub } from "react-icons/fa";

export default function Footer (){

    return(
        <div className={styles.container}>
            <div className={styles.links}>
                <section className={styles.navigation}>
                    <Link className={styles.link} to={"/"}>Home</Link>
                    <Link className={styles.link} to={"/products"}>Products</Link>
                    <Link className={styles.link} to={"#"}>Sale</Link>
                    <Link className={styles.link} to={"#"}>Browse</Link>
                    <Link className={styles.link} to={"#"}>Collections</Link>
                </section>
                <section className={styles.about}>
                    <Link className={styles.link} to={"#"}>About Us</Link>
                    <Link className={styles.link} to={"#"}>FAQ</Link>
                    <Link className={styles.link} to={"#"}>Locations</Link>
                </section>	
                <section className={styles.contacts}>
                    <p className={styles.paragraph}>Phone:&nbsp;&nbsp;<span className={styles.phoneNumber}>+878 559 4478</span></p>
                    <p className={styles.paragraph}>E-mail: blessedClothing@gmail.com</p>
                    <p className={styles.paragraph}>Linked in: Blessed</p>
                    <div className={styles.github}>
                        <FaGithub color='#fff'size={35}/>
                        <Link className={styles.link} target="_blank" to={"https://github.com/supergemhere"}>superGemHere</Link>
                    </div>
                </section>
            </div>
            <p className={styles.copyRight}>All rights reserved &copy; - Dzhem Syuleyman</p>
        </div>
    );
}