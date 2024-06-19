import React from 'react';
import {Link} from 'react-router-dom'
import styles from './collection.module.css';

const CtaComponent = ({
    image,
    collectionData
}) => {
  return (
    <>
      <div className={styles.cta} style={{backgroundImage: `url(${image})`}}>
        {/* <img
          src={image}
          alt=""
          /> */}
        <div className={styles.text}>
          <h2>{collectionData.name}</h2>
          <p>{collectionData.description}</p>
          <Link className={styles.detailsLink} to={"#"}><span>See Collection</span></Link>
          {/* Here might go the redirect btn */}
        </div>
      </div>
    </>
  );
};

export default CtaComponent;