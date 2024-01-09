import React, { Component } from "react";
import CarouselBlogComponent from "../layouts/CarouselBlogComponent";
import BlogServices from "../services/BlogServices";
import ReactPaginate from "react-paginate";

class BlogComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: [],
      pageCount: 0,
      currentPage: 0,
      blogsPerPage: 6,
    };

    this.addBlog = this.addBlog.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.loadBlogs();
  }

  loadBlogs() {
    BlogServices.getBlog().then((res) => {
      const blogs = res.data;
      const pageCount = Math.ceil(blogs.length / this.state.blogsPerPage);
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
    };

    const sortedBlogs = [...this.state.blogs].sort(
      (a, b) => new Date(a.create_date) - new Date(b.create_date)
    );

    const mostPopularBlogs = sortedBlogs.slice(0, 4);

    return (
      <>
        <CarouselBlogComponent />

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
          <div className="card-column">
            <div
              className="d-flex justify-content-center "
              style={{ marginLeft: "70px" }}
            >
              <div className="row" style={{ paddingRight: "40px" }}>
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
                      {blog.title}
                    </h4>
                    <h6 className="blog-date" style={{ marginTop: "20px" }}>
                      {blog.create_date} {blog.create_time}
                    </h6>
                    <p className="card-content-blog">
                      {getText(blog.content.substring(0, 100))}...
                    </p>
                  </div>
                ))}
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

          <div class="container">
            <div class="col-md-3" style={{ maxWidth: "100%" }}>
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
                    onClick={() => this.viewBlog(blog.blog_id)}
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
