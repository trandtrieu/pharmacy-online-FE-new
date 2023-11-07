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
import AboutComponent from "./pages/AboutComponent";
import UpdatePrescriptionComponent from "./pages/UpdatePrescriptionComponent";
import SearchProduct from "./pages/SearchProduct";
import { Bubble } from "@typebot.io/react";
import CheckoutComponent from "./pages/CheckoutComponent";
import BlogComponent from "./pages/BlogComponent";
import BlogDetailComponent from "./pages/BlogDetailComponent";
import { LoginComponent } from "./pages/LoginComponent";
import ForgotPassword from "./pages/ForgetPassword";
import SetNewPass from "./pages/SetNewPass";

function App() {
  return (
    <>
      <Router>
        <AppWrapper>
          <HeaderComponent />
          <ToastContainer />
          <Bubble
            typebot="customer-support-e4ekwgb"
            theme={{ button: { backgroundColor: "#598E71" } }}
          />
          <Switch>
            <Route path="/" exact component={HomeComponent} />
            <Route path="/home" component={HomeComponent} />
            <Route path="/login" component={LoginComponent} />
            <Route path="/forgotpass" component={ForgotPassword} />
            <Route path="/setnewpass" component={SetNewPass} />
            <Route
              path="/detail-product/:productId"
              component={DetailProductComponent}
            />
            <Route path="/category/:category_id" component={CategoryProduct} />
            <Route path="/shop/search" component={SearchProduct} />

            <Route path="/shop" component={ShopComponent} />
            <Route path="/cart" component={CartComponent} />
            <Route path="/wishlist" component={WishlistComponent} />
            <Route path="/profile/:accountId" component={ProfileComponent} />
            <Route
              path="/create-prescription"
              component={CreatePrescriptionComponent}
            />
            <Route
              path="/edit-prescription/:id"
              component={EditPrescriptionComponent}
            />
            <Route
              path="/update-prescription/:id"
              component={UpdatePrescriptionComponent}
            />
            <Route path="/about" component={AboutComponent} />
            <Route path="/check-out" component={CheckoutComponent} />

            <Route path="/blog" component={BlogComponent} />
            <Route
              path="/blog-detail/:blog_id"
              component={BlogDetailComponent}
            />
            {/* <Route path="/add-blog" component={AddBlogComponent} />
            <Route
              path="/update-blog/:blog_id"
              component={UpdateBlogComponent}
            /> */}
          </Switch>
          <FooterComponent />
        </AppWrapper>
      </Router>
    </>
  );
}

export default App;
