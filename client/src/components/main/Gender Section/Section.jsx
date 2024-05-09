import styles from "./section.module.css";

export default function section ({
    data
}){
    // console.log(sectionImage)
    // console.log(sectionName)
    // `url(${(item.imageLinks)}`
                          
    return(
        <div className={styles.section} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${data.sectionImage})`}}>
            <h1>{data.sectionName}</h1>	
        </div>
    );
}