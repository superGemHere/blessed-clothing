import React, { useState } from 'react';
import styles from './adminPanel.module.css';

export default function AdminPanel() {
    const [productName, setProductName] = useState('');
    const [productModel, setProductModel] = useState('');
    const [isNew, setIsNew] = useState(false);
    const [isOnSale, setIsOnSale] = useState(false);
    const [oldPrice, setOldPrice] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [colors, setColors] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [sizes, setSizes] = useState([]); 

    const handleSubmit = (e) => {
        e.preventDefault();

        const colorsArray = colors
            .split(',')
            .map(color => color.trim()) 
            .filter(color => color !== ''); 

        const product = {
            productName,
            productModel,
            isNew,
            isOnSale,
            oldPrice: isOnSale ? oldPrice : null,
            newPrice,
            colors: colorsArray, 
            sizes, 
            gender,
            age,
            description,
        };

        

        console.log(product);

        // Here, you'd typically send the `product` object to the database
        // Example:
        // fetch('/api/products', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(product),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
    };

    const toggleSize = (size) => {
        setSizes((prevSizes) =>
            prevSizes.includes(size)
                ? prevSizes.filter((s) => s !== size) // Remove size if it's already selected
                : [...prevSizes, size] // Add size if it's not selected
        );
    };

    const availableSizes = Array.from({ length: 31 }, (_, i) => i + 19);

    return (
        <div className={styles.container}>
            <h1>Admin Panel</h1>
            <form className={styles.addProduct} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Product Model:</label>
                    <input
                        type="text"
                        value={productModel}
                        onChange={(e) => setProductModel(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isNew}
                            onChange={() => setIsNew(!isNew)}
                        />
                        Is New
                    </label>
                </div>

                <div className={styles.formGroup}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isOnSale}
                            onChange={() => setIsOnSale(!isOnSale)}
                        />
                        Is On Sale
                    </label>
                </div>

                {isOnSale && (
                    <div className={styles.formGroup}>
                        <label>Old Price:</label>
                        <input
                            type="number"
                            value={oldPrice}
                            onChange={(e) => setOldPrice(e.target.value)}
                            required={isOnSale}
                        />
                    </div>
                )}

                <div className={styles.formGroup}>
                    <label>New Price:</label>
                    <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Colors (comma-separated):</label>
                    <input
                        type="text"
                        value={colors}
                        onChange={(e) => setColors(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Gender:</label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Female
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === 'male'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Male
                    </label>
                </div>

                <div className={styles.formGroup}>
                    <label>Age:</label>
                    <label>
                        <input
                            type="radio"
                            name="age"
                            value="adult"
                            checked={age === 'adult'}
                            onChange={(e) => setAge(e.target.value)}
                        />
                        Adult
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="age"
                            value="child"
                            checked={age === 'child'}
                            onChange={(e) => setAge(e.target.value)}
                        />
                        Child
                    </label>
                </div>

                <div className={styles.formGroup}>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Sizes:</label>
                    <div className={styles.sizesGrid}>
                        {availableSizes.map((size) => (
                            <div
                                key={size}
                                className={`${styles.sizeBox} ${
                                    sizes.includes(size) ? styles.selected : ''
                                }`}
                                onClick={() => toggleSize(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}
