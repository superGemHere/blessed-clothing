import styles from './singleProduct.module.css'

export default function SingleProduct (){
                            
    return(
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <div className={styles.upperRow}>
                    <div className={styles.imageWrapper}>
                        <img src="https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/kecove-kappa-logo-maserta-32193cw-a2c-1.jpg" alt="Product image" className={styles.image} />
                    </div>
                    <div className={styles.imageWrapper}>
                        <img src="https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/kecove-kappa-logo-maserta-32193cw-a2c-2.jpg" alt="Product image" className={styles.image} />
                    </div>
                </div>
                <div className={styles.bottomRow}>
                    <div className={styles.imageWrapper}>
                        <img src="https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/kecove-kappa-logo-maserta-32193cw-a2c-3.jpg" alt="Product image" className={styles.image} />
                    </div>
                    <div className={styles.imageWrapper}>
                        <img src="https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/kecove-kappa-logo-maserta-32193cw-a2c-4.jpg" alt="Product image" className={styles.image} />
                    </div>
                </div>
               
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.aboutProduct}>
                    <div className={styles.productCredentials}>
                    <p className={styles.productName}>Kappa</p>
                    <p className={styles.productModel}>Logo Maserta</p>
                    </div>
                    <div className={styles.priceDiv}>
                        <div className={styles.prices}>
                        <p className={styles.price}>$47.99</p>
                        <p className={styles.oldPrice}>$84.99</p>
                        </div>
                        <p>You are saving $37.00</p>
                    </div>

                </div>
            </div>
        </div>
    );
}