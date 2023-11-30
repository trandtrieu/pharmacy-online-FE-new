import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import BlogServices from "../services/BlogServices";

class BlogDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog_id: this.props.match.params.blog_id,
      // blog: {},
      blog: {},
      blogs: [],
    };

    this.deleteBlog = this.deleteBlog.bind(this);
    this.updateBlog = this.updateBlog.bind(this);
  }

  deleteBlog(blog_id) {
    BlogServices.deleteBlog(blog_id).then((res) => {
      this.setState({
        blogs: this.state.blogs.filter((blog) => blog.blog_id !== blog_id),
      });
    });
  }

  updateBlog(blog_id) {
    this.props.history.push(`/update-blog/${blog_id}`);
  }

  componentDidMount() {
    BlogServices.getBlogById(this.state.blog_id).then((res) => {
      this.setState({ blog: res.data });
    });
  }
  home() {
    this.props.history.push("/blog");
  }

  render() {
    const getText = (html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent;
    }; //render text dang html trong content
    // const getParagraphs = (html) => {
    //   const doc = new DOMParser().parseFromString(html, "text/html");
    //   const paragraphs = doc.body.textContent.split('\n').map((paragraph, index) => (
    //     <p key={index}>{paragraph}</p>
    //   ));
    //   return paragraphs;
    // };
    return (
      <>
        <div className="detail">
          <div className="text-center">
            <div className="body">
              {/* {this.state.blogs.map((blog) => ( */}
              <div className="container">
                <h1
                  className="title-blog"
                  style={{ marginTop: "30px", marginBottom: "30px" }}
                >
                  {this.state.blog.title}
                </h1>
                {this.state.blog.imgUrls &&
                  this.state.blog.imgUrls.length > 0 && (
                    <img
                      className="content-img"
                      src={`../assets/images/${this.state.blog.imgUrls[0]}`}
                      alt="content-img"
                    />
                  )}
                {/* <img className="content-img" src={`../assets/images/${this.state.blog.imgUrls[0]}`} alt="content-img"/> */}

                <h5
                  className="blog-date"
                  style={{ marginTop: "20px", textAlign: "left" }}
                >
                  {this.state.blog.create_date} {this.state.blog.create_time}
                </h5>
                {/* <h5 className="blog-date"> */}
                {/* {this.state.blog.create_date} */}
                {/* {this.state.blog.create_time} */}
                {/* </h5> */}

                {/* <button
                  className="btn btn-danger"
                  onClick={() => this.deleteBlog(this.state.blog.blog_id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => this.updateBlog(this.state.blog.blog_id)}
                  style={{ marginLeft: "10px" }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button> */}
                {/* <div className="col-lg-8 col-md-10 mx-auto"> */}

                <button
                  className="btn btn-info"
                  style={{
                    display: "flex",
                    borderRadius: "10px",
                    height: "30px",
                    paddingTop: "5px",
                  }}
                  onClick={this.home.bind(this)}
                >
                  <FontAwesomeIcon icon={faHouseUser} />
                </button>

                <p
                  className="content-blog text-start "
                  style={{
                    textAlign: "justify",
                    lineHeight: "40px",
                    justifyContent: "center",
                    fontSize: "17px",
                    height: "100%",
                  }}
                >
                  {getText(this.state.blog.content)}
                </p>
              </div>
              {/* </div> */}
              {/* // ))} */}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BlogDetailComponent;
