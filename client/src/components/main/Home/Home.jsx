import styles from "./home.module.css";
import Section from '../Gender Section/Section'
import Collection from "../Collection/Collection";
import sectionWomenImage from "../../../assets/sectionPics/women-section.jpg"
import sectionMenImage from "../../../assets/sectionPics/men-section.jpg"
import sectionKidImage from "../../../assets/sectionPics/kids-section.jpg"
import collectionBlessedAngel from "../../../assets/collectionPics/blessed-angel.jpg"
import collectionFallenAngel from "../../../assets/collectionPics/fallen-angel.jpg"

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
            <section className={styles.collectionContainer}>
                <h1>Featured Collections</h1>
                <div className={styles.collections}>
                    <Collection collectionData={{name: "Blessed Angels", description: "The Chosen One"}} image={collectionBlessedAngel} />
                    <Collection collectionData={{name: "Fallen Angels", description: "Me Against The World"} } image={collectionFallenAngel}/>
                </div>
            </section>
        </main>
    );
}