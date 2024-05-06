import styles from "./section.module.css";

export default function section ({
    data
}){
    // console.log(sectionImage)
    // console.log(sectionName)
    // `url(${(item.imageLinks)}`
                          
    return(
        <div className={styles.section} style={{backgroundImage: `url(${data.sectionImage})`}}>
            <h1>{data.sectionName}</h1>	
        </div>
    );
}