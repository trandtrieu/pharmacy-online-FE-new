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
import DetailProductComponent from "./pages/DetailProductComponent";
import CategoryProduct from "./pages/CategoryProduct";
import AppWrapper from "./AppWrapper";
import ProfileComponent from "./pages/ProfileComponent";
import CreatePrescriptionComponent from "./pages/CreatePrescriptionComponent";
import EditPrescriptionComponent from "./pages/EditPrescriptionComponent";
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
            <Route path="/shop" component={ShopComponent} />
            <Route path="/cart" component={CartComponent} />
            <Route path="/wishlist" component={WishlistComponent} />
            {/* <Route
              path="/my-prescription/:accountId"
              component={CreatePrescriptionComponent}
            /> */}
            <Route path="/profile/:accountId" component={ProfileComponent} />
            <Route
              path="/create-prescription"
              component={CreatePrescriptionComponent}
            />
            <Route
              path="/edit-prescription/:id"
              component={EditPrescriptionComponent}
            />
          </Switch>
          <FooterComponent />
        </AppWrapper>
      </Router>
    </>
  );
}

export default App;
