import styles from "./home.module.css";
import Section from '../Gender Section/Section'
import sectionWomenImage from "../../../assets/sectionPics/women-section.jpg"
import sectionMenImage from "../../../assets/sectionPics/men-section.jpg"
import sectionKidImage from "../../../assets/sectionPics/kids-section.jpg"

export default function Home(){
    let dataWoman = {
        sectionImage: sectionWomenImage,
        sectionName: "Women"
    }
    let dataMan = {
        sectionImage: sectionMenImage,
        sectionName: "Men"
    }
    let dataKids = {
        sectionImage: sectionKidImage,
        sectionName: "Kids"
    }

    return(
        <main className={styles.main}>
            <section className={styles.header}>
                <div className={styles.welcome}>
                    <h1 id={styles.welcome}>Blessed Clothing <>&#8482;</></h1>
                    <h2 id={styles.welcomeSlogan}>Rare clothing with rare quality.</h2>
                </div>
            </section>
            <div className={styles.genderSections}>
                <Section 
                data={dataWoman}
                />
                <Section 
                data={dataMan}
                />
                <Section 
                data={dataKids}
                />
            </div>
            <section className={styles.collections}>
                <div className="blessed-angels">
                    <h1>Blessed Angels</h1>
                </div>
                <div className="fallen-angels">
                    <h1>Fallen Angels</h1>
                </div>
            </section>
        </main>
    );
}