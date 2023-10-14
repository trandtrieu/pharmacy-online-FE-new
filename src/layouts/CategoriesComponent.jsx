import React, { Component } from "react";
import CategoryServices from "../services/CategoryServices";

class CategoriesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    CategoryServices.getCategoryType()
      .then((res) => {
        this.setState({
          categories: res.data,
        });
        // console.log(this.state.categories);
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
      });
  }

  render() {
    return (
      <>
        {/* Categories Start */}
        <div className="container-fluid pt-5">
          <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
            <span className="bg-secondary pr-3">Categories</span>
          </h2>
          <div className="row px-xl-5 pb-3">
            {this.state.categories.map((category) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 pb-1"
                key={category.category_id}
              >
                <a className="text-decoration-none" href>
                  <div className="cat-item d-flex align-items-center mb-4">
                    <div
                      className="overflow-hidden"
                      style={{ width: "100px", height: "100px" }}
                    >
                      <img
                        className="img-fluid"
                        src={`assets/images/${category.category_image}`}
                        alt=""
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <div className="flex-fill pl-3">
                      <h6> {category.category_name}</h6>
                      <small className="text-body">100 Products</small>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
        {/* Categories End */}
      </>
    );
  }
}

export default CategoriesComponent;
