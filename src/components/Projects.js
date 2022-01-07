import '../css/App.css';
import ProjectPost from './ProjectPost.js'
import React from 'react';
import { Link, Route, useRouteMatch } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

/*
 This function takes in the projectData array and returns an array with paired 
 arrays. For example, [2,3,4] => [[2,3],[4]]
*/
function pairProjectElements(projectData){ 
    var pairedArray = projectData.reduce(function(result, value, index, projectData) {
        if (index % 2 === 0)
          result.push(projectData.slice(index, index + 2));
        return result;
    }, []);
    return pairedArray;
}

function ProjectCard(project){ 
// This component will render a project card heh
const { url } = useRouteMatch();

return (
    <Card className='proj-card' variant="outlined">
        <CardContent>
            <Typography variant="h5" component="h2">
            {project.project.title}
            </Typography>
            <Typography variant="body2" component="p">
            {project.project.description}
            </Typography>
        </CardContent>
        <div class='project-card-image-container'>
            <Link to={`${url}/${project.project.id}`}>
                <CardMedia
                    component="img"
                    alt={project.project.card_image_alt}
                    height="200"
                    image={project.project.card_image}
                    title={project.project.title}
                />
            </Link>
        </div>
    </Card>
  );
}

function ProjectList(){ 
    const { url } = useRouteMatch();
    const projFile = require('../public/projectData.js');
    const projData = projFile.projData;
    const projDataPaired = pairProjectElements(projData);

    // creates the list of all the projectCard components
    const linkList = projDataPaired.map((projectPair) => {
        return (
            <div>
                <div class='project-card-container'>
                    <ProjectCard project={projectPair[0]}/>
                    {projectPair.length > 1 &&
                        <ProjectCard project={projectPair[1]}/>
                    }
                </div>
            </div>
        );
    });

    return <div>
            <Route path={`${url}/:projectId`}>
                <ProjectPost data={projData}/>
            </Route>

            <Route exact path={url}>
                <h1 class='section-header'>Some things that I have been doing...</h1>
                <ul class='proj-list'>{linkList}</ul>
            </Route>
        </div>;
}

export default class Project extends React.Component {
    render() { 
        return (
            <div>
                <ProjectList />
            </div>
    )}
}