import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-bootstrap";
import { SearchContext } from "../context/SearchContext";

// Fetch data with pagination
// Function to fetch anime data based on page, search query, and view type
async function fetchAnimes(page = 1, query = '', view) {
  // Determine URL based on view type
  let url = `https://api.jikan.moe/v4/anime?page=${page}&limit=24&q=${query}`;
  if (view === 'popular') {
    url = `https://api.jikan.moe/v4/top/anime?page=${page}&limit=24&q=${query}`;
  }
  // Fetch data from the API
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default function AnimeList() {
  // State hooks for anime data, pagination, current page, and loading state
  const [animes, setAnimes] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPageNum, setCurrentPageNum] = useState(1); 
  const [loading, setLoading] = useState(true);
  
  // Hooks for location and navigation
  const location = useLocation();
  const navigate = useNavigate();
  
  // Context to manage search query and view type
  const { searchQuery, view, setView } = useContext(SearchContext);

  // Effect hook to fetch anime data whenever page, search query, or view changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query') || '';
    const view = queryParams.get('view') || 'default';
    
    const loadAnimes = async () => {
      setLoading(true);
      try {
        const data = await fetchAnimes(currentPageNum, query, view);
        // Check if the response has the expected structure
        if (data && data.data) {
          setAnimes(data.data);
          setPagination(data.pagination);
        } else {
          console.error('Unexpected data format:', data);
          setAnimes([]);
          setPagination({});
        }
      } catch (error) {
        console.error('Error fetching anime data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAnimes();
  }, [currentPageNum, searchQuery, view, location.search]);

  // Effect hook to update URL query parameters when page, search query, or view changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', currentPageNum);
    queryParams.set('query', searchQuery);
    queryParams.set('view', view);

    navigate(`?${queryParams.toString()}`);
  }, [currentPageNum, searchQuery, view, navigate]);

  // Effect hook to reset view to 'default' when a search query is entered
  useEffect(() => {
    if (searchQuery) {
      setView('default');
    }
  }, [searchQuery, setView]);

  // Loading state handling
  if (loading || !animes) {
    return (
      <div className="container-fluid d-flex justify-content-center flex-column align-items-center" style={{ height: '100vh' }}>
        <div className="row">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
        <div className="row">
          <span className="text-center">Loading...</span>
          <span className="text-center">If Nothing Happens, Refresh This Page</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-5">Anime List</h1>
        <div className="container">
          <div className="row d-flex justify-content-center">
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
  );
}
