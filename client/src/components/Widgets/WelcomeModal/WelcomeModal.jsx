import React, { useState, useEffect } from 'react';
import { Close, Construction, ShoppingCartTwoTone, AttachMoneyTwoTone, SavedSearchTwoTone, AppSettingsAltTwoTone, EngineeringTwoTone, ArrowForward,  BrushTwoTone } from '@mui/icons-material';
import styles from './welcomeModal.module.css';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isVisited = sessionStorage.getItem('isVisited') ;
    if (!isVisited) {
      setIsOpen(true);
      sessionStorage.setItem('isVisited', true);
    }
  }, [])

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsOpen(true);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  // const closeModal = () => {
  //   setIsOpen(false);
  //   sessionStorage.setItem('isVisited', true);
  // };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
          <Close className={styles.closeIcon} />
        </button>
        <h2 className={styles.title}>
          <Construction className={styles.constructionIcon} /> Welcome to my Project - FootGear!
        </h2>
        <p className={styles.subtitle}>I'm still working on some exciting features:</p>
        <ul className={styles.list}>
          <li className={styles.listItem}><ShoppingCartTwoTone style={{color: '#00CCDD'}}/>Cart for products. </li>
          <li className={styles.listItem}><AttachMoneyTwoTone style={{color: 'green'}}/>Checkout payment portal.</li>
          <li className={styles.listItem}><SavedSearchTwoTone style={{color: 'greenyellow'}} />Advanced search functionality.</li>
          <li className={styles.listItem}><BrushTwoTone style={{color: 'purple'}}/>Working on the design.</li>
          <li className={styles.listItem}><AppSettingsAltTwoTone style={{color: '#FFEB00'}} />Optimizing the App.</li>
          <li className={styles.listItem}><EngineeringTwoTone style={{color: '#0F6292'}}/>And fixing some already existing features.</li>
        </ul>
        <p className={styles.footer}>Thank you for your visit and have a nice look around!</p>
        <button className={styles.continueButton} onClick={() => setIsOpen(false)}>
          Continue to the Project <ArrowForward className={styles.arrowIcon} />
        </button>
      </div>
    </div>
  );
}