import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";

export default function NavBar(){
    const navigate = useNavigate();
    const [title,setTitle] = useState('Default')
    const {searchQuery, setSearchQuery, setView} = useContext(SearchContext)
    
    const changeNavigate = (eventKey) => {
        setTitle(eventKey === 'default' ? 'Default' : 'Popular');
        setView(eventKey); // Ubah view di SearchContext
        setSearchQuery('')
        navigate(`/?view=${eventKey}`);
      };
    
      const handleSearch = (e) => {
        if (e.key === 'Enter') {
          setSearchQuery(e.target.value);
        } 
      };
    return (

        <nav
            className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark"
        >
            <div className="container">
                <Link className="navbar-brand fs-3"  style={{ color: '#FBD46D', fontWeight:'bold' }}>cakrAnime</Link>
                <button
                    className="navbar-toggler d-lg-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavId"
                    aria-controls="collapsibleNavId"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0 fs-5 fw-bold">
                        <li className="nav-item" >
                            <div className="col d-flex">
                                <div className="input-group d-flex align-items-center">
                                  <input type="text" className="search-input" placeholder="Search Anime Name..." 
                                  onKeyDown={handleSearch}
                                  />
                                </div>
           
                            </div>
                        </li>
                        <li>
                        <Dropdown onSelect={changeNavigate}>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                              {title}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item eventKey="default">Default</Dropdown.Item>
                              <Dropdown.Item eventKey="popular">Popular</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        </li>
                        
                        
                         
                    </ul>
                    
                </div>
            </div>
        </nav>
        
    )
}