import styles from './newsLetter.module.css';
import React, { useEffect, useState } from 'react';

export default function NewsLetter() {
    const [value, setValue] = useState('');
    const [isEmail, setIsEmail] = useState(true);

    useEffect(() => {
        isValid();
    }, [value])

    const isValid = () => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!pattern.test(value)){
            setIsEmail(false)
        }else{
            setIsEmail(true)
        }
    }
    const handleChange = (e) => {
        setValue(e.target.value);

    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log('Sending data to the server:', value);
        // Add your code to send the `value` to the server here
        // For example, using fetch or axios:
        // fetch('/api/newsletter', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ email: value }),
        // })
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error('Error:', error));
    };

    return (
        <div className={styles.container}>
            <h2>Sign-up to our newsletter.</h2>
            <form onSubmit={handleSubmit} className={styles.newsLetterForm} >
                <input
                    className={styles.input}
                    onChange={handleChange}
                    value={value}
                    placeholder='example@gmail.com'
                    type='email' 
                    style={isEmail ? {outlineColor: 'green'} : {outlineColor : 'red'}}
                />
                <button type='submit'>Sign-up</button>
            </form>
        </div>
    );
}