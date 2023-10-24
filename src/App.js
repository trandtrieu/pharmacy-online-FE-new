import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import HeaderComponent from "./layouts/HeaderComponent";
import HomeComponent from "./pages/HomeComponent";
import FooterComponent from "./layouts/FooterComponent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ShopComponent from "./pages/ShopComponent";
import CartComponent from "./pages/CartComponent";
import WishlistComponent from "./pages/WishlistComponent";
import PrescriptionComponent from "./pages/PrescriptionComponent";
import DetailProductComponent from "./pages/DetailProductComponent";
import CategoryProduct from "./pages/CategoryProduct";
import AppWrapper from "./AppWrapper";
function App() {
  return (
    <>
      <Router>
        <AppWrapper>
          <HeaderComponent />
          <ToastContainer />

          <Switch>
            <Route path="/" exact component={HomeComponent} />
            <Route path="/home" component={HomeComponent} />
            <Route
              path="/detail-product/:productId"
              component={DetailProductComponent}
            />
            <Route path="/category/:category_id" component={CategoryProduct} />
            <Route path="/prescription" component={PrescriptionComponent} />
            <Route path="/shop" component={ShopComponent} />
            <Route path="/cart" component={CartComponent} />
            <Route path="/wishlist" component={WishlistComponent} />
            <Route
              path="/prescription/:accountId"
              component={PrescriptionComponent}
            />
          </Switch>

          <FooterComponent />
        </AppWrapper>
      </Router>
    </>
  );
}

export default App;
