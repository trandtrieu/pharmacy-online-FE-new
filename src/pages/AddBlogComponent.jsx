import React, { Component } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BlogServices from "../services/BlogServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Form } from "react-bootstrap";

class AddBlogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      // update_day: "",
      content: "",
      descriptionCkData: "",
      imgUrls: [],
    };
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    // this.changeUpdateHandler = this.changeUpdateHandler.bind(this);
    this.changeContentHandler = this.changeContentHandler.bind(this);
    this.changeImageHandler = this.changeImageHandler.bind(this);
    this.saveBlog = this.saveBlog.bind(this);
  }

  saveBlog = (e) => {
    e.preventDefault();
    let blog = {
      title: this.state.title,
      // update_day: this.state.update_day,
      content: this.state.content,
      imgUrls: this.state.imgUrls,
    };
    console.log("blog =>" + JSON.stringify(blog));

    BlogServices.addBlog(blog).then((res) => {
      this.props.history.push("/blog");
    });
    toast.success("Create New Blog Successfully", {
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

  // changeUpdateHandler = (event) => {
  //   this.setState({ update_day: event.target.value });
  // };

  // changeContentHandler = (value) => {
  //   // const contentWithoutPTags = value.replace(/<p>/g, '').replace(/<\/p>/g, '');

  //   this.setState({ content: value });
  //   console.log(value);
  // };
  changeContentHandler = (event) => {
    // const contentWithoutPTags = value.replace(/<p>/g, '').replace(/<\/p>/g, '');

    this.setState({ content: event.target.value });
    // console.log(value);
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
            <h3 className="text-center">Create New Blog</h3>
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
                <label>Content :</label><br/>
                <textarea
                  placeholder="Content"
                  className="form-control"
                  name="content"
                  value={this.state.content}
                  onChange={this.changeContentHandler}
                  style={{height:"15rem"}}
                />

                {/* 
                <ReactQuill
                  theme="snow"
                  className="edit-content"
                  value={this.state.content}
                  onChange={this.changeContentHandler}
                  style={{ height: "200px" }}
                /> */}

                {/* <CKEditor
                  
                    editor={ClassicEditor}
                    data={this.state.content}
                    onReady={(editor) => {
                      editor.editing.view.change((writer) => {
                        writer.setStyle(
                          "height",
                          "200px",
                          editor.editing.view.document.getRoot()
                        );
                      });
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      // const data = event.target.value;
                      this.setState({ content: data });
                    }}
                  ></CKEditor> */}
              </div>
            </form>

            <button
              className="btn btn-success"
              onClick={this.saveBlog}
              style={{ marginTop: "50px" }}
            >
              Save
            </button>
            <button
              className="btn btn-danger"
              onClick={this.cancel.bind(this)}
              style={{ marginLeft: "20px", marginTop: "50px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddBlogComponent;
