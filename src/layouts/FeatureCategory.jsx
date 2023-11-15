import React, { Component } from "react";
import CategoryServices from "../services/CategoryServices";
import ProductServices from "../services/ProductServices";
import { withRouter } from "react-router-dom";

const imageUrls = [
  "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png",
  "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/tpcn_vitamin_khoang_chat_level_2_91b99b5a64.png",
  "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/suc_khoe_tim_mach_level_2_1fc9d156fd.png",
  "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/ho_tro_tieu_hoa_level_2_df7385ed6e.png",
  "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/sinh_li_noi_tiet_to_ec55ecdc29.png",
  "https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/ho_tro_tinh_duc_level_2_d48129bdca.png",
];

class FeatureCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    CategoryServices.getCategoryType(6)
      .then((res) => {
        const categories = res.data.slice(0, 6);
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
    return (
      <>
        {/* Categories Start */}

        <div className="container-fluid feature-category pt-5 ">
          <h2
            className="position-relative text-uppercase mx-xl-5 mb-4"
            style={{ fontSize: "27px", paddingLeft: "2%" }}
          >
            <img
              loading="lazy"
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/28x28/https://cms-prod.s3-sgn09.fptcloud.com/smalls/danh_muc_noi_bat_d03496597a.png"
              alt=""
              style={{ paddingRight: "0.5%", paddingBottom: "3px" }}
            />
            <span className=" pr-3">Feature Categories</span>
          </h2>

          <div className="row cover-feature-category ">
            {this.state.categories.map((category, index) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
                key={category.category_id}
              >
                <div
                  className="item"
                  key={category.category_id}
                  onClick={() =>
                    this.viewProductByCategory(category.category_id)
                  }
                >
                  <a href="#">
                    <div className="feature-category-cate-item">
                      <div className="feature-category-cate-item-img">
                        <img
                          loading="lazy"
                          decoding="async"
                          alt="Category Image"
                          src={imageUrls[index]}
                        />
                      </div>
                      <div className="feature-category-cate-item-content">
                        {category.category_name}{" "}
                      </div>
                      <small className="text-body">
                        {category.productCount} Products
                      </small>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <img
            src="https://cdn.nhathuoclongchau.com.vn/unsafe/301x173/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/icon_noi_dung_san_pham_doi_tuong_4f5363c4ef.png"
            alt=""
          />
        </div>

        {/* Categories End */}
      </>
    );
  }
}

export default withRouter(FeatureCategory);
