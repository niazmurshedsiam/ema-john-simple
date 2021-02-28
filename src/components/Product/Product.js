import React from 'react';
import './Product.css';
const Product = (props) => {
    const {img,name,seller,price,stock} = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h3 className="product-name">{name}</h3>
                <p>By : {seller}</p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - Order soon</small></p>
            </div>
            
        </div>
    );
};

export default Product;