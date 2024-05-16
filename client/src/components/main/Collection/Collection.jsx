import styles from "./collection.module.css"

export default function Collection ({collectionData, image}){
                            
    return(
        <div className={styles.card}>
            
            {/* <div className={styles.image} style={{backgroundImage: `url(${image})`}}>
                <p>{collectionData.description}</p>
            </div> */}
            <div className={styles.imageContainer} style={{backgroundImage: `url(${image})`}}>
                <div className={styles.gradient}>
                </div>
                <h1 className={styles.collectionName}>{collectionData.name}</h1>
            </div>
                <div className={styles.info}>
                    <h1>Blessed</h1>
                    <div className={styles.desc}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, officiis quibusdam? Itaque hic quia voluptates, dolore quas reprehenderit dolor! Ratione laborum voluptate, quibusdam ipsam illum aut quod aperiam. Fuga repellat nemo dolorem! Dignissimos blanditiis necessitatibus quisquam, mollitia expedita reiciendis, id quas vel eligendi ipsa porro quis placeat quod, animi nulla sed! Impedit quis deserunt et eaque laboriosam aut ipsum, nobis autem veniam placeat ducimus molestiae, modi ea eveniet facilis nulla exercitationem? Assumenda odio, odit obcaecati magnam modi ipsa consequuntur itaque ad fuga est fugit commodi molestias eaque dicta porro repudiandae necessitatibus quisquam. Iste ipsum nobis nihil quidem a vero minima.
                    </div>
                   
                </div>
           
        </div>
    );
}