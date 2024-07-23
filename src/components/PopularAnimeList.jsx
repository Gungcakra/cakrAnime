import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-bootstrap";
import { SearchContext } from "../context/SearchContext";

// Fetch data with pagination
async function fetchAnimes(page = 1, query='') {
    const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}&limit=24&q=${query}`);
    const data = await response.json();
    return data;
  }

export default function PopularAnimeList(){
    const [animes, setAnimes] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPageNum, setCurrentPageNum] = useState(1);
    const [loading, setLoading] = useState(true);
  
    const navigate = useNavigate();

    const {searcQuery} = useContext(SearchContext);
    useEffect(() => {
      const loadAnimes = async () => {
        setLoading(true);
        const data = await fetchAnimes(currentPageNum, searcQuery);
        setAnimes(data.data);
        setPagination(data.pagination);
        setLoading(false);
      };
  
      loadAnimes();
    }, [currentPageNum, searcQuery]);
  
    useEffect(() => {
      navigate(`?page=${currentPageNum}`);
    }, [currentPageNum, navigate]);
  
    if (loading || !animes) {
      return (
        <div className="container-fluid d-flex justify-content-center flex-column align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
        </div>
      );
    }
    return (
        <>
        <div className="container">

   
        <h1 className="text-center mt-5">Anime List</h1>
        <div className="container">
         
          
          <div className="row d-flex justify-content-center">
            {/* Anime Card */}
            {animes.map((anime) => (
              <div className="card m-2" key={anime.mal_id}>
                <div className="score-badge">
                  <FontAwesomeIcon icon={faStar} /> {anime.score}
                </div>
                <img
                  className="card-img-top"
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                />
                <div className="card-body">
                  <p className="card-title fw-bold">{anime.title}</p>
                  <Link to={`/anime/${anime.mal_id}`} className="btn fw-bold text-white detail-btn">Detail</Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pagination">
            <button
              onClick={() => setCurrentPageNum((prev) => Math.max(prev - 1, 1))}
              disabled={currentPageNum === 1}
            >
              Previous
            </button>
            <span>{`Page ${currentPageNum} of ${pagination.last_visible_page}`}</span>
            <button
              onClick={() => setCurrentPageNum((prev) => Math.min(prev + 1, pagination.last_visible_page))}
              disabled={currentPageNum === pagination.last_visible_page}
            >
              Next
            </button>
          </div>
        </div>
        </div>
        </>
    )
}