import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const Blogs = () => {
  const [BlogData, setBlogData] = useState("")
  const sendRequest = async () => {
    axios
      .get("http://localhost:5000/api/blog").then((result=>{
        setBlogData(result.data.blogs)
      }))
      .catch((err) => console.log(err));
   
  };
  useEffect(() => {
    sendRequest()
  }, []);
  console.log(BlogData);
  return (
    <div>
      {BlogData &&
        BlogData.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") == blog.user?._id}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}
          />
        ))}
    </div>
  );
};

export default Blogs;
