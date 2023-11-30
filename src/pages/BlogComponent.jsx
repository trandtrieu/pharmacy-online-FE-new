import React, { Component } from "react";
import CarouselBlogComponent from "../layouts/CarouselBlogComponent";
import BlogServices from "../services/BlogServices";
import ReactPaginate from "react-paginate";

class BlogComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: [],
      pageCount: 0, // Tổng số trang
      currentPage: 0, // Trang hiện tại
      blogsPerPage: 6, // Số blog trên mỗi trang
    };
    this.addBlog = this.addBlog.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    BlogServices.getBlog().then((res) => {
      this.setState({ blogs: res.data });
      this.loadBlogs();
    });
  }
  loadBlogs() {
    BlogServices.getBlog().then((res) => {
      const blogs = res.data;
      const pageCount = Math.ceil(blogs.length / this.state.blogsPerPage);

      // Đảo ngược thứ tự của mảng blogs
      const reversedBlogs = blogs.reverse();

      this.setState({
        blogs: reversedBlogs,
        pageCount: pageCount,
      });
    });
  }

  viewBlog(blog_id) {
    this.props.history.push(`/blog-detail/${blog_id}`);
  }

  addBlog() {
    this.props.history.push("/add-blog");
  }

  handlePageClick(data) {
    const selectedPage = data.selected;
    this.setState({
      currentPage: selectedPage,
    });
  }

  render() {
    const { blogs, currentPage, blogsPerPage } = this.state;
    const indexOfLastBlog = (currentPage + 1) * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const getText = (html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent;
    }; //render text dang html trong content

    // Sort blogs by create_date in descending order
    const sortedBlogs = [...this.state.blogs].sort(
      (a, b) => new Date(a.create_date) - new Date(b.create_date)
    );

    // Select the first 3 blogs
    const mostPopularBlogs = sortedBlogs.slice(0, 4);

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

        <section
          className="post container-fluid"
          style={{ overflow: "hidden", paddingBottom: "20px" }}
        >
          {/* which is width: 100% at all breakpoints */}
          <div className="card-column">
            <div
              className="d-flex justify-content-center "
              style={{ marginLeft: "70px" }}
            >
              <div className="row" style={{ paddingRight: "40px" }}>
                {/* <div className="col-md-4"> */}
                {currentBlogs.map((blog) => (
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
                    <h4
                      className="card-title-blog"
                      style={{ marginTop: "10px" }}
                    >
                      {" "}
                      {blog.title}
                    </h4>
                    <h6 className="blog-date" style={{ marginTop: "20px" }}>
                      {" "}
                      {blog.create_date} {blog.create_time}
                    </h6>
                    <p className="card-content-blog">
                      {getText(blog.content.substring(0, 100))}...
                    </p>
                    {/* <button onClick={() => this.viewBlog(blog.blogId)}>{blog.blogId} </button> */}
                  </div>
                ))}
                {/* </div> */}
              </div>
            </div>
            <br></br>
            <div className="pagination-container">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={7}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
          <div class="container" style={{ maxWidth: "100%" }}>
            <div class="col-md-3">
              <h4
                className="tag-title"
                style={{ marginTop: "20px", width: "350px" }}
              >
                Latest Blog
              </h4>

              <div class="row" style={{}}>
                {mostPopularBlogs.map((blog) => (
                  <div
                    class="card-blog"
                    style={{ width: "20rem" }}
                    key={blog.blog_id}
                    onClick={() => {
                      this.viewBlog(blog.blog_id);
                    }}
                  >
                    <div
                      class="card-blog-new mb-3"
                      style={{
                        width: "24rem",
                        borderRadius: "1rem",
                        height: "100px",
                      }}
                    >
                      <div class="row g-0">
                        {blog.imgUrls && blog.imgUrls.length > 0 && (
                          <div class="col-md-4">
                            <img
                              class="card-image-top"
                              src={`/assets/images/${blog.imgUrls[0]}`}
                              alt="..."
                              style={{
                                height: "90px",
                                objectFit: "cover",
                                margin: "auto",
                                paddingLeft: "5px",
                                paddingTop: "7px",
                                borderRadius: "1rem",
                                maxWidth: "100%",
                              }}
                            />
                          </div>
                        )}
                        <div class="col-md-8">
                          <div
                            class="card-body"
                            style={{ paddingLeft: "10px" }}
                          >
                            <h8 className="title-blog">
                              {blog.title.substring(0, 40)}...
                            </h8>
                            <p className="card-content">
                              {getText(blog.content.substring(0, 22))}...
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default BlogComponent;
