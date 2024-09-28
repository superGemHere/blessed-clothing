import { useParams, useNavigate, useSearchParams } from "react-router-dom"; // Import hooks from React Router
import styles from "./products.module.css";
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import ManSection from "../../../assets/sectionPics/men-section.jpg";
import Product from "../Product/Product";
import { getPaginatedProducts } from "../../../api/productsApi";
import Pagination from "../Pagination/Pagination";
import ScaleLoader from "../../Widgets/Spinner";

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
  const initialSizes = searchParams.get("sizes") ? searchParams.get("sizes").split(",").map(Number) : [];

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [sort, setSort] = useState(initialSort);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [gender, setGender] = useState(initialGender);
  const [age, setAge] = useState(initialAge);
  const [trending, setTrending] = useState(initialTrending);
  const [sale, setSale] = useState(initialSale);
  const [sizes, setSizes] = useState(initialSizes);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isSizeDropdownVisible, setIsSizeDropdownVisible] = useState(false);
  const [data, setData] = useState({ products: [], currentPage: 1, totalPages: 1 });

  // Local state for filters
  const [tempSort, setTempSort] = useState(initialSort);
  const [tempMaxPrice, setTempMaxPrice] = useState(initialMaxPrice);
  const [tempGender, setTempGender] = useState(initialGender);
  const [tempAge, setTempAge] = useState(initialAge);
  const [tempTrending, setTempTrending] = useState(initialTrending);
  const [tempSale, setTempSale] = useState(initialSale);
  const [tempSizes, setTempSizes] = useState(initialSizes);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products based on the current filters
  useEffect(() => {
    const newPage = parseInt(searchParams.get("page")) || 1;
    const newLimit = parseInt(searchParams.get("limit")) || 10;
    const newSort = searchParams.get("sort") || "asc";
    const newMaxPrice = parseInt(searchParams.get("maxPrice")) || 1000;
    const newGender = searchParams.get("gender") || "";
    const newAge = searchParams.get("age") || "";
    const newTrending = searchParams.get("trending") === "true";
    const newSale = searchParams.get("sale") === "true";
    const newSizes = searchParams.get("sizes") ? searchParams.get("sizes").split(",").map(Number) : [];

    setPage(newPage);
    setLimit(newLimit);
    setSort(newSort);
    setMaxPrice(newMaxPrice);
    setGender(newGender);
    setAge(newAge);
    setTrending(newTrending);
    setSale(newSale);
    setSizes(newSizes);
  }, [searchParams]);

  // Fetch products whenever the state changes
  useEffect(() => {
    setIsLoading(true);
    getPaginatedProducts(page, limit, sort, maxPrice, gender, age, trending, sale, sizes)
      .then(res => {
        setData(res);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }, [page, limit, sort, maxPrice, gender, age, trending, sale, sizes]);

  const handlePageChange = (event, value) => {
    setPage(value);
    updateURL(value, limit, sort, maxPrice, gender, age, trending, sale, sizes);
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

  const handleSizeChange = (size) => {
    if (tempSizes.includes(size)) {
      setTempSizes(tempSizes.filter(s => s !== size));
    } else {
      setTempSizes([...tempSizes, size]);
    }
  };

  const clearFilters = () => {
    setTempSort("asc");
    setTempMaxPrice(1000);
    setTempGender("");
    setTempAge("");
    setTempTrending(false);
    setTempSale(false);
    setTempSizes([]);
    setSort("asc");
    setMaxPrice(1000);
    setGender("");
    setAge("");
    setTrending(false);
    setSale(false);
    setSizes([]);
    updateURL(1, limit, "asc", 1000, "", "", false, false, []);
  };

  const applyFilters = () => {
    setPage(1);
    setSort(tempSort);
    setMaxPrice(tempMaxPrice);
    setGender(tempGender);
    setAge(tempAge);
    setTrending(tempTrending);
    setSale(tempSale);
    setSizes(tempSizes);
    updateURL(1, limit, tempSort, tempMaxPrice, tempGender, tempAge, tempTrending, tempSale, tempSizes);
  };

  const updateURL = (page, limit, sort, maxPrice, gender, age, trending, sale, sizes) => {
    navigate(`?page=${page}&limit=${limit}&sort=${sort}&maxPrice=${maxPrice}&gender=${gender}&age=${age}&trending=${trending}&sale=${sale}&sizes=${sizes.join(",")}`);
  };

  // Toggle visibility of the left filters section
  const toggleLeftVisibility = () => {
    setIsLeftVisible(!isLeftVisible);
  };

  // Toggle visibility of the size dropdown
  const toggleSizeDropdownVisibility = () => {
    setIsSizeDropdownVisible(!isSizeDropdownVisible);
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
            <h1>Categories</h1>
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
          </div>
          <div className={styles.filterItem}>
            <h1>Other</h1>
            <hr style={{marginBottom: "20px"}}/>
          <div className={styles.filterItem}>
            <h2>Price range</h2>
            <div className={styles.inputItem}>
              <input
                type="range"
                className={styles.priceRangeSlider}
                min={0}
                max={1000}
                defaultValue={initialMaxPrice}
                onChange={(e) => handleMaxPriceChange(e.target.value)}
                />
              <div className={styles.priceRangeLabels}>
                <span>$ 0</span>
                <span>$ {tempMaxPrice}</span>
              </div>
            </div>
          </div>
          <div className={styles.filterItem}>
            <h2>Sort</h2>
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
            <div className={styles.filterItem}>
            <h2>Size</h2>
            <div className={styles.dropdown}>
              <button className={styles.dropdownBtn} onClick={toggleSizeDropdownVisibility}>
                {isSizeDropdownVisible ? "Hide Sizes" : "Show Sizes"}
              </button>
              {isSizeDropdownVisible && (
                <div className={styles.dropdownContent}>
                  {[...Array(31).keys()].map(i => {
                    const size = i + 19;
                    return (
                      <div key={size} className={styles.inputItem}>
                        <input
                          type="checkbox"
                          id={`size-${size}`}
                          value={size}
                          checked={tempSizes.includes(size)}
                          onChange={() => handleSizeChange(size)}
                        />
                        <label htmlFor={`size-${size}`}>{size}</label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          </div>
          </div>
          <div className={styles.filterBtns}>
            <button className={styles.applyFiltersBtn} onClick={applyFilters}>
              Apply
            </button>
            <button className={styles.clearFiltersBtn} onClick={clearFilters}>
              Clear
            </button>
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
            {isLoading ? <ScaleLoader /> : data?.products?.length && data.products.map((product) => (
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