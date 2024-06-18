import React from 'react';
import styles from './collection.module.css';

const CtaComponent = ({
    image,
    collectionData
}) => {
  return (
    <>
      <div className={styles.cta}>
        <img
          src={image}
          alt=""
          />
        <div className={styles.text}>
          <h2>{collectionData.name}</h2>
          <p>{collectionData.description}</p>
          {/* Here might go the redirect btn */}
        </div>
      </div>
    </>
  );
};

export default CtaComponent;