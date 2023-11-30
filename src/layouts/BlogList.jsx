import React, { Component } from "react";
import BlogServices from "../services/BlogServices";

class BlogList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: [],
    };

  }

  componentDidMount() {
    BlogServices.getBlog().then((res) => {
      this.setState({ blogs: res.data });
    });
  }
  viewBlog(blog_id) {
    this.props.history.push(`/blog-detail/${blog_id}`);
  }
  render() {
    const getText = (html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent;
    }; //render text dang html trong content

    return (
      <>
        <div className="container-fluid cover-category pt-5">
          <h2
            className="section-title position-relative text-uppercase mx-xl-5 mb-4"
            style={{ fontSize: "27px", paddingLeft: "2%" }}
          >
            <img
              className="img-fluid"
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/28x28/https://cms-prod.s3-sgn09.fptcloud.com/smalls/goc_suc_khoe_77c4d4524f.png"
              alt={`Image3 0`}
            />
            <span className=" pr-3">  Blog News</span>
          </h2>

          <div className="container-fluid pt-5 pb-3">
          <div className="card-column">
            <div
              className="d-flex justify-content-center "
              style={{ marginLeft: "70px" }}
            >
              <div className="row" style={{ paddingRight: "40px" }}>
                {/* <div className="col-md-4"> */}
                {this.state.blogs.map((blog) => (
                  <div
                    className="post-box"
                    style={{
                      width: "22rem",
                      marginLeft: "5rem",
                      marginTop: "3rem",
                    }}
                    key={blog.blog_id}
                    onClick={() => this.viewBlog(blog.blog_id)}
                  >
                    {blog.imgUrls && blog.imgUrls.length > 0 && (
                      <img
                        className="card-img-top"
                        src={`assets/images/${blog.imgUrls[0]}`}
                        alt="blog"
                      />
                    )}
                    <h4 className="card-title" style={{ marginTop: "10px" }}>
                      {" "}
                      {blog.title}
                    </h4>
                    <h6 className="blog-date" style={{ marginTop: "20px" }}>
                      {" "}
                      {blog.create_date} {blog.create_time}
                    </h6>
                    <p className="card-content">
                      {getText(blog.content.substring(0, 100))}...
                    </p>
                  </div>
                ))}
                {/* </div> */}
              </div>
            </div>
          </div>
          </div>
        </div>
      </>
    );
  }
}

export default BlogList;
