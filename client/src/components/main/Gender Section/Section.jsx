import styles from "./section.module.css";

import { useNavigate } from "react-router-dom";

export default function section ({
    data,
    path
}){
    const navigate = useNavigate(); 
    // console.log(sectionImage)
    // console.log(sectionName)
    // `url(${(item.imageLinks)}`
                          
    return(
        <div className={styles.section} onClick={() => navigate(path)} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${data.sectionImage})`}}>
            <h1>{data.sectionName}</h1>	
        </div>
    );
}