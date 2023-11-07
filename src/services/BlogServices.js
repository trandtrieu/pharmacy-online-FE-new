import axios from "axios";

const BLOG_API_BASE_URL = "http://localhost:8080/pharmacy-online/blogs";
const BLOG_API_BASE_URLL = "http://localhost:8080/pharmacy-online/blog";

class BlogServices{
    getBlog(){
        return axios.get(BLOG_API_BASE_URL  + "/list");
    }
    getBlogById(blog_id) {
        return axios.get(BLOG_API_BASE_URL + "/view/" + blog_id);
      }//http://localhost:8080/pharmacy-online/blogs/view/1

      addBlog(blog){
        return axios.post(BLOG_API_BASE_URLL + "/add", blog);
      }//http://localhost:8080/pharmacy-online/blog/add
    deleteBlog(blog_id){
        return axios.delete(BLOG_API_BASE_URL + "/delete/" + blog_id);
    }//http://localhost:8080/pharmacy-online/blogs/delete/7
    
    updateBlog(blog, blog_id){
        return axios.put(BLOG_API_BASE_URL + "/update/" + blog_id, blog);
    }//http://localhost:8080/pharmacy-online/blog/update/5
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new BlogServices();