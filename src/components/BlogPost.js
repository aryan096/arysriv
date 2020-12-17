import '../css/App.css';
import React from 'react';
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";


const BlogPost = ({ data }) => {

    // This gets the blog we are on
    const { blogId } = useParams();
    const blog = data.find(b => b.id === Number(blogId));
    const blog_content = blog.content;

    return <div>
            <h1>{blog.title}</h1>
            <ReactMarkdown source={blog_content} />
        </div>

}

export default BlogPost;