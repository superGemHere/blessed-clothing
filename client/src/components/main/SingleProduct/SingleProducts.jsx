import styles from './singleProduct.module.css'

import { useState } from 'react';
import Select from 'react-select';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


export default function SingleProduct (){
    const [isDisabled, seIsDisabled] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const data1 = {
        id: 1,
        isOnSale: true,
        isNew: true,
        productName: 'Kappa',
        imageUrl: "https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/kecove-kappa-logo-maserta-32193cw-a2c-1.jpg",
        images : ["https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/kecove-kappa-logo-maserta-32193cw-a2c-1.jpg", "https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/kecove-kappa-logo-maserta-32193cw-a2c-2.jpg", "https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/kecove-kappa-logo-maserta-32193cw-a2c-3.jpg", "https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/kecove-kappa-logo-maserta-32193cw-a2c-4.jpg"],
        productModel: 'Logo Maserta',
        oldPrice: 84.99,
        price: 47.99,
        colors: ['red', 'black', 'green'],
        sizes: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    }
    const options = data1.sizes.map(size => ({ value: size, label : ` № ${size} EU ` }))
    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          backgroundColor: 'white',
          fontFamily: 'sans-serif',
          borderColor: state.isFocused ? 'blue' : 'grey',
          boxShadow: state.isFocused ? '0 0 0 1px blue' : null,
          '&:hover': {
            borderColor: state.isFocused ? 'blue' : 'grey',
          },
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? 'blue' : state.isFocused ? 'lightgrey' : null,
          color: state.isSelected ? 'white' : 'black',
          '&:hover': {
            backgroundColor: state.isSelected ? 'blue' : 'lightgrey',
            color: 'black',
        },
        fontFamily: 'sans-serif',
        }),
        menu: (provided) => ({
          ...provided,
          marginTop: '0',
          fontFamily: 'sans-serif',
        }),
        singleValue: (provided) => ({
            ...provided,
            fontFamily: 'sans-serif',
            textAlign: 'center'
        }),
        placeholder: (provided) => ({
          ...provided,
          color: 'grey',
          fontFamily: 'sans-serif',
          textAlign: 'center'
        }),
      };

      const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
      };
    return(
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imageContainer}>
                    <div className={styles.upperRow}>
                        <div className={styles.imageWrapper}>
                            <img src={data1.images[0]} alt="Product image" className={styles.image} />
                        </div>
                        <div className={styles.imageWrapper}>
                            <img src={data1.images[1]} alt="Product image" className={styles.image} />
                        </div>
                    </div>
                    <div className={styles.bottomRow}>
                    <div className={styles.imageWrapper}>
                            <img src={data1.images[2]} alt="Product image" className={styles.image} />
                        </div>
                        <div className={styles.imageWrapper}>
                            <img src={data1.images[3]} alt="Product image" className={styles.image} />
                        </div>
                    </div>
                
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.infoContainer}>
                    <div className={styles.aboutProduct}>
                        <div className={styles.productCredentials}>
                            <div className={styles.productNameDiv}>
                            <p className={styles.productName}>{data1.productName}</p>
                            <p className={styles.productModel}>{data1.productModel}</p>
                            </div>
                            <div className={styles.logoWrapper}>
                                <img src="https://i.pinimg.com/originals/b4/75/8a/b4758a1a7917b8bd63639ca6797feddc.png" alt="Brand Logo" className={styles.brandLogo} />
                            </div>
                        </div>
                        <div className={styles.priceDiv}>
                            <div className={styles.prices}>
                            <p className={styles.price} style={{ color: data1.isOnSale ? 'red' : 'black' }}>${data1.price}</p>
                            <p className={styles.oldPrice}>{ data1.isOnSale ? `$${data1.oldPrice}` : null }</p>
                            </div>
                            <p className={styles.priceDiff}>You are saving ${(data1.oldPrice - data1.price).toFixed(2)}</p>
                        </div>

                    </div>
                </div>
                <div className={styles.productActions}>
                    {/* <select className={styles.select} onChange={() => seIsDisabled(true)}>
                        <option className={styles.option} value="" disabled={isDisabled} defaultValue={true}>Select your size</option>
                        {data1.sizes.map(size => (
                            <option key={size} className={styles.option} value={size}> &#8470; {size} EU</option>
                        ))}
                    </select> */}
                    <Select placeholder={"Choose a size.."} styles={customStyles} options={options} value={selectedOption} onChange={handleSelectChange} />
                    <button className={styles.addToCartBtn}>
                            <AddShoppingCartIcon className={styles.addToCartIcon}/> Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}