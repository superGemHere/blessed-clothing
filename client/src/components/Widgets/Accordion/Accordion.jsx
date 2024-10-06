import styles from './accordion.module.css'; 

import React, { useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordion}>
      <button
        className={styles.accordionHeader}
        onClick={toggleAccordion}
      >
        <div className={styles.accordionTitle}>
          {title}
          <span className={styles.accordionIcon}>{isOpen ? <KeyboardArrowUpIcon /> : < KeyboardArrowDownIcon />}</span>
        </div>
      </button>
      <div className={`${styles.accordionContent} ${isOpen ? styles.open : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;