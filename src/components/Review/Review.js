import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart,setCart] = useState([]);
    const handleRemoveProduct = (productKey) =>{
        console.log('remove clicked',productKey);
        const newCart = cart.filter(product => product.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
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
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(product => <ReviewItem  handleRemoveProduct = {handleRemoveProduct} key={product.key} product = {product}></ReviewItem>)
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
                
            </div>
            
        </div>
    );
};

export default Review;