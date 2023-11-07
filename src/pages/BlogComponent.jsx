import React, { Component } from "react";
import CarouselBlogComponent from "../layouts/CarouselBlogComponent";
import BlogServices from "../services/BlogServices";

class BlogComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: [],
    };
    this.addBlog = this.addBlog.bind(this);
  }

  componentDidMount() {
    BlogServices.getBlog().then((res) => {
      this.setState({ blogs: res.data });
    });
  }

  viewBlog(blog_id) {
    this.props.history.push(`/blog-detail/${blog_id}`);
  }

  addBlog() {
    this.props.history.push("/add-blog");
  }

  render() {
    const getText = (html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent;
    }; //render text dang html trong content
    return (
      <>
        <CarouselBlogComponent />
        {/* <div
          className="site-blocks-cover"
          style={{ backgroundImage: 'url("assets/images/blog.jpeg")'}}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-7 mx-auto order-lg-2 align-self-center">
                <div className="site-block-cover-content text-center">
                  <h2 className="sub-title">
                    Effective Medicine, New Medicine Everyday
                  </h2>
                  <h1 style={{ fontFamily: "Lora, serif" }}>Welcome To Blog</h1>
                </div>
              </div>
            </div>
          </div>  
        </div> */}

        {/* <div className="add-button" onClick={this.addBlog}> Add Blog </div> */}

        <h3
          className="blog-title"
          style={{ marginTop: "30px", marginLeft: "15rem" }}
        >
          Pharmacy Blogs
        </h3>

        <section className="post container-fluid">
          {/* which is width: 100% at all breakpoints */}
          <div className="card-column">
            <div
              className="d-flex justify-content-center "
              style={{ marginLeft: "70px" }}
            >
              <div className="row px-xl-5" style={{ paddingRight: "40px" }}>
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
                    {/* <button onClick={() => this.viewBlog(blog.blogId)}>{blog.blogId} </button> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div class="container">
            <div class="col">
              <h4 className="tag-title" style={{ marginTop: "20px" }}>
                Most Popular
              </h4>

              {/* <div class="row"> */}
              {this.state.blogs.map((blog) => (
                <div
                  class="card-blog"
                  style={{ width: "25rem" }}
                  key={blog.blog_id}
                  onClick={() => {
                    this.viewBlog(blog.blog_id);
                  }}
                >
                  <div
                    class="card mb-3"
                    style={{ width: "24rem", borderRadius: "1rem" }}
                  >
                    {blog.imgUrls && blog.imgUrls.length > 0 && (
                      <img
                        class="card-image-top"
                        src={`/assets/images/${blog.imgUrls[0]}`}
                        alt="..."
                        style={{
                          height: "100px",
                          objectFit: "cover",
                          margin: "auto",
                          padding: "0.3rem",
                          borderRadius: "1rem",
                          maxWidth: "30%",
                        }}
                      />
                    )}
                    <div class="card-body" style={{ padding: "0.8rem" }}>
                      <h8 className="title">{blog.title}</h8>
                      <p className="card-content">
                        {getText(blog.content.substring(0, 30))}...
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* </div> */}
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default BlogComponent;
