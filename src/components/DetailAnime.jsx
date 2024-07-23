import { faStar, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

// Loader function to fetch anime data
export async function loader({ params }) {
  // Get anime ID from params
  const { id } = params;
  
  // Fetch anime data
  const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  const data = await response.json();
  const anime = data.data;

  // Return fetched data
  return { anime };
}

export default function DetailAnime() {
  // Scroll to top of the page on component mount
  window.scrollTo(0, 0);

  // Destructure fetched anime data
  const { anime } = useLoaderData();

  // State to manage active link button
  const [activeLink, setActiveLink] = useState(null);

  // State to toggle between short and full synopsis
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  // Function to handle link button click
  const handleClick = (link) => {
    setActiveLink(link);
  }

  // Function to toggle synopsis state
  const toggleSynopsis = () => {
    setShowFullSynopsis(!showFullSynopsis);
  };

  // Helper function to count words
  const wordCount = (str) => str.split(' ').length;

  // Shortened version of the synopsis if it's too long
  const shortSynopsis = anime.synopsis.split(' ').slice(0, 25).join(' ') + (wordCount(anime.synopsis) > 25 ? '...' : '');

  // Style for active and inactive links
  const linkStyle = (link) => ({
    backgroundColor: activeLink === link ? '#222831' : '#4F8A8B',
    border: activeLink === link ? '1px solid #4F8A8B' : '1px solid #222831',
    color: 'white',
    margin: '5px',
    padding: '10px',
    textDecoration: 'none',
    borderRadius: '5px'
  });

  return (
    <>
      <div className="container-fluid d-flex justify-content-center flex-column align-items-center pt-5">
        <div className="row d-flex justify-content-start align-items-center m-5 p-2" style={{ backgroundColor: '#222831',maxWidth:'70%' }}>
          {/* Anime image and trailer button */}
          <div className="col-12 col-md-2 col-sm-2 d-flex flex-column justify-content-center align-items-center">
            <img src={anime.images.jpg.image_url} alt="img" style={{ width: '100%', height: 'auto', maxWidth: '200px', objectFit: 'cover' }} />
            <a href={anime.trailer.url} className="btn text-white w-100 m-2 fs-5 fw-bold" style={{ backgroundColor: '#4F8A8B' }}>
              Trailer <FontAwesomeIcon icon={faPlay} />
            </a>
          </div>
          {/* Anime details */}
          <div className="col-12 col-md-10 col-sm-10">
            <div className="col d-flex">
              <h2 className="text-start">{anime.title}</h2>
              <h2 className="btn btn-warning fw-bold"><FontAwesomeIcon icon={faStar} /> {anime.score}</h2>
            </div>
            <div className="col">
              <p>{anime.type} | {anime.source} | {anime.episodes} Episodes | {anime.status}</p>
              <div className="col">
                {/* Display anime genres */}
                {anime.genres.map((genre) => 
                  <p className="btn m-1 p-1 fw-bold text-dark" style={{ backgroundColor: '#EEEEEE' }} key={genre.name}>{genre.name}</p>
                )}
              </div>
              {/* Display short or full synopsis based on state */}
              <p>{showFullSynopsis ? anime.synopsis : shortSynopsis}</p>
              {wordCount(anime.synopsis) > 25 && (
                <button style={{ color:'#4F8A8B' }} className="btn btn-link fw-bold text-decoration-none" onClick={toggleSynopsis}>
                  {showFullSynopsis ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Link buttons for navigation */}
        <div className="row d-flex justify-content-center">
          <div className="col-lg-4 d-flex justify-content-center">
            <Link
              style={linkStyle('episodes')}
              to={`/anime/${anime.mal_id}/episodes`}
              onClick={() => handleClick('episodes')}
            >
              Episodes
            </Link>
            <Link
              style={linkStyle('characters')}
              to={`/anime/${anime.mal_id}/characters`}
              onClick={() => handleClick('characters')}
            >
              Characters
            </Link>
            <Link
              style={linkStyle('reviews')}
              to={`/anime/${anime.mal_id}/reviews`}
              onClick={() => handleClick('reviews')}
            >
              Reviews
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
