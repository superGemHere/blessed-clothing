import styles from './cart.module.css';
import React from 'react';
import { 
  Close as CloseIcon, 
  Add as AddIcon, 
  Remove as RemoveIcon 
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateCartItemQuantity } from '../../../actions/cartActions'; // Updated

export default function ModalCart({
  navbarHeight,
  visibilityState
}) {
  // Get the cart from Redux state
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // Handle quantity update (add/remove items) via Redux actions
  const updateQuantity = (product, delta) => {
    const newQuantity = product.quantity + delta;
    if (newQuantity <= 0) {
      dispatch(removeFromCart(product._id));  // If quantity is less than 1, remove the item
    } else {
      dispatch(updateCartItemQuantity(product._id, newQuantity));  // Updated to dispatch updateCartItemQuantity
    }
  };

  const totalPrice = cart.items.reduce((sum, item) => sum + item.newPrice * item.quantity, 0);
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);  
  return (
    <div className={`${styles.modalOverlay} ${visibilityState.isCartOpen ? styles.modalOverlayOpen : ''}`} onClick={() => visibilityState.setIsCartOpen(false)}>
      <div className={`${styles.modalContent} ${visibilityState.isCartOpen ? styles.modalContentOpen : ''}`} onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button className={styles.closeButton} onClick={() => visibilityState.setIsCartOpen(false)}>
          <CloseIcon />
        </button>
        <h2 className={styles.title}>Your Cart</h2>

        {/* Cart Items */}
        <div className={styles.cartItems}>
          {cart.items.length === 0 ? (
            <p className={styles.emptyCart}>Your cart is empty</p>
          ) : (
            cart.items.map(item => (
              <div key={item._id} className={styles.cartItem}>
                <img src={item.imageUrl} alt={`${item.productName} ${item.productModel}`} className={styles.cartItemImage} />
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{`${item.productName} ${item.productModel}`}</h3>
                  <p className={styles.itemPrice}>${(item.newPrice).toFixed(2)}</p>
                  <div className={styles.quantityControls}>
                    <button className={styles.quantityButton} onClick={() => updateQuantity(item, -1)}>
                      <RemoveIcon />
                    </button>
                    <span>{item.quantity}</span>
                    <button className={styles.quantityButton} onClick={() => updateQuantity(item, 1)}>
                      <AddIcon />
                    </button>
                  </div>
                </div>
                <button className={styles.removeButton} onClick={() => dispatch(removeFromCart(item._id))}>
                  <CloseIcon />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary */}
        {cart.items.length > 0 && (
          <div className={styles.cartSummary}>
            <div className={styles.total}>
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutButton}>Checkout</button>
          </div>
        )}

        {/* Quick Add Products */}
        <div className={styles.quickAdd}>
          <h3 className={styles.quickAddTitle}>Quick Add:</h3>
          <div className={styles.quickAddButtons}>
            {/* {sampleProducts.map(product => (
              <button key={product._id} className={styles.quickAddButton} onClick={() => dispatch(addToCart(product))}>
                {product.name}
              </button>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
