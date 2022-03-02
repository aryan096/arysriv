import '../css/App.css';
import React from 'react';
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const ProjectPost = ({ data }) => {

    // This gets the Project we are on
    const { projectId } = useParams();
    const project = data.find(b => b.id === Number(projectId));
    const project_content = project.content;
    const doc1 = project.doc1;
    const doc2 = project.doc2;
    const doc3 = project.doc3;
    var document1;
    var document2;
    var document3;

    if (doc1 !== '') { 
        document1 = <div class='document'>
                    <iframe src={doc1} height="768" width="600" title='pdf'></iframe>
                </div>
    }
    if (doc2 !== '') { 
        document2 = <div class='document'>
                    <iframe src={doc1} height="768" width="600" title='pdf'></iframe>
                </div>
    }
    if (doc3 !== '') { 
        document3 = <div class='document'>
                    <iframe src={doc1} height="768" width="600" title='pdf'></iframe>
                </div>
    }

    return <div class='project-info-container'>
            <h1 class='section-header'>{project.title}</h1>
            <ReactMarkdown source={project_content} />
            {document1}
            {document2}
            {document3}

        </div>

}

export default ProjectPost;