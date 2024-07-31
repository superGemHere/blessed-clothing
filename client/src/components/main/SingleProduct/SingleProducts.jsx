import styles from './singleProduct.module.css';
import { useState } from 'react';
import Select from 'react-select';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined';


import Accordion from '../Accordion/Accordion';
import ImageModal from '../ImageModal/ImageModal';

export default function SingleProduct() {
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const data1 = {
        id: 1,
        isOnSale: true,
        isNew: true,
        productName: 'Kappa',
        imageUrl: "https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/kecove-kappa-logo-maserta-32193cw-a2c-1.jpg",
        images: [
            "https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/kecove-kappa-logo-maserta-32193cw-a2c-1.jpg",
            "https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/kecove-kappa-logo-maserta-32193cw-a2c-2.jpg",
            "https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/kecove-kappa-logo-maserta-32193cw-a2c-3.jpg",
            "https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/kecove-kappa-logo-maserta-32193cw-a2c-4.jpg"
        ],
        productModel: 'Logo Maserta',
        oldPrice: 84.99,
        price: 47.99,
        colors: ['red', 'black', 'green'],
        sizes: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    };

    const options = data1.sizes.map(size => ({ value: size, label: ` № ${size} EU ` }));
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: 'white',
            fontFamily: 'sans-serif',
            borderColor: state.isFocused ? 'lightblue' : 'grey',
            boxShadow: state.isFocused ? '0 0 0 1px blue' : null,
            '&:hover': {
                borderColor: state.isFocused ? 'lightblue' : 'grey',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'lightblue' : state.isFocused ? 'lightgrey' : null,
            color: state.isSelected ? 'white' : 'black',
            '&:hover': {
                backgroundColor: state.isSelected ? 'lightblue' : 'lightgrey',
                color: '#fff',
            },
            fontFamily: 'sans-serif',
            textAlign: 'center'
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

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedImage(null);
    };

    return (
        <div className={styles.container}>
            {modalVisible && <ImageModal setSelected={setSelectedImage} imageArray={data1.images} image={selectedImage} onClose={closeModal} />}
            <div className={styles.left}>
                <div className={styles.imageContainer}>
                    <div className={styles.upperRow}>
                        <div className={styles.imageWrapper} onClick={() => handleImageClick(data1.images[0])}>
                            <img src={data1.images[0]} alt="Product image" className={styles.image} />
                        </div>
                        <div className={styles.imageWrapper} onClick={() => handleImageClick(data1.images[1])}>
                            <img src={data1.images[1]} alt="Product image" className={styles.image} />
                        </div>
                    </div>
                    <div className={styles.bottomRow}>
                        <div className={styles.imageWrapper} onClick={() => handleImageClick(data1.images[2])}>
                            <img src={data1.images[2]} alt="Product image" className={styles.image} />
                        </div>
                        <div className={styles.imageWrapper} onClick={() => handleImageClick(data1.images[3])}>
                            <img src={data1.images[3]} alt="Product image" className={styles.image} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.infoContainer}>
                            <div className={styles.logoWrapper}>
                                <img src="https://i.pinimg.com/originals/b4/75/8a/b4758a1a7917b8bd63639ca6797feddc.png" alt="Brand Logo" className={styles.brandLogo} />
                            </div>
                    <div className={styles.aboutProduct}>
                        <div className={styles.productCredentials}>
                            <div className={styles.productNameDiv}>
                                <p className={styles.productName}>{data1.productName}</p>
                                <p className={styles.productModel}>{data1.productModel}</p>
                            </div>
                        </div>
                        <div className={styles.priceDiv}>
                            <div className={styles.prices}>
                                <p className={styles.price} style={{ color: data1.isOnSale ? 'red' : 'black' }}>${data1.price}</p>
                                <p className={styles.oldPrice}>{data1.isOnSale ? `$${data1.oldPrice}` : null}</p>
                            </div>
                            <p className={styles.priceDiff}>You are saving ${(data1.oldPrice - data1.price).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.productActions}>
                    <Select isSearchable={false} placeholder={"Choose a size.."} styles={customStyles} options={options} value={selectedOption} onChange={handleSelectChange} />
                    <button className={styles.addToCartBtn}>
                        <AddShoppingCartIcon className={styles.addToCartIcon} /> Add to cart
                    </button>
                    <div className={styles.deliverySchedule}>
                        <div className={styles.greenDot} />
                        <p className={styles.deliveryTime}>Delivery time 2-5 work days.</p>
                    </div>
                </div>
                <div className={styles.companyDeliveryPolicy}>
                    <div className={styles.policyLeft}>
                        <div className={styles.policyWrapper}>
                            <VisibilityOutlinedIcon sx={{ fontSize: '3rem', opacity: .5 }} className={styles.policyIcon} />
                            <p>Test and review before payment</p>
                        </div>
                        <div className={styles.policyWrapper}>
                            <WorkspacePremiumOutlinedIcon sx={{ fontSize: '3rem', opacity: .5 }} className={styles.policyIcon} />
                            <p>Only original products</p>
                        </div>
                        <div className={styles.policyWrapper}>
                            <CheckCircleOutlineOutlinedIcon sx={{ fontSize: '3rem', opacity: .5 }} className={styles.policyIcon} />
                            <p>Every product on stock</p>
                        </div>
                    </div>
                    <div className={styles.policyRight}>
                        <div className={styles.policyWrapper}>
                            <LocalShippingOutlinedIcon sx={{ fontSize: '3rem', opacity: .5 }} className={styles.policyIcon} />
                            <p>Fast and reliable delivery</p>
                        </div>
                        <div className={styles.policyWrapper}>
                            <UpdateOutlinedIcon sx={{ fontSize: '3rem', opacity: .5 }} className={styles.policyIcon} />
                            <p>14 days return period</p>
                        </div>
                        <div className={styles.policyWrapper}>
                            <PermPhoneMsgOutlinedIcon sx={{ fontSize: '3rem', opacity: .5 }} className={styles.policyIcon} />
                            <p>Customer support</p>
                        </div>
                    </div>
                </div>
                <hr className={styles.hr}/>
                <div className={styles.accordionDiv}>
                <Accordion title={"Product Info"} children={"Lorem ipsum dolor sit amet consectetur adipisicing elit. "} />
                <hr className={styles.hr}/>
                <Accordion title={"FAQ"} children={"Lorem ipsum dolor sit amet consectetur adipisicing elit. "} />
                <hr className={styles.hr}/>
                <Accordion title={'Delivery & Payment'} children={"Lorem ipsum dolor sit amet consectetur adipisicing elit. "}/>
                <hr className={styles.hr}/>
                <Accordion title={'Size chart'} children={"Lorem ipsum dolor sit amet consectetur adipisicing elit."} />
                <hr className={styles.hr}/>
                <Accordion title={'Return policy'} children={"Lorem ipsum dolor sit amet consectetur adipisicing elit. "}/>
                <hr className={styles.hr}/>
                <Accordion title={'Contacts'} children={"Lorem ipsum dolor sit amet consectetur adipisicing elit. "}/>
                <hr className={styles.hr}/>
                </div>
            </div>
        </div>
    );
}
