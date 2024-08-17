import { useEffect, useState } from 'react';
import styles from './chooseSizeDynamic.module.css';
import chooseSize from '../../../assets/sectionPics/chooseSize.png';

export default function ChooseSizeDynamic() {

    const [size, setSize] = useState(40);
    const [multiplier, setMultiplier] = useState(2.5);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 350) {
                setMultiplier(6);  // Smaller multiplier for smaller screens
            } else if (window.innerWidth < 430) {
                setMultiplier(7);  // Smaller multiplier for smaller screens
            } else if (window.innerWidth < 500) {
                setMultiplier(8);  // Medium multiplier for medium screens
            } else {
                setMultiplier(10);  // Default multiplier for larger screens
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        
        // Cleanup function to remove event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles.container}>
            <form method="GET" action="#" className={styles.sizeForm}>
                <h1>Choose your size</h1>
                <div className={styles.slidecontainer}>
                    <input 
                        type="range" 
                        className={styles.slider} 
                        min={19} 
                        max={49} 
                        value={size} 
                        onChange={(e) => setSize(Number(e.target.value))}
                    />
                </div>
                <button type='submit'>Check all models with size <span>{size}</span></button>
            </form>
            <div className={styles.imageContainer}>
                <div className={styles.imageWrapper}>
                    <img 
                        src={chooseSize}  
                        className={styles.image} 
                        alt="Choose size sneaker image"  
                        style={{ 
                            width: `calc(${size}px * ${multiplier})`
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
