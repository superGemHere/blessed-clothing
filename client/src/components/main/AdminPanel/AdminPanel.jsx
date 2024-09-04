import React, { useState } from "react";
import styles from "./adminPanel.module.css";

export default function AdminPanel() {
  const [productName, setProductName] = useState("");
  const [productModel, setProductModel] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [isOnSale, setIsOnSale] = useState(false);
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [colors, setColors] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();

    const colorsArray = colors
      .split(",")
      .map(color => color.trim())
      .filter(color => color !== "");

    const product = {
      productName,
      productModel,
      isNewProduct: isNew,
      isOnSale,
      oldPrice: isOnSale ? oldPrice : null,
      newPrice,
      colors: colorsArray,
      sizes,
      gender,
      age,
      description
    };

    console.log(product);

    // Here, you'd typically send the `product` object to the database
  };

  const toggleSize = size => {
    setSizes(
      prevSizes =>
        prevSizes.includes(size)
          ? prevSizes.filter(s => s !== size)
          : [...prevSizes, size]
    );
  };

  const availableSizes = Array.from({ length: 31 }, (_, i) => i + 19);

  return (
    <div className={styles["adminPanel-container"]}>
      <h1 className={styles["adminPanel-header"]}>Admin Panel</h1>
      <form className={styles["adminPanel-form"]} onSubmit={handleSubmit}>
        <div className={styles["adminPanel-formGroup"]}>
          <label className={styles["adminPanel-formGroup-label"]}>
            Product Name:
          </label>
          <input
            type="text"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            className={styles["adminPanel-formGroup-input"]}
            required
          />
        </div>

        <div className={styles["adminPanel-formGroup"]}>
          <label className={styles["adminPanel-formGroup-label"]}>
            Product Model:
          </label>
          <input
            type="text"
            value={productModel}
            onChange={e => setProductModel(e.target.value)}
            className={styles["adminPanel-formGroup-input"]}
            required
          />
        </div>

        <div className={styles["adminPanel-formGroup"]}>
          <label>
            <input
              type="checkbox"
              checked={isNew}
              onChange={() => setIsNew(!isNew)}
              className={styles["adminPanel-checkbox"]}
            />
            Is New
          </label>
        </div>

        <div className={styles["adminPanel-formGroup"]}>
          <label>
            <input
              type="checkbox"
              checked={isOnSale}
              onChange={() => setIsOnSale(!isOnSale)}
              className={styles["adminPanel-checkbox"]}
            />
            Is On Sale
          </label>
        </div>

        {isOnSale &&
          <div className={styles["adminPanel-formGroup"]}>
            <label className={styles["adminPanel-formGroup-label"]}>
              Old Price:
            </label>
            <input
              type="number"
              value={oldPrice}
              onChange={e => setOldPrice(e.target.value)}
              className={styles["adminPanel-formGroup-input"]}
              required={isOnSale}
            />
          </div>}

        <div className={styles["adminPanel-formGroup"]}>
          <label className={styles["adminPanel-formGroup-label"]}>
            New Price:
          </label>
          <input
            type="number"
            value={newPrice}
            onChange={e => setNewPrice(e.target.value)}
            className={styles["adminPanel-formGroup-input"]}
            required
          />
        </div>

        <div className={styles["adminPanel-formGroup"]}>
          <label className={styles["adminPanel-formGroup-label"]}>
            Colors (comma-separated):
          </label>
          <input
            type="text"
            value={colors}
            onChange={e => setColors(e.target.value)}
            className={styles["adminPanel-formGroup-input"]}
            required
          />
        </div>

        <div className={styles["adminPanel-formGroup"]}>
          <label className={styles["adminPanel-formGroup-label"]}>
            Gender:
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={e => setGender(e.target.value)}
              className={styles["adminPanel-radio"]}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={e => setGender(e.target.value)}
              className={styles["adminPanel-radio"]}
            />
            Male
          </label>
        </div>

        <div className={styles["adminPanel-formGroup"]}>
          <label className={styles["adminPanel-formGroup-label"]}>Age:</label>
          <label>
            <input
              type="radio"
              name="age"
              value="adult"
              checked={age === "adult"}
              onChange={e => setAge(e.target.value)}
              className={styles["adminPanel-radio"]}
            />
            Adult
          </label>
          <label>
            <input
              type="radio"
              name="age"
              value="child"
              checked={age === "child"}
              onChange={e => setAge(e.target.value)}
              className={styles["adminPanel-radio"]}
            />
            Child
          </label>
        </div>

        <div className={styles["adminPanel-formGroup"]}>
          <label className={styles["adminPanel-formGroup-label"]}>
            Description:
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className={styles["adminPanel-textarea"]}
            required
          />
        </div>
        <div className={styles["adminPanel-formGroup"]}>
          <label className={styles["adminPanel-formGroup-label"]}>Sizes:</label>
          <div className={styles["adminPanel-sizesGrid"]}>
            {availableSizes.map(size =>
              <div
                key={size}
                className={`${styles["adminPanel-sizeBox"]} ${sizes.includes(
                  size
                )
                  ? styles["adminPanel-selected"]
                  : ""}`}
                onClick={() => toggleSize(size)}
              >
                {size}
              </div>
            )}
          </div>
        </div>

        <button type="submit" className={styles["adminPanel-submitButton"]}>
          Add Product
        </button>
      </form>
    </div>
  );
}
