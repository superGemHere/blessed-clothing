import styles from "./home.module.css";
export default function Home(){
    

    return(
        <main className={styles.main}>
            <section className={styles.header}>
                <div className={styles.welcome}>
                    <h1 id={styles.welcome}>Blessed Clothing <>&#8482;</></h1>
                    <h2 id={styles.welcomeSlogan}>Rare clothing with rare quality.</h2>
                </div>
            </section>
            <div className="slider">
                <h1>Blessed</h1>
            </div>
        </main>
    );
}