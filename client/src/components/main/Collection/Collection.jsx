import styles from "./collection.module.css"

export default function Collection ({collectionData, image}){
                            
    return(
        <div className={styles.card}>
            
            {/* <div className={styles.image} style={{backgroundImage: `url(${image})`}}>
                <p>{collectionData.description}</p>
            </div> */}
            <div className={styles.imageContainer} style={{backgroundImage: `url(${image})`}}>
                <div className={styles.gradient}></div>
                {/* <img src={image} alt="collection image" className={styles.image}/> */}
                <h1 className={styles.collectionName}>{collectionData.name}</h1>
                <p className={styles.seeCollectionBtn}>
                    See Collection
                </p>
            </div>
            {/* <div className={styles.order}>
                <div className={styles.priceDiv}>
                </div>
            </div> */}
        </div>
    );
}