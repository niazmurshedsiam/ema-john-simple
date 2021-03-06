import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';

const Review = () => {
    const [cart,setCart] = useState([]);
    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        
        const cartProducts = productKeys.map(key => {
           const product = fakeData.find(product => product.key === key);
           product.quantity = saveCart[key]; 
           return product;
        });
        setCart(cartProducts);
        console.log(cartProducts);

    },[])
    return (
        <div>
            <h1>Cart Item : {cart.length}</h1>
            
            
        </div>
    );
};

export default Review;