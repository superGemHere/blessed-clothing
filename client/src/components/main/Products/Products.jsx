import { useParams } from "react-router-dom";

import styles from "./products.module.css";
import { useState } from "react";
import { IoFilter } from "react-icons/io5";
// import useFetch from "../../../hooks/useFetch";

import ManSection from "../../../assets/sectionPics/men-section.jpg";
import Product from "../Product/Product";

export default function Products() {
  const arrowDown = String.fromCodePoint(8595);
  const arrowUp = String.fromCodePoint(8593);

  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState("asc");
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [isLeftVisible, setIsLeftVisible] = useState(true);

  const data1 = {
    id: 1,
    isOnSale: true,
    isNew: true,
    productName: "Puma",
    imageUrl:
      "https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/sportni-obuvki-puma-voltaic-evo-379601-02-1.jpg",
    productModel: "Voltaic Evo",
    oldPrice: 189.99,
    price: 151.99,
    colors: ["red", "black", "green"],
    sizes: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49]
  };

  const data2 = {
    id: 2,
    isOnSale: true,
    isNew: false,
    productName: "Guess",
    imageUrl:
      "https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/sportni-obuvki-guess-nowah-fltnowele12-blkpl-1.jpg",
    productModel: "Nowah",
    oldPrice: 143.99,
    price: 99,
    colors: ["red", "gray", "black"],
    sizes: [37, 38, 39, 40, 41, 42, 43]
  };
  const data3 = {
    id: 3,
    isOnSale: false,
    isNew: true,
    productName: "Nike",
    imageUrl:
      "https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/maratonki-nike-air-max-excee-dz0795-102-1.jpg",
    productModel: "Air Max Excee",
    oldPrice: 189.99,
    price: 200,
    colors: ["red", "blue", "lightblue"],
    sizes: [46, 47, 48, 49]
  };
  const data4 = {
    id: 4,
    isOnSale: true,
    isNew: false,
    productName: "Nike",
    imageUrl:
      "https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/maratonki-nike-revolution-7-fb2207-102-1.jpg",
    productModel: "Revolution 7",
    oldPrice: 129.99,
    price: 112.99,
    colors: ["red", "blue", "lightblue"],
    sizes: [40, 41, 42, 43]
  };
  const data5 = {
    id: 5,
    isOnSale: false,
    isNew: true,
    productName: "Adidas",
    imageUrl:
      "https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/sportni-obuvki-adidas-terrex-ax4-if4867-1.jpg",
    productModel: "Terrex AX4",
    oldPrice: 239.99,
    price: 199.99,
    colors: ["red", "blue", "lightblue"],
    sizes: [40, 41, 42, 43]
  };
  const data6 = {
    id: 6,
    isOnSale: false,
    isNew: true,
    productName: "Nike",
    imageUrl:
      "https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/kecove-nike-air-flight-lite-mid-dj2518-102-1.jpg",
    productModel: "Air Flight Lite Mid",
    oldPrice: 269.99,
    price: 225.99,
    colors: ["red", "blue", "lightblue"],
    sizes: [40, 41, 42, 43]
  };
  const data7 = {
    id: 7,
    isOnSale: true,
    isNew: false,
    productName: "Puma",
    imageUrl:
      "https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/maratonki-puma-pacer-23-desert-road-107783-01-1.jpg",
    productModel: "Pacer 23 Desert Road",
    oldPrice: 169.99,
    price: 139.99,
    colors: ["red", "blue", "lightblue"],
    sizes: [40, 41, 42, 43]
  };

  const products = [data1, data2, data3, data4, data5, data6, data7];
  // const {data, loading, error} = useFetch(`/sub-categories?[filters][categories][id][$eq]=${catId}`);

  const handleChange = e => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter(item => item !== value)
    );
  };

  const toggleLeftVisibility = () => {
    setIsLeftVisible(!isLeftVisible);
  };

  // console.log(selectedSubCats);

  return (
    <div className={styles.products}>
      <div className={styles.filterBtn} onClick={toggleLeftVisibility}>
        <p>
          {isLeftVisible ? "Hide Filters" : "Show Filters"}
        </p>
        <IoFilter />
      </div>
      <div className={styles.content}>
        <div className={`${styles.left} ${isLeftVisible ? "" : styles.hidden}`}>
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
              <input
                type="range"
                min={0}
                max={1000}
                onChange={e => setMaxPrice(e.target.value)}
              />
              <span>
                {maxPrice}
              </span>
            </div>
          </div>
          <div className={styles.filterItem}>
            <h2>Sort by</h2>
            <div className={styles.inputItem}>
              <input
                type="radio"
                id="desc"
                value="desc"
                name="price"
                onChange={e => setSort("desc")}
              />
              <label htmlFor="desc">
                Price {arrowUp}(9-0)
              </label>
            </div>
            <div className={styles.inputItem}>
              <input
                type="radio"
                id="asc"
                value="asc"
                name="price"
                onChange={e => setSort("asc")}
              />
              <label htmlFor="asc">
                Price {arrowDown}(0-9)
              </label>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <img className={styles.catImg} src={ManSection} alt="Section image" />
          <div className={styles.cardsContainer}>
            {products.map(product =>
              <Product key={product.id} data={product} />
            )}
            {products.map(product =>
              <Product key={product.id} data={product} />
            )}
            {products.map(product =>
              <Product key={product.id} data={product} />
            )}
            {products.map(product =>
              <Product key={product.id} data={product} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
