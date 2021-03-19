import "./App.css";
import React, { createContext, useState } from "react";
import Header from "./components/Header";
import Shop from "./components/Shop/Shop";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Review from "./components/Review/Review";
import ManageInventory from "./ManageInventory/ManageInventory";
import NotFound from "./NotFound/NotFound";
import ProductDetail from "./ProductDetail/ProductDetail";
import Shipment from "./components/Shipment/Shipment";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// import {createContext} from 'react';
export const UserContext = createContext();
function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <h4>Login {loggedInUser.email}</h4>
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/manage">
              <ManageInventory></ManageInventory>
          </Route>
          <Route path="/login">
              <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
              <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
