import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
const Review = () => {
    const [cart,setCart] = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);
    const handlePlaceOrder = () =>{
        setCart([]);
        setOrderPlaced(true);
        processOrder();
        // console.log('order placed');
    }
    const handleRemoveProduct = (productKey) =>{
        // console.log('remove clicked',productKey);
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
        // console.log(cartProducts);

    },[]);
    let thankyou; 
    if(orderPlaced){
        thankyou = <img src={happyImage} alt=""/>
    }  
        return (
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(product => <ReviewItem  handleRemoveProduct = {handleRemoveProduct} key={product.key} product = {product}></ReviewItem>)
            }
            {
                thankyou
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <button onClick={handlePlaceOrder} className="add-button">Place Order</button>
                </Cart>
                
            </div>
            
        </div>
    );
};

export default Review;