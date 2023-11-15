import React, { Component } from "react";
import CategoryServices from "../services/CategoryServices";
import ProductServices from "../services/ProductServices";
import { withRouter } from "react-router-dom";

class CategoriesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      showSecondRow: false,
    };
  }

  toggleSecondRow = () => {
    this.setState(
      (prevState) => ({
        showSecondRow: !prevState.showSecondRow,
      }),
      () => {
        console.log("showSecondRow state:", this.state.showSecondRow);
      }
    );
  };

  componentDidMount() {
    CategoryServices.getCategoryType()
      .then((res) => {
        const categories = res.data;
        const promises = categories.map((category) => {
          return ProductServices.getNumberProductByCategory(
            category.category_id
          )
            .then((response) => {
              category.productCount = response.data;
            })
            .catch((error) => {
              console.error("Lỗi khi tải sản phẩm:", error);
            });
        });
        Promise.all(promises).then(() => {
          this.setState({
            categories: categories,
          });
        });
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
      });
  }
  viewProductByCategory(category_id) {
    this.props.history.push(`/category/${category_id}`);
  }
  render() {
    const { showSecondRow } = this.state;
    return (
      <>
        {/* Categories Start */}
        {/* <img
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/301x173/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/icon_noi_dung_san_pham_doi_tuong_4f5363c4ef.png"
          alt=""
        /> */}
        <div className="container-fluid cover-category pt-5 mb-5">
          <h2
            className="section-title position-relative text-uppercase mx-xl-5 mb-4"
            style={{ fontSize: "27px", paddingLeft: "2%" }}
          >
            <img
              loading="lazy"
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/28x28/https://cms-prod.s3-sgn09.fptcloud.com/smalls/danh_muc_noi_bat_d03496597a.png"
              alt=""
              style={{ paddingRight: "0.5%", paddingBottom: "3px" }}
            />
            <span className=" pr-3">Categories</span>
          </h2>

          <div className="row bg-category px-xl-5 pb-3 pt-3">
            {this.state.categories.slice(0, 6).map((category) => (
              <div
                className="col-lg-2 col-md-4 col-sm-6 col-12 pb-1 category-item"
                key={category.category_id}
                onClick={() => this.viewProductByCategory(category.category_id)}
              >
                <div className="category-image">
                  <img src={category.category_image} alt="" />
                </div>
                <div className="category-name">
                  <h6>{category.category_name}</h6>
                </div>
              </div>
            ))}
          </div>
          {showSecondRow && (
            <div className="row bg-category px-xl-5 pb-3 pt-3">
              {this.state.categories.slice(6).map((category) => (
                <div
                  className="col-lg-2 col-md-4 col-sm-6 col-12 pb-1 category-item"
                  key={category.category_id}
                  onClick={() =>
                    this.viewProductByCategory(category.category_id)
                  }
                >
                  <div className="category-image">
                    <img src={category.category_image} alt="" />
                  </div>
                  <div className="category-name">
                    <h6>{category.category_name}</h6>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <span onClick={this.toggleSecondRow} style={{ cursor: "pointer" }}>
              {showSecondRow ? (
                <i
                  className="fas fa-chevron-up"
                  style={{ paddingBottom: "50px" }}
                ></i>
              ) : (
                <i
                  className="fas fa-chevron-down"
                  style={{ paddingBottom: "50px" }}
                ></i>
              )}
            </span>
          </div>
        </div>

        {/* Categories End */}
      </>
    );
  }
}

export default withRouter(CategoriesComponent);
