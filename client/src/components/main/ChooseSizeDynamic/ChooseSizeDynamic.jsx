import { useState } from 'react';
import styles from './chooseSizeDynamic.module.css'
import chooseSize from '../../../assets/sectionPics/chooseSize.png'

export default function ChooseSizeDynamic (){

    const [ size, setSize ] = useState(40);
    const [ shoeImageSize, setShoeImageSize ] = useState(size);

                            
    return(
        <div className={styles.container}>
            	<form method="GET" action="#" className={styles.sizeForm}>
                    <h1>Choose your size</h1>
                    <div className={styles.slidecontainer}>
                      <input type="range" className={styles.slider} min={19} max={49} defaultValue={size} onChange={(e) => {
                        setSize(e.target.value) 
                        setShoeImageSize(Number(e.target.value) + 20)
                        }
                       }/>
                    </div>
                    <button type='submit'>Check all models with size <span>{size}</span></button>
                </form>
                <div className={styles.imageContainer}>
                    <div className={styles.imageWrapper}>
                        <img src={chooseSize}  className={styles.image}alt="Choose size sneaker image"  style={{width: `${shoeImageSize}0px`}}/>
                    </div>
                </div>
        </div>
    );
}