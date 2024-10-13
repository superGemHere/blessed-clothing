import React from 'react';
import styles from './addedToCartModal.module.css';

const AddedToCartModal = ({ isOpen, onClose, onContinueShopping, onGoToCart }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Product Added to Cart</h2>
        <p>What would you like to do next?</p>
        <div className={styles.modalButtons}>
          <button onClick={onContinueShopping} className={styles.continueShopping}>
            Continue Shopping
          </button>
          <button onClick={onGoToCart} className={styles.goToCart}>
            Go to Cart
          </button>
        </div>
        <button onClick={onClose} className={styles.closeModal}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default AddedToCartModal;