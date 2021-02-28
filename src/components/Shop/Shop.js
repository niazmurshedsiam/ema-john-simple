import {useState,React} from 'react';
import fakeData from './../../fakeData/index';
import './Shop.css';
import Product from './../Product/Product';

const Shop = () => {
    
    const first10 = fakeData.slice(0,10);
    const [products,setProducts] = useState(first10);
    return (
        <div className="shop-container">
            <div className="product-container">
                
                {
                    products.map (product=><Product product={product}></Product>)
                }
            </div>
            <div className="shop-container">
                <h3>This is Card Container</h3>
            </div>
            
        </div>
    );
};
    
export default Shop;