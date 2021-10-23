import '../css/App.css';
import React from 'react';
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'

const ProjectPost = ({ data }) => {

    // This gets the Project we are on
    const { projectId } = useParams();
    const project = data.find(b => b.id === Number(projectId));
    const project_content = project.content;
    const latex_data = project.latex;

    return <div class='project-info-container'>
            <h1 class='section-header'>{project.title}</h1>
            <ReactMarkdown source={project_content} />
            <Latex>{latex_data}</Latex>
        </div>

}


export default ProjectPost;