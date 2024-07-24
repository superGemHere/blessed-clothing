import styles from "./product.module.css"

export default function Product (){
                            
    return(
        <div className={styles.card}>
            	<header className={styles.saleInfo}>
                    <p>Sale</p>
                    <p>New</p>
                </header>
                <div className={styles.imageWrapper}>
                    <img src="https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/sportni-obuvki-puma-voltaic-evo-379601-02-1.jpg" alt="Product image" />
                </div>
                <div className={styles.productInfo}>
                    <div className={styles.productCredentials}>
                        <p className={styles.name}>Puma</p>
                        <p className={styles.model}>Voltaic Evo</p>
                    </div>
                    <div className={styles.priceDiv}>
                        <p className={styles.oldPrice}>$189.99</p>
                        <p className={styles.newPrice}>$151.99</p>
                    </div>
                    <p className={styles.freeShipping}>Free shipping</p>
                </div>
        </div>
    );
}