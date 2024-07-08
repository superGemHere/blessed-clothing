import { useParams } from "react-router-dom";


import styles from "./products.module.css"
import { useState } from "react";
import { IoFilter } from "react-icons/io5";
// import useFetch from "../../../hooks/useFetch";

import ManSection from "../../../assets/sectionPics/men-section.jpg"
import Product from "../Product/Product";

export default function Products(){

    const arrowDown = String.fromCodePoint(8595);
    const arrowUp = String.fromCodePoint(8593);

    const catId = parseInt(useParams().id);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [sort, setSort] = useState("asc");
    const [selectedSubCats, setSelectedSubCats] = useState([]);
    const [isLeftVisible, setIsLeftVisible] = useState(true);

    // const {data, loading, error} = useFetch(`/sub-categories?[filters][categories][id][$eq]=${catId}`);

    const handleChange = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        setSelectedSubCats(isChecked 
            ? [...selectedSubCats, value] 
            : selectedSubCats.filter(item => item !== value)
        )
        
    }

    const toggleLeftVisibility = () => {
        setIsLeftVisible(!isLeftVisible);
    }

    // console.log(selectedSubCats);
    

    return(
        <div className={styles.products}>
            <div className={styles.filterBtn} onClick={toggleLeftVisibility}>
                <p>{isLeftVisible ? "Hide Filters" : "Show Filters" }</p>
                <IoFilter />
            </div>
            <div className={styles.content}>
                <div className={`${styles.left} ${isLeftVisible ? '' : styles.hidden}`}>
                    <div className={styles.filterItem}>
                        <h2>Product Categories</h2>
                        {/* {data?.map(item => (
                                <div className={styles.inputItem} key={item.id} >
                                    <input type="checkbox" id={item.id} value={item.id} onChange={handleChange}/>
                                    <label htmlFor={item.id}>{item.attributes.title}</label>
                                </div>
                            )
                        )
                    } */}
                    </div>
                    <div className={styles.filterItem}>
                        <h2>Filter by price</h2>
                        <div className={styles.inputItem}>
                            <span>0</span>
                            <input type="range" min={0} max={1000} onChange={(e) => setMaxPrice(e.target.value)} />
                            <span>{maxPrice}</span>
                        </div>
                    </div>
                    <div className={styles.filterItem}>
                        <h2>Sort by</h2>
                        <div className={styles.inputItem}>
                            <input type="radio" id="desc" value="desc" name="price" onChange={e => setSort("desc")}/>
                            <label htmlFor="desc">Price {arrowUp}(9-0)</label>
                        </div>
                        <div className={styles.inputItem}>
                            <input type="radio" id="asc" value="asc" name="price" onChange={e => setSort("asc")}/>
                            <label htmlFor="asc">Price {arrowDown}(0-9)</label>
                        </div>
                    </div>
                </div>
                
                <div className={styles.right}>
                    <img className={styles.catImg} src={ManSection} alt="Section image" />
                    <div className={styles.cardsContainer}>
                        <Product />
                    </div>
                </div>
            </div>
           
        </div>
    );
}