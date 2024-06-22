import styles from './productCard.module.css';

import { Link } from 'react-router-dom';

import { MdAddShoppingCart } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { LuArrowDownRightSquare } from "react-icons/lu";
import { BsBoxArrowInDownRight } from "react-icons/bs";

function ProductCard({
    data
}) {
  return (
    <div className={styles.card} style={{backgroundImage: `url(https://static.vecteezy.com/system/resources/thumbnails/035/649/134/small_2x/white-stage-background-with-gradient-light-empty-room-for-display-your-product-photo.jpg)`, backgroundSize: 'cover'}}>
      <div className={styles.imageDiv}>
        <img src={data.image} className={styles.image}/>
      </div>
      <div className={styles.productInfo}>
        <p className={styles.type}>{data.type}</p>
        <div className={styles.brandCredentials}>
          <p className={styles.productName}>{data.brand}</p>
          <p className={styles.productModel}>{data.model}</p>
        </div>
        <div className={styles.details}>
        <p className={styles.price}>Price: ${data.price}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <Link className={styles.addToCartBtn} to={"#"}><MdAddShoppingCart/></Link>
        <Link className={styles.likeBtn} to={"#"}><CiHeart/></Link>
        <Link className={styles.seeDetailsBtn} to={"#"}><BsBoxArrowInDownRight style={{color:'#088395'}}/></Link>
      </div>
    </div>
  );
}

export default ProductCard;