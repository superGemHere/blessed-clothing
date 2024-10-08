import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Close as CloseIcon, 
  Add as AddIcon, 
  Remove as RemoveIcon 
} from '@mui/icons-material';
import styles from './cart.module.css';

// Sample products
const sampleProducts = [
  { id: 1, name: "Stylish T-Shirt", price: 29.99, image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Comfortable Jeans", price: 59.99, image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Elegant Watch", price: 199.99, image: "/placeholder.svg?height=100&width=100" },
];

export default function ModalCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { ...sampleProducts[0], quantity: 2 },
    { ...sampleProducts[1], quantity: 1 },
  ]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <button className={styles.cartButton} onClick={() => setIsOpen(true)}>
        <ShoppingCart />
        {totalItems > 0 && <span className={styles.cartCount}>{totalItems}</span>}
      </button>
      <div className={`${styles.modalOverlay} ${isOpen ? styles.modalOverlayOpen : ''}`} onClick={() => setIsOpen(false)}>
        <div className={`${styles.modalContent} ${isOpen ? styles.modalContentOpen : ''}`} onClick={e => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </button>
          <h2 className={styles.title}>Your Cart</h2>
          <div className={styles.cartItems}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.name} className={styles.cartItemImage} />
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                  <div className={styles.quantityControls}>
                    <button className={styles.quantityButton} onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <RemoveIcon />
                    </button>
                    <span>{item.quantity}</span>
                    <button className={styles.quantityButton} onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <AddIcon />
                    </button>
                  </div>
                </div>
                <button className={styles.removeButton} onClick={() => removeFromCart(item.id)}>
                  <CloseIcon />
                </button>
              </div>
            ))}
          </div>
          {cartItems.length === 0 && (
            <p className={styles.emptyCart}>Your cart is empty</p>
          )}
          {cartItems.length > 0 && (
            <div className={styles.cartSummary}>
              <div className={styles.total}>
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button className={styles.checkoutButton}>Checkout</button>
            </div>
          )}
          <div className={styles.quickAdd}>
            <h3 className={styles.quickAddTitle}>Quick Add:</h3>
            <div className={styles.quickAddButtons}>
              {sampleProducts.map(product => (
                <button key={product.id} className={styles.quickAddButton} onClick={() => addToCart(product)}>
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