import "./App.css";
import React from "react";
import Header from "./components/Header";
import Shop from "./components/Shop/Shop";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Review from "./components/Review/Review";
import ManageInventory from "./ManageInventory/ManageInventory";
import NotFound from "./NotFound/NotFound";
import ProductDetail from "./ProductDetail/ProductDetail";

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
