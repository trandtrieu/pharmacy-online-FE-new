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
import ContactComponent from "./pages/ContactComponent";
import DetailProductComponent from "./pages/DetailProductComponent";
import ListProductComponent from "./pages/ListProductComponent";
import CreateProductComponent from "./pages/CreateProductComponent";

function App() {
  return (
    <Router>
      <HeaderComponent />
      <ToastContainer />

      <Switch>
        <Route path="/" exact component={HomeComponent} />
        <Route path="/home" component={HomeComponent} />
        {/* <Route path="/about" component={AboutComponent} /> */}
        <Route
          path="/detail-product/:productId"
          component={DetailProductComponent}
        />
        <Route path="/add-product/:id" component={CreateProductComponent}></Route>
        <Route path="/viewproduct" component={ListProductComponent} />
        {/* <Route
          path="/category/:category_id"
          component={CategoryProductComponent}
        /> */}
        <Route path="/contact" component={ContactComponent} />
        <Route path="/shop" component={ShopComponent} />
        <Route path="/cart" component={CartComponent} />
        <Route path="/wishlist" component={WishlistComponent} />
      </Switch>
      <FooterComponent />
    </Router>
  );
}

export default App;
