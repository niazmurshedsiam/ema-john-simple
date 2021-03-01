import {useState,React} from 'react';
import fakeData from './../../fakeData/index';
import './Shop.css';
import Product from './../Product/Product';

const Shop = () => {
    
    const first10 = fakeData.slice(0,10);
    const [products,setProducts] = useState(first10);
    const [cart,setCart] = useState([]);
    const handleAddProduct = (product)=>{
        const newCart = [...cart,product];
        setCart(newCart);
        console.log('Add Product',product);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                
                {
                    products.map (product=><Product
                        handleAddProduct ={handleAddProduct}  
                        product={product}></Product>)
                }
            </div>
            <div className="cart-container">
                <h3>This is Card Container </h3>
                <h5>Order Summary : {cart.length}</h5>
            </div>
            
        </div>
    );
};
    
export default Shop;