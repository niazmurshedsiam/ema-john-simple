import {useState,React} from 'react';
import fakeData from './../../fakeData/index';
import './Shop.css';
import Product from './../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';


const Shop = () => {
    
    const first10 = fakeData.slice(0,10);
    const [products,setProducts] = useState(first10);
    const [cart,setCart] = useState([]);
    const handleAddProduct = (product)=>{
        const toBeAddedkey = product.key;
        const sameProduct = cart.find(product => product.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const other = cart.filter(product => product.key !== toBeAddedkey);
            newCart = [...other,sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart,product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                
                {
                    products.map (product=><Product
                        key = {product.key}
                        showAddToCart ={true}
                        handleAddProduct ={handleAddProduct}  
                        product={product}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
            
        </div>
    );
};
    
export default Shop;