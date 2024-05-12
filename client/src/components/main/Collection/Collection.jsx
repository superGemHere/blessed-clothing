import styles from "./collection.module.css"

export default function Collection ({collectionData, image}){
                            
    return(
        <div className={styles.card}>
            <h1>{collectionData.name}</h1>
            {/* <div className={styles.image} style={{backgroundImage: `url(${image})`}}>
                <p>{collectionData.description}</p>
            </div> */}
            <div className={styles.imageContainer}>
                <div className={styles.gradient}></div>
                <img src={image} alt="collection image" className={styles.image}/>
            </div>
            <div className={styles.order}>
                <div className={styles.priceDiv}>
                </div>
                <p className={styles.orderBtn}>
                    See Collection
                </p>
            </div>
        </div>
    );
}