import { faPlay, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
export default function Recomentdation(){
    const [recomendationAnimes, setAnimeRecomendations] = useState([]);
    
    
    useEffect(() => {
        const fetchRecomendationAnimes = async () => {
          try {
            const response = await fetch('https://api.jikan.moe/v4/seasons/upcoming');
            const data = await response.json();
            setAnimeRecomendations(data.data.slice(0,5));
          } catch (error) {
            console.error('Error fetching Recomendation anime:', error);
          } 
        };
        
        fetchRecomendationAnimes()
      }, []);

      const maxSynopsis = (synopsis, maxLength) => {
          if (synopsis.length <= maxLength) {
            return synopsis;
          }
          return synopsis.substring(0, maxLength) + '...';
        };
     
    return(
      
            <Carousel>
                
                {recomendationAnimes.map((recomendation)=>
        
                <Carousel.Item key={recomendation.mal_id}>
                    <div className="container d-flex justify-content-center mt-5 pt-5">
                        <div className="anime-container row d-flex align-items-center m-2">
                            <div className="col-12 col-md-3 anime-info d-flex flex-column justify-content-center align-items-center p-3">
                                <p className="text-center fw-bold anime-title">{recomendation.title}</p>
                               <p className="anime-synopsis text-center">{recomendation.producers.name}</p>
                                <a href={recomendation.trailer.url} className="btn-trailer text-center text-white fw-bold">Trailer <FontAwesomeIcon icon={faPlay} /></a>
                             
                                
                            </div>
                            <div className="col-12 col-md-9 bg-anime">
                                <img src={recomendation.trailer.images.maximum_image_url} className="img-anime" alt="" />
                                <div className="overlay"></div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
                )}
            </Carousel>
        
       
    )
}