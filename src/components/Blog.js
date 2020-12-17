import '../css/App.css';
import BlogPost from './BlogPost.js'
import React from 'react';
import { Link, Route, useRouteMatch } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function BlogCard(blog){ 
// This component will render a blog card heh
const { url } = useRouteMatch();

return (
    <Card className='blog-card' variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {blog.blog.title}
        </Typography>
        <Typography variant="body2" component="p">
          {blog.blog.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`${url}/${blog.blog.id}`}>
        <Button size="small">Read</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

function BlogList(){ 
    const { url } = useRouteMatch();
    const blogFile = require('../public/blogData.js');
    const blogData = blogFile.blogData;

    // creates the list of all the BlogCard components
    const linkList = blogData.map((blog) => {
        return (
            <div class='blog-card-container'>
                <BlogCard blog={blog}/>
            </div>
        );
    });

    return <div>
            <Route path={`${url}/:blogId`}>
                <BlogPost data={blogData}/>
            </Route>

            <Route exact path={url}>
                <h1 class='section-header'>Some other things that I care about</h1>
                <ul class='blog-list'>{linkList}</ul>
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