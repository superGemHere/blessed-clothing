import { useParams, useNavigate, useSearchParams } from "react-router-dom"; // Import hooks from React Router
import styles from "./products.module.css";
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import ManSection from "../../../assets/sectionPics/men-section.jpg";
import Product from "../Product/Product";
import { getPaginatedProducts } from "../../../api/productsApi";
import Pagination from "../Pagination/Pagination";

export default function Products() {
  const arrowDown = String.fromCodePoint(8595);
  const arrowUp = String.fromCodePoint(8593);

  const catId = parseInt(useParams().id);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); 

  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState("asc");
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [data, setData] = useState({ products: [], currentPage: 1, totalPages: 1 });

  // Get page and limit from query params or set default values
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10; 
  const [page, setPage] = useState(initialPage); 

  // Fetch products based on the current page and limit
  useEffect(() => {
    getPaginatedProducts(page, limit)
      .then(res => {
        setData(res); 
      })
      .catch(err => console.log(err));
  }, [page, limit]);

  const handlePageChange = (event, value) => {
    setPage(value); 
    navigate(`?page=${value}&limit=${limit}`);
  };

  // Toggle visibility of the left filters section
  const toggleLeftVisibility = () => {
    setIsLeftVisible(!isLeftVisible);
  };

  return (
    <div className={styles.products}>
      <div className={styles.filterBtn} onClick={toggleLeftVisibility}>
        <p>{isLeftVisible ? "Hide Filters" : "Show Filters"}</p>
        <IoFilter />
      </div>

      <div className={styles.content}>
        {/* Left Filters Section */}
        <div className={`${styles.left} ${isLeftVisible ? "" : styles.hidden}`}>
          <div className={styles.filterItem}>
            <h2>Product Categories</h2>
            {/* Add category filter checkboxes here */}
          </div>
          <div className={styles.filterItem}>
            <h2>Filter by price</h2>
            <div className={styles.inputItem}>
              <span>0</span>
              <input
                type="range"
                min={0}
                max={1000}
                defaultValue={1000}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <span>{maxPrice}</span>
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
                onChange={() => setSort("desc")}
              />
              <label htmlFor="desc">Price {arrowUp}(9-0)</label>
            </div>
            <div className={styles.inputItem}>
              <input
                type="radio"
                id="asc"
                value="asc"
                name="price"
                onChange={() => setSort("asc")}
              />
              <label htmlFor="asc">Price {arrowDown}(0-9)</label>
            </div>
          </div>
        </div>

        {/* Right Products Section */}
        <div className={styles.right}>
          <img className={styles.catImg} src={ManSection} alt="Section image" />
          {/* Pagination Component */}
          <Pagination
            shape="rounded"
            variant="outlined"
            page={page} 
            count={data.totalPages} 
            onChange={handlePageChange} 
            showFirstButton={true}
            showLastButton={true}
          />
          {/* Products Cards */}
          <div className={styles.cardsContainer}>
            {data?.products?.length && data.products.map((product) => (
              <Product key={product._id} data={product} />
            ))}
          </div>
          {/* Pagination Component */}
          <Pagination
            shape="rounded"
            variant="outlined"
            page={page} 
            count={data.totalPages} 
            onChange={handlePageChange} 
            showFirstButton={true}
            showLastButton={true}
          />
        </div>
      </div>
    </div>
  );
}
