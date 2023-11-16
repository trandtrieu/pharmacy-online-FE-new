import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import BlogServices from "../services/BlogServices";


class BlogDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog_id: this.props.match.params.blog_id,
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
              <h1 className="title" style={{ marginTop: "30px", marginBottom:"30px" }}>
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
                
                <h6 className="blog-date" style={{ marginTop: "20px" }}>
                  {this.state.blog.create_date}
                  {/* {this.state.blog.create_time} */}
                </h6>
                <h6 className="blog-date">
                  {/* {this.state.blog.create_date} */}
                  {this.state.blog.create_time}
                </h6>

                <button className="btn btn-danger" onClick={ () => this.deleteBlog(this.state.blog.blog_id) }>
                  <FontAwesomeIcon icon={faTrash} />
                  </button>

                  <button className="btn btn-primary" onClick={ () => this.updateBlog(this.state.blog.blog_id)} style={{marginLeft:"10px"}}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                {/* <div className="col-lg-8 col-md-10 mx-auto"> */}

                <div
                  className="content text-start "
                  style={{
                    textAlign: "left",
                    lineHeight: "30px",
                    justifyContent: "center",
                    fontSize: "17px",
                  }}
                >
                  {getText(this.state.blog.content)}
                </div>
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
