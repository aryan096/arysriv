import '../css/App.css';
import React, { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from "react-images";
import { Route, useRouteMatch } from "react-router-dom";

function PhotoList(){ 
    const { url } = useRouteMatch();
    const photoPage = require('../public/photoPage.js');
    const photos = photoPage.photos;


    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
  
    const openLightbox = useCallback((event, { photo, index }) => {
      setCurrentImage(index);
      setViewerIsOpen(true);
    }, []);
  
    const closeLightbox = () => {
      setCurrentImage(0);
      setViewerIsOpen(false);
    };

           return <div>
            <Route exact path={url}>
            </Route>
            <Gallery photos={photos } onClick={openLightbox}/>;
            <ModalGateway>
                {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                    <Carousel
                    currentIndex={currentImage}
                    views={photos.map(x => ({
                        ...x,
                        srcset: x.srcSet,
                        caption: x.title
                    }))}
                    />
                </Modal>
                ) : null}
            </ModalGateway>
        </div>;
}


export default class Photography extends React.Component {

    render() { 
        return (
            <div>
                <PhotoList />
                <style>{`body { background-color: black; }, 
                .navitem a:link { color: #FCF6ED;} 
                .navitem a:visited { color: #FCF6ED;} 
                .navitem a:hover {  color: gray;} 
                .navitem a:active { color: white; text-decoration: underline;}
                .section-header {color:white;}
                hr {border: 2px dashed #FCF6ED; border-style: none none dashed;}
                .copyright p {color:#FCF6ED;} .copyright svg {color:#FCF6ED;}
                `}</style>
                

            </div>
    )}
}