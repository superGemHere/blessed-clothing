import styles from './imageModal.module.css'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function ImageModal({ 
    onClose,
    setSelected,
    imageArray,
    image, 
}) {

    let index = imageArray.indexOf(image);

    const previousImage = () => {
        if(index == 0) {
            index = 3
        }
        setSelected(imageArray[--index]);
    }
    const nextImage = () => {
        if(index == 3){
            index = 0
        }
        setSelected(imageArray[++index]);
    }
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.iconWrapper1} onClick={() => previousImage()}>
                    <ArrowBackIosIcon className={styles.icon} />
                </div>
                <img src={image} alt="Large view" className={styles.modalImage} />
                <div className={styles.iconWrapper2}  onClick={() => nextImage()}>
                    <ArrowForwardIosIcon />
                </div>
            </div>
        </div>
    );
}