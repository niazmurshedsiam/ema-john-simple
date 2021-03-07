import { useState, React, useEffect } from "react";
import fakeData from "./../../fakeData/index";
import "./Shop.css";
import Product from "./../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { Link } from "react-router-dom";
const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);
    const previousCart = productKeys.map((existingKey) => {
      const product = fakeData.find((product) => product.key === existingKey);
      console.log(existingKey, saveCart[existingKey]);
      product.quantity = saveCart[existingKey];
      return product;
    });
    setCart(previousCart);
  }, []);
  const handleAddProduct = (product) => {
    const toBeAddedkey = product.key;
    const sameProduct = cart.find((product) => product.key === product.key);
    let count = 1;
    let newCart;
    if (sameProduct) {
      const count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const other = cart.filter((product) => product.key !== toBeAddedkey);
      newCart = [...other, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };
  return (
    <div className="twin-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            key={product.key}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={product}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="add-button">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
