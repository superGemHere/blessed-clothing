import styles from './singleProduct.module.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../../../api/productsApi';
import { useDispatch } from 'react-redux'; // To send actions to Redux
import { addToCart } from '../../../actions/cartActions'; // Our action to add items
import Select from 'react-select';


import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined';


import Accordion from '../../Widgets/Accordion/Accordion';
import ImageModal from '../ImageModal/ImageModal';
import ScaleLoader from '../../Widgets/Spinner';

export default function SingleProduct() {
    const dispatch = useDispatch();

    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [product, setProduct] = useState({});
    const {productId} = useParams();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getSingleProduct(productId)
        .then(res => {
            setProduct(res)
            setLoading(false);
        })
        .catch(err => console.log(err));
    }, []);

    let options = [];
    if(product && product.sizes) {
        options = product.sizes.map(size => ({ value: size, label: ` № ${size} EU ` }));
    }
    
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

    const handleAddToCart = () => {
        dispatch(addToCart(product)); // Dispatch the add to cart action
      };

    return (
        <div className={styles.container}>
            {loading ? <ScaleLoader /> 
            :<>
            {modalVisible && <ImageModal setSelected={setSelectedImage} imageArray={product?.images} image={selectedImage} onClose={closeModal} />}
            <div className={styles.left}>
                {product.images 
                && 
                <div className={styles.imageContainer}>
                    <div className={styles.upperRow}>
                        <div className={styles.imageWrapper} onClick={() => handleImageClick(product?.images[0])}>
                            <img src={product?.images[0]} alt="Product image" className={styles.image} />
                        </div>
                        <div className={styles.imageWrapper} onClick={() => handleImageClick(product?.images[1])}>
                            <img src={product?.images[1]} alt="Product image" className={styles.image} />
                        </div>
                    </div>
                    <div className={styles.bottomRow}>
                        <div className={styles.imageWrapper} onClick={() => handleImageClick(product?.images[2])}>
                            <img src={product?.images[2]} alt="Product image" className={styles.image} />
                        </div>
                        <div className={styles.imageWrapper} onClick={() => handleImageClick(product?.images[3])}>
                            <img src={product?.images[3]} alt="Product image" className={styles.image} />
                        </div>
                    </div>
                </div>
                }
            </div>
            <div className={styles.right}>
                <div className={styles.infoContainer}>
                            {/* <div className={styles.logoWrapper}>
                                <img src="https://i.pinimg.com/originals/b4/75/8a/b4758a1a7917b8bd63639ca6797feddc.png" alt="Brand Logo" className={styles.brandLogo} />
                            </div> */}
                    <div className={styles.aboutProduct}>
                        <div className={styles.productCredentials}>
                            <div className={styles.productNameDiv}>
                                <p className={styles.productName}>{product?.productName}</p>
                                <p className={styles.productModel}>{product?.productModel}</p>
                            </div>
                        </div>
                        <div className={styles.priceDiv}>
                            <div className={styles.prices}>
                                <p className={styles.price} style={{ color: product?.isOnSale ? 'red' : 'black' }}>${product?.newPrice}</p>
                                <p className={styles.oldPrice}>{product?.isOnSale ? `$${product?.oldPrice}` : null}</p>
                            </div>
                            <p className={styles.priceDiff}>You are saving ${(product?.oldPrice - product?.newPrice).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.productActions}>
                    <Select isSearchable={false} placeholder={"Choose a size.."} styles={customStyles} options={options} value={selectedOption} onChange={handleSelectChange} />
                    <button className={styles.addToCartBtn} onClick={handleAddToCart}>
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
                <Accordion title={"Product Info"} children={product?.description} />
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
            </>
    }
            
        </div>
    );
}
