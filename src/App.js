import "./App.css";
import HeaderComponent from "./layouts/HeaderComponent";
import CarouselComponent from "./layouts/CarouselComponent";
import CategoriesComponent from "./layouts/CategoriesComponent";
import FeatureComponent from "./layouts/FeatureComponent";
import HomeProduct from "./pages/HomeProduct";
import RecentProduct from "./pages/RecentProduct";
import FooterComponent from "./layouts/FooterComponent";

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <CarouselComponent />
      <FeatureComponent />
      <CategoriesComponent />
      <HomeProduct />
      <RecentProduct />
      <FooterComponent />
    </div>
  );
}

export default App;
