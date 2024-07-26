import styles from "./product.module.css"

export default function Product ({
    data
}){
                            
    return(
        <div className={styles.card}>
            	<header className={styles.saleInfo}>
                    {data.isOnSale ? <p className={styles.onSaleFlag}>Sale</p> : null}
                    {data.isNew ? <p className={styles.newProductFlag}>New</p> : null}
                </header>
                <div className={styles.imageWrapper}>
                    <img src={data.imageUrl} alt="Product image" />
                </div>
                <div className={styles.productInfo}>
                    <div className={styles.productCredentials}>
                        <p className={styles.name}>{data.productName}</p>
                        <p className={styles.model}>{data.productModel}</p>
                    </div>
                    <div className={styles.priceDiv}>
                        <p className={styles.oldPrice}>{ data.isOnSale ? `$${data.oldPrice}` : null }</p>
                        <p className={styles.price} style={{ color: data.isOnSale ? 'red' : 'black' }}>${data.price}</p>
                    </div>
                    <p className={styles.colorText}>Available colors:</p>
                    <div className={styles.colorsDiv}>
                        {data['colors'].map(color => (
                            <span key={color} className={styles.color} style={{backgroundColor: color}}></span>
                        ))}
                    </div>
                    <p className={styles.sizeText}>Available sizes:</p>
                    <div className={styles.sizesDiv}>
                        {data['sizes'].map(size => (
                            <span key={size} className={styles.size}>{size}</span>
                        ))}
                    </div>
                    {data.price > 100 ? <p className={styles.freeShipping}>Free shipping</p> : null}
                </div>
        </div>
    );
}