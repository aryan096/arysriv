import '../css/App.css';
import React from 'react';
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";


const ProjectPost = ({ data }) => {

    // This gets the Project we are on
    const { projectId } = useParams();
    const project = data.find(b => b.id === Number(projectId));
    const project_content = project.content;

    return <div>
            <h1>{project.title}</h1>
            <ReactMarkdown source={project_content} />
        </div>

}

export default ProjectPost;