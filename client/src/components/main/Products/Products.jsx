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

  // Initialize state from URL parameters or set default values
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const initialLimit = parseInt(searchParams.get("limit")) || 10;
  const initialSort = searchParams.get("sort") || "asc";
  const initialMaxPrice = parseInt(searchParams.get("maxPrice")) || 1000;
  const initialGender = searchParams.get("gender") || "";
  const initialAge = searchParams.get("age") || "";
  const initialTrending = searchParams.get("trending") === "true";
  const initialSale = searchParams.get("sale") === "true";

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [sort, setSort] = useState(initialSort);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [gender, setGender] = useState(initialGender);
  const [age, setAge] = useState(initialAge);
  const [trending, setTrending] = useState(initialTrending);
  const [sale, setSale] = useState(initialSale);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [data, setData] = useState({ products: [], currentPage: 1, totalPages: 1 });

  // Local state for filters
  const [tempSort, setTempSort] = useState(initialSort);
  const [tempMaxPrice, setTempMaxPrice] = useState(initialMaxPrice);
  const [tempGender, setTempGender] = useState(initialGender);
  const [tempAge, setTempAge] = useState(initialAge);
  const [tempTrending, setTempTrending] = useState(initialTrending);
  const [tempSale, setTempSale] = useState(initialSale);

  // Fetch products based on the current filters
  useEffect(() => {
    getPaginatedProducts(page, limit, sort, maxPrice, gender, age, trending, sale)
      .then(res => {
        setData(res); 
      })
      .catch(err => console.log(err));
  }, [page, limit, sort, maxPrice, gender, age, trending, sale]);

  const handlePageChange = (event, value) => {
    setPage(value);
    updateURL(value, limit, sort, maxPrice, gender, age, trending, sale);
  };

  const handleSortChange = (newSort) => {
    setTempSort(newSort);
  };

  const handleMaxPriceChange = (newMaxPrice) => {
    setTempMaxPrice(newMaxPrice);
  };

  const handleGenderChange = (newGender) => {
    setTempGender(newGender);
  };

  const handleAgeChange = (newAge) => {
    setTempAge(newAge);
  };

  const handleTrendingChange = () => {
    setTempTrending(!tempTrending);
  };

  const handleSaleChange = () => {
    setTempSale(!tempSale);
  };

  const clearFilters = () => {
    setTempSort("asc");
    setTempMaxPrice(1000);
    setTempGender("");
    setTempAge("");
    setTempTrending(false);
    setTempSale(false);
    setSort("asc");
    setMaxPrice(1000);
    setGender("");
    setAge("");
    setTrending(false);
    setSale(false);
    updateURL(1, limit, "asc", 1000, "", "", false, false);
  };

  const applyFilters = () => {
    setSort(tempSort);
    setMaxPrice(tempMaxPrice);
    setGender(tempGender);
    setAge(tempAge);
    setTrending(tempTrending);
    setSale(tempSale);
    updateURL(page, limit, tempSort, tempMaxPrice, tempGender, tempAge, tempTrending, tempSale);
  };

  const updateURL = (page, limit, sort, maxPrice, gender, age, trending, sale) => {
    navigate(`?page=${page}&limit=${limit}&sort=${sort}&maxPrice=${maxPrice}&gender=${gender}&age=${age}&trending=${trending}&sale=${sale}`);
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
            <h1>Filters</h1>
            <hr style={{marginBottom: "20px"}}/>
            <div className={styles.filterItem}>
            <h2>Gender</h2>
            <div className={styles.inputItem}>
              <input
                type="radio"
                id="male"
                value="male"
                name="gender"
                checked={tempGender === "male"}
                onChange={(e) => handleGenderChange(e.target.value)}
              />
              <label htmlFor="male">Men</label>
            </div>
            <div className={styles.inputItem}>
              <input
                type="radio"
                id="female"
                value="female"
                name="gender"
                checked={tempGender === "female"}
                onChange={(e) => handleGenderChange(e.target.value)}
              />
              <label htmlFor="female">Women</label>
            </div>
          </div>
          <div className={styles.filterItem}>
            <h2>Age</h2>
            <div className={styles.inputItem}>
              <input
                type="radio"
                id="adult"
                value="adult"
                name="age"
                checked={tempAge === "adult"}
                onChange={(e) => handleAgeChange(e.target.value)}
              />
              <label htmlFor="adult">Adult</label>
            </div>
            <div className={styles.inputItem}>
              <input
                type="radio"
                id="child"
                value="child"
                name="age"
                checked={tempAge === "child"}
                onChange={(e) => handleAgeChange(e.target.value)}
              />
              <label htmlFor="child">Child</label>
            </div>
          </div>
          </div>
          <div className={styles.filterItem}>
              <h2>Trending</h2>
              <div className={styles.inputItem}>
                <input
                  type="checkbox"
                  id="trending"
                  checked={tempTrending}
                  onChange={handleTrendingChange}
                />
                <label htmlFor="trending">Trending</label>
              </div>
            </div>
            <div className={styles.filterItem}>
              <h2>Sale</h2>
              <div className={styles.inputItem}>
                <input
                  type="checkbox"
                  id="sale"
                  checked={tempSale}
                  onChange={handleSaleChange}
                />
                <label htmlFor="sale">Sale</label>
              </div>
            </div>
          <div className={styles.filterItem}>
            <h2>Filter by price</h2>
            <div className={styles.inputItem}>
              <span>0</span>
              <input
                type="range"
                min={0}
                max={1000}
                defaultValue={initialMaxPrice}
                onChange={(e) => handleMaxPriceChange(e.target.value)}
              />
              <span>{tempMaxPrice}</span>
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
                checked={tempSort === "desc"}
                onChange={(e) => handleSortChange(e.target.value)}
              />
              <label htmlFor="desc">Price {arrowUp}(9-0)</label>
            </div>
            <div className={styles.inputItem}>
              <input
                type="radio"
                id="asc"
                value="asc"
                name="price"
                checked={tempSort === "asc"}
                onChange={(e) => handleSortChange(e.target.value)}
              />
              <label htmlFor="asc">Price {arrowDown}(0-9)</label>
            </div>
          </div>
          <button className={styles.applyFiltersBtn} onClick={applyFilters}>
            Apply
          </button>
          <button className={styles.clearFiltersBtn} onClick={clearFilters}>
            Clear
          </button>
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