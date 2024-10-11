import styles from './cart.module.css';
import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Close as CloseIcon, 
  Add as AddIcon, 
  Remove as RemoveIcon 
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux'; // Import hooks for Redux
import { addToCart, removeFromCart } from '../../../actions/cartActions'; // Import Redux actions

// Sample products
const sampleProducts = [
  { id: 1, name: "Stylish T-Shirt", price: 29.99, image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Comfortable Jeans", price: 59.99, image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Elegant Watch", price: 199.99, image: "/placeholder.svg?height=100&width=100" },
];

export default function ModalCart({
  navbarHeight,
  visibilityState
}) {
  // Get the cart from Redux state
  const cart = useSelector(state => state.cart);  // Access the cart from the Redux store
  const dispatch = useDispatch();  // To dispatch actions

  const [isOpen, setIsOpen] = useState(true);  // Local state for controlling cart modal visibility

  // Handle quantity update (add/remove items) via Redux actions
  const updateQuantity = (product, delta) => {
    const newQuantity = product.quantity + delta;
    if (newQuantity <= 0) {
      dispatch(removeFromCart(product.id));  // If quantity is less than 1, remove the item
    } else {
      dispatch(addToCart({ ...product, quantity: newQuantity }));  // Update item quantity in the cart
    }
  };

  const totalPrice = cart.items.reduce((sum, item) => sum + item.newPrice, 0); // Calculate total price
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);  // Calculate total items in the cart

  return (
    <>
      {/* Cart button
      <button className={styles.cartButton} onClick={() => setIsOpen(true)}>
        <ShoppingCart />
        {totalItems > 0 && <span className={styles.cartCount}>{totalItems}</span>}
      </button> */}

      {/* Modal overlay */}
      <div className={`${styles.modalOverlay} ${visibilityState.isCartOpen ? styles.modalOverlayOpen : ''}`} onClick={() => visibilityState.setIsCartOpen(false)}>
        <div className={`${styles.modalContent} ${visibilityState.isCartOpen ? styles.modalContentOpen : ''}`} style={{ top: `${navbarHeight + 1}px` }} onClick={e => e.stopPropagation()}>
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
                <div key={item.id} className={styles.cartItem}>
                  <img src={item.imageUrl} alt={`${item.productName} ${item.productModel}`} className={styles.cartItemImage} />
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{`${item.productName} ${item.productModel}`}</h3>
                    <p className={styles.itemPrice}>${item.newPrice.toFixed(2)}</p>
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
                  <button className={styles.removeButton} onClick={() => dispatch(removeFromCart(item.id))}>
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
              {sampleProducts.map(product => (
                <button key={product.id} className={styles.quickAddButton} onClick={() => dispatch(addToCart(product))}>
                  {product.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
