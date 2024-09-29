import styles from "./home.module.css";
import 'react-multi-carousel/lib/styles.css';

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrendingProducts } from "../../../api/productsApi";
import Carousel from 'react-multi-carousel';

import Section from '../Gender Section/Section'
import sectionWomenImage from "../../../assets/sectionPics/women-section.jpg"
import sectionMenImage from "../../../assets/sectionPics/men-section.jpg"
import sectionKidImage from "../../../assets/sectionPics/kids-section.jpg"
import SaleBanner from "../../../assets/sectionPics/SaleBanner.png"
import Collection from "../Collection/Collection";
import collectionBlessedAngel from "../../../assets/collectionPics/blessed-angel.jpg"
import collectionFallenAngel from "../../../assets/collectionPics/fallen-angel.jpg"




import NewsLetter from "../NewsLetter/NewsLetter";

import Product from "../Product/Product";
import ChooseSizeDynamic from "../ChooseSizeDynamic/ChooseSizeDynamic";
import ScaleLoader from "../../Widgets/Spinner";


export default function Home(){
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getTrendingProducts()
        .then(res => {
            setTrendingProducts(res.products)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    },
    []);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 600 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 600, min: 0 },
            items: 2
        }
    };

    let dataWoman = {
        sectionImage: sectionWomenImage,
        sectionName: "Women"
    }
    let dataMan = {
        sectionImage: sectionMenImage,
        sectionName: "Men"
    }
    let dataKids = {
        sectionImage: sectionKidImage,
        sectionName: "Kids"
    }

    let trendingData = {
        data1: {
            image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/9e970183-c03c-4250-ae91-b238aefd47df/air-max-90-shoes-VFMgbv.png',
            model: 'Air Max',
            brand: 'Nike',
            sizes: '40, 41, 42, 43',
            price: '219,99',
            type: 'Sneakers'
        },
    }

    const data1 = {
        id: 1,
        isOnSale: true,
        isNew: true,
        productName: 'Puma',
        imageUrl: "https://www.shopsector.com/uploads/productgalleryfile/images/1200x1200/sportni-obuvki-puma-voltaic-evo-379601-02-1.jpg",
        productModel: 'Voltaic Evo',
        oldPrice: 189.99,
        price: 151.99,
        colors: ['red', 'black', 'green'],
        sizes: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    }
    return(
        <main className={styles.main}>
            <section className={styles.header}>
                <div className={styles.welcome}>
                    <h1 id={styles.welcome}>FootGear<>&#8482;</></h1>
                    <h2 id={styles.welcomeSlogan}>Worldwide shop for all Brands and Premium models</h2>
                </div>
            </section>
            <div className={styles.genderSections}>
                <Section path={`products?page=1&limit=10&sort=asc&maxPrice=1000&gender=female&age=&trending=false&sale=false&sizes=`}
                data={dataWoman}
                />
                <Section path={`products?page=1&limit=10&sort=asc&maxPrice=1000&gender=male&age=&trending=false&sale=false&sizes=`}
                data={dataMan}
                />
                <Section path={`products?page=1&limit=10&sort=asc&maxPrice=1000&gender=&age=child&trending=false&sale=false&sizes=`}
                data={dataKids}
                />
            </div>
            <section className={styles.saleSection} style={{backgroundImage: `url(${SaleBanner})`}}>
                <Link to={`${import.meta.env.VITE_FRONTEND_URL}products?page=1&limit=10&sort=asc&maxPrice=1000&gender=&age=&trending=false&sale=true&sizes=`} className={styles.saleBtn}>Shop now</Link>
            </section>
            {/* <section className={styles.collectionContainer}>
                <h1>Featured Collections</h1>
                <div className={styles.collections}>
                    <Collection collectionData={{name: "Blessed Angels", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit accusamus temporibus voluptates exercitationem, ipsa officiis a animi esse explicabo repudiandae in, blanditiis cum quam magni? Voluptates illum earum praesentium veniam."}} image={collectionBlessedAngel} />
                    <Collection collectionData={{name: "Fallen Angels", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit accusamus temporibus voluptates exercitationem, ipsa officiis a animi esse explicabo repudiandae in, blanditiis cum quam magni? Voluptates illum earum praesentium veniam.Lorem ipsa officiis a animi esse explicabo repudiandae in, blanditiis cum quam magni? Voluptates illum earum praesentium veniam."} } image={collectionFallenAngel}/>
                </div>
            </section> */}
            <section className={styles.chooseSizeDynamic}>
                <ChooseSizeDynamic />
            </section>
            <section className={styles.trendingProducts}>
                <div className={styles.trendingContainer}>
                    <h1>Trending shoes</h1>
                    <div className={styles.productsContainer}>
                    <Carousel responsive={responsive} partialVisible={false} itemClass={styles.carouselItems}>
                        {trendingProducts.length !== 0 ? trendingProducts.map(product => <Product key={product._id} data={product} />) : < ScaleLoader />}
                    </Carousel>
                    </div>
                </div>
            </section>
            <section className={styles.newsLetter}>
                <NewsLetter />
            </section>
        </main>
    );
}