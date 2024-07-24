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
                    <p className={styles.colorText}>Available colors:</p>
                    <div className={styles.colorsDiv}>
                        <span className={styles.color} style={{backgroundColor: `red`}}></span>
                        <span className={styles.color} style={{backgroundColor: `black`}}></span>
                        <span className={styles.color} style={{backgroundColor: `green`}}></span>
                    </div>
                    <p className={styles.sizeText}>Available sizes:</p>
                    <div className={styles.sizesDiv}>
                        <span className={styles.size}>40</span>
                        <span className={styles.size}>41</span>
                        <span className={styles.size}>42</span>
                        <span className={styles.size}>43</span>
                        <span className={styles.size}>44</span>
                        <span className={styles.size}>45</span>
                        <span className={styles.size}>46</span>
                        <span className={styles.size}>47</span>
                        <span className={styles.size}>48</span>
                        <span className={styles.size}>49</span>
                    </div>
                    <p className={styles.freeShipping}>Free shipping</p>
                </div>
        </div>
    );
}