import React from 'react';
import styles from './collection.module.css';

const FlipBoxComponent = () => {
  return (
        <>
      <div className={styles.boxItem}>
        <div className={styles.flipBox}>
          <div
            className={`${styles.flipBoxFront} ${styles.textCenter}`}
            style={{ backgroundImage: "url('https://s25.postimg.cc/frbd9towf/cta-2.png')" }}
          >
            <div className={`${styles.inner} ${styles.colorWhite}`}>
              <h3 className={styles.flipBoxHeader}>Custom Domains</h3>
              <p>A short sentence describing this callout is.</p>
              <img
                src="https://s25.postimg.cc/65hsttv9b/cta-arrow.png"
                alt=""
                className={styles.flipBoxImg}
              />
            </div>
          </div>
          <div
            className={`${styles.flipBoxBack} ${styles.textCenter}`}
            style={{ backgroundImage: "url('https://s25.postimg.cc/frbd9towf/cta-2.png')" }}
          >
            <div className={`${styles.inner} ${styles.colorWhite}`}>
              <h3 className={styles.flipBoxHeader}>Custom Domains</h3>
              <p>A short sentence describing this callout is.</p>
              <button className={styles.flipBoxButton}>Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default FlipBoxComponent;
