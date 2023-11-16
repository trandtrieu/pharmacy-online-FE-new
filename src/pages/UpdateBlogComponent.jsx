import React, { Component } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BlogServices from "../services/BlogServices";
import {toast} from"react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class UpdateBlogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog_id: this.props.match.params.blog_id,
      title: "",
      content: "",
      imgUrls: [],
    };
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeContentHandler = this.changeContentHandler.bind(this);
    this.changeImageHandler = this.changeImageHandler.bind(this);
    this.updateBlog = this.updateBlog.bind(this);
  }

  componentDidMount() {
    BlogServices.getBlogById(this.state.blog_id).then((res) => {
      let blog = res.data;
      this.setState({
        title: blog.title,
        content: blog.content,
        imgUrls: blog.imgUrls,
      });
    });
  }

  updateBlog = (e) => {
    e.preventDefault();
    let blog = {
      title: this.state.title,
      content: this.state.content,
      imgUrls: this.state.imgUrls,
    };
    console.log("blog =>" + JSON.stringify(blog));

    BlogServices.updateBlog(blog,this.state.blog_id).then((res) => {
      // console.log()
      this.props.history.push("/blog");
    });
    toast.success('Update Blog is Successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };


  changeContentHandler = (value) => {
    this.setState({ content: value });
  };

  changeImageHandler = (event) => {
    const files = event.target.files;
    const imgUrls = [];

    for (let i = 0; i < files.length; i++) {
      const fileName = files[i].name;
      imgUrls.push(fileName);
    }
    console.log(imgUrls);
    this.setState({ imgUrls: imgUrls });
  };

  cancel() {
    this.props.history.push("/blog");
  }

  render() {
    return (
      <div className="col-lg-8 bg-light pt-3 mx-auto">
      <div className="ps-lg-4">
      <div className="container">
        {/* <div className="row"> */}
          <h3 className="text-center">Update New Blog</h3>
          <form>
            <div className="form-group">
              <label>Title :</label>
              <input
                placeholder="Title"
                name="title"
                className="form-control"
                value={this.state.title}
                onChange={this.changeTitleHandler}
              />
            </div>


            <div className="form-group">
              <input
                type="file"
                name="file"
                // value={this.state.imgUrls[0]}
                onChange={this.changeImageHandler}
                multiple
              />
            </div>

            <div className="form-group">
              
              {/* <input
                placeholder="Day Update"
                name="update_day"
                className="form-control"
                value={this.state.update_day}
                onChange={this.changeUpdateHandler}
              /> */}
              {/* <ReactQuill
                theme="snow"
                className="edit-content"
                value={this.state.content}
                onChange={this.changeContentHandler}
              /> */}
              <label>Content :</label><br/>
                <textarea
                  placeholder="Content"
                  className="form-control"
                  name="content"
                  value={this.state.content}
                  onChange={this.changeContentHandler}
                  style={{height:"15rem"}}
                />
            </div>

            <button className="btn btn-success" onClick={this.updateBlog}>
              Save
            </button>
            <button
              className="btn btn-danger"
              onClick={this.cancel.bind(this)}
              style={{ marginLeft: "20px" }}
            >
              Cancel
            </button>
          </form>
        </div>
      {/* </div> */}
      </div>
      </div>
    );
  }
}

export default UpdateBlogComponent;
