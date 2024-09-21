import React, { useState } from 'react';
import styles from './adminPanel.module.css';
import * as request from '../../../lib/request';

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
    const [trending, setTrending] = useState("false");
    const [description, setDescription] = useState('');
    const [sizes, setSizes] = useState([]);
    const [images, setImages] = useState({
        image1: '',
        image2: '',
        image3: '',
        image4: '',
    }); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isTrending;
        if(trending === "true") {
            isTrending = true;
        }else{
            isTrending = false;
        }

        setProductName(productName.trim());
        setProductModel(productModel.trim());
    
        const colorsArray = colors
            .split(',')
            .map((color) => color.trim())
            .filter((color) => color !== '');
    
        const imagesArray = Object.values(images).filter((url) => url !== '');
    
        
        if (!gender) {
            alert('Please select a gender');
            return;
        }
    
        if (!age) {
            alert('Please select an age group');
            return;
        }
    
       
        if (sizes.length === 0) {
            alert('Please select at least one size');
            return;
        }
    
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
            description,
            imageUrl: imagesArray[0],
            images: imagesArray, 
            trending: isTrending,
        };
        const server = import.meta.env.VITE_BACKEND_URL;
        try {
            const data = await request.post(`${server}products/create`, product);
            console.log(data.message)
            alert(data.message);
        } catch (err) {
            console.log("error", err);
        }
        
    };
    

    const resetForm = () => {
        setProductName('');
        setProductModel('');
        setIsNew(false);
        setIsOnSale(false);
        setOldPrice('');
        setNewPrice('');
        setColors('');
        setGender('');
        setAge('');
        setDescription('');
        setSizes([]);
        setImages({
            image1: '',
            image2: '',
            image3: '',
            image4: '',
        });
    };

    const toggleSize = (size) => {
        setSizes((prevSizes) =>
            prevSizes.includes(size)
                ? prevSizes.filter((s) => s !== size)
                : [...prevSizes, size]
        );
    };

    const availableSizes = Array.from({ length: 31 }, (_, i) => i + 19);

    const handleImageChange = (e) => {
        const { name, value } = e.target;
        setImages((prevImages) => ({ ...prevImages, [name]: value }));
    };

    return (
        <div className={styles['adminPanel-container']}>
            <h1 className={styles['adminPanel-header']}>Admin Panel</h1>
            <form className={styles['adminPanel-form']} onSubmit={handleSubmit}>
                <div className={styles['adminPanel-formGroup']}>
                    <label className={styles['adminPanel-formGroup-label']}>Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className={styles['adminPanel-formGroup-input']}
                        required
                    />
                </div>

                <div className={styles['adminPanel-formGroup']}>
                    <label className={styles['adminPanel-formGroup-label']}>Product Model:</label>
                    <input
                        type="text"
                        value={productModel}
                        onChange={(e) => setProductModel(e.target.value)}
                        className={styles['adminPanel-formGroup-input']}
                        required
                    />
                </div>

                <div className={styles['adminPanel-formGroup']}>
                    <label className={styles['adminPanel-formGroup-label']}>Image 1 URL:</label>
                    <input
                        type="url"
                        name="image1"
                        value={images.image1}
                        onChange={handleImageChange}
                        className={styles['adminPanel-formGroup-input']}
                        required
                    />
                </div>

                <div className={styles['adminPanel-formGroup']}>
                    <label className={styles['adminPanel-formGroup-label']}>Image 2 URL:</label>
                    <input
                        type="url"
                        name="image2"
                        value={images.image2}
                        onChange={handleImageChange}
                        className={styles['adminPanel-formGroup-input']}
                        required
                    />
                </div>

                <div className={styles['adminPanel-formGroup']}>
                    <label className={styles['adminPanel-formGroup-label']}>Image 3 URL:</label>
                    <input
                        type="url"
                        name="image3"
                        value={images.image3}
                        onChange={handleImageChange}
                        className={styles['adminPanel-formGroup-input']}
                        required
                    />
                </div>

                <div className={styles['adminPanel-formGroup']}>
                    <label className={styles['adminPanel-formGroup-label']}>Image 4 URL:</label>
                    <input
                        type="url"
                        name="image4"
                        value={images.image4}
                        onChange={handleImageChange}
                        className={styles['adminPanel-formGroup-input']}
                        required
                    />
                </div>

                <div className={styles['adminPanel-formGroup']}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isNew}
                            onChange={() => setIsNew(!isNew)}
                            className={styles['adminPanel-checkbox']}
                        />
                        Is New
                    </label>
                </div>

                <div className={styles['adminPanel-formGroup']}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isOnSale}
                            onChange={() => setIsOnSale(!isOnSale)}
                            className={styles['adminPanel-checkbox']}
                        />
                        Is On Sale
                    </label>
                </div>

                {isOnSale && (
                    <div className={styles['adminPanel-formGroup']}>
                        <label className={styles['adminPanel-formGroup-label']}>Old Price:</label>
                        <input
                            type="number"
                            value={oldPrice}
                            onChange={(e) => setOldPrice(e.target.value)}
                            className={styles['adminPanel-formGroup-input']}
                            required={isOnSale}
                        />
                    </div>
                )}

                <div className={styles['adminPanel-formGroup']}>
                    <label className={styles['adminPanel-formGroup-label']}>New Price:</label>
                    <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className={styles['adminPanel-formGroup-input']}
                        required
                    />
                </div>

                <div className={styles['adminPanel-formGroup']}>
                    <label className={styles['adminPanel-formGroup-label']}>Colors (comma-separated):</label>
                    <input
                        type="text"
                        value={colors}
                        onChange={(e) => setColors(e.target.value)}
                        className={styles['adminPanel-formGroup-input']}
                        required
                    />
                </div>

                <div className={styles['adminPanel-formGroup-radio']}>
                    <label className={styles['adminPanel-formGroup-label']}>Gender:</label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                            onChange={(e) => setGender(e.target.value)}
                            className={styles['adminPanel-radio']}
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
                            className={styles['adminPanel-radio']}
                        />
                        Male
                    </label>
                </div>

                <div className={styles['adminPanel-formGroup-radio']}>
                    <label className={styles['adminPanel-formGroup-label']}>Age:</label>
                    <label>
                        <input
                            type="radio"
                            name="age"
                            value="adult"
                            checked={age === 'adult'}
                            onChange={(e) => setAge(e.target.value)}
                            className={styles['adminPanel-radio']}
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
                            className={styles['adminPanel-radio']}
                        />
                        Child
                    </label>
                </div>
                <div className={styles['adminPanel-formGroup-radio']}>
                    <label className={styles['adminPanel-formGroup-label']}>Trending:</label>
                    <label>
                        <input
                            type="radio"
                            name="trending"
                            value={"true"}
                            checked={trending === "true"}
                            onChange={(e) => setTrending(e.target.value)}
                            className={styles['adminPanel-radio']}
                        />
                        It's trending
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="trending"
                            value={"false"}
                            checked={trending === "false"}
                            onChange={(e) => setTrending(e.target.value)}
                            className={styles['adminPanel-radio']}
                        />
                        It's not trending
                    </label>
                </div>

                <div className={styles['adminPanel-formGroup']}>
                    <label className={styles['adminPanel-formGroup-label']}>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles['adminPanel-textarea']}
                        required
                    />
                </div>

                <div className={styles['adminPanel-formGroup']}>
                    <label className={styles['adminPanel-formGroup-label']}>Sizes:</label>
                    <div className={styles['adminPanel-sizesGrid']}>
                        {availableSizes.map((size) => (
                            <div
                                key={size}
                                className={`${styles['adminPanel-sizeBox']} ${
                                    sizes.includes(size) ? styles['adminPanel-selected'] : ''
                                }`}
                                onClick={() => toggleSize(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles['adminPanel-buttons']}>
                <button type="submit" className={styles['adminPanel-submitButton']}>Add Product</button>
                  <button
                      type="button"
                      onClick={resetForm}
                      className={styles['adminPanel-resetButton']}
                  >
                      Reset Form
                  </button>
                </div>
                
            </form>
        </div>
    );
}
