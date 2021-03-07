import React from 'react';

const ReviewItem = (props) => {
    console.log(props); 
    const {name,quantity,key} = props.product;
    return (
        <div style={{borderBottom:'1px solid lightgray',marginBottom : '5px',paddingBottom:'5px',marginLeft:'200px' }} className="review-item">
            <h4 className="product-name">Product Name : {name}</h4>
            <p>Product Quantity : {quantity}</p>
            <br/>
            <button className="add-button" onClick={ ()=> props.handleRemoveProduct(key)}>Review</button>
        </div>
    );
};

export default ReviewItem;