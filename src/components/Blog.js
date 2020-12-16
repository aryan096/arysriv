import '../css/App.css';
import BlogPost from './BlogPost.js'
import React from 'react';
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";

function BlogCard(blogData){ 
// This component will render a blog card heh
}

function BlogList(){ 
    const { url } = useRouteMatch();
    const blogFile = require('../public/blogData.js');
    const blogData = blogFile.blogData;

    // creates the list of all the BlogCard components
    const linkList = blogData.map((blog) => {
        return (
        <li key={blog.id}>
            <Link to={`${url}/${blog.id}`}>{blog.title}</Link>
        </li>
        );
    });

    return <div>

            <Route path={`${url}/:blogId`}>
                <BlogPost data={blogData}/>
            </Route>

            <Route exact path={url}>
                <ul>{linkList}</ul>
            </Route>
            
        </div>;
}

export default class Blog extends React.Component {
    render() { 
        return (
            <div>
                <BlogList />
            </div>
    )}
}